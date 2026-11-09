#!/usr/bin/env node
// Build de produção "standalone" para hospedagem Node.js (cPanel/Passenger).
//
// Uso (no servidor Linux, dentro da pasta do projeto):
//   npm run build:standalone
//
// O que faz:
//   1. Recusa rodar fora do Linux (binários nativos, como o `sharp` da
//      otimização de imagens, são específicos do sistema operacional).
//   2. Confere — sem exibir valores — se as variáveis da Simob estão disponíveis
//      (o build gera Home, páginas de locação e sitemap consultando a Simob).
//   3. Roda `next build` com output standalone.
//   4. Copia `public/` e `.next/static/` para dentro de `.next/standalone/`.
//   5. Copia o `.env.production.local` (se existir) para `.next/standalone/`,
//      com permissão 600, para o servidor ler as credenciais em tempo de execução.
//   6. Confere se o binário Linux do `sharp` foi incluído.
//
// Opção: --allow-non-linux  (apenas para inspecionar a estrutura localmente;
// o resultado NÃO deve ser enviado ao servidor).
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const root = process.cwd()
const standalone = path.join(root, '.next', 'standalone')
const allowNonLinux = process.argv.includes('--allow-non-linux')

function fail(msg) {
  console.error(`\n✖ ${msg}\n`)
  process.exit(1)
}
function ok(msg) {
  console.log(`✔ ${msg}`)
}

// 1. Sistema operacional e versão do Node
if (process.platform !== 'linux' && !allowNonLinux) {
  fail(`Este build deve ser feito no servidor Linux (detectado: ${process.platform}). ` +
    'Um build feito no Windows/macOS leva binários nativos incompatíveis.')
}
const [major, minor] = process.versions.node.split('.').map(Number)
if (major < 20 || (major === 20 && minor < 9)) fail(`Node.js ${process.versions.node} é antigo; o Next 16 exige >= 20.9.`)
ok(`Node.js ${process.versions.node} em ${process.platform}/${process.arch}`)

// 2. Variáveis da Simob (lidas como o Next lê: ambiente + arquivos .env*). Nunca imprime valores.
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(root, false, { info: () => {}, error: console.error })
const faltando = ['SIMOB_BASE_URL', 'SIMOB_TOKEN'].filter((k) => !process.env[k])
if (faltando.length) {
  fail(`Variáveis ausentes: ${faltando.join(', ')}. Crie o arquivo .env.production.local na pasta do ` +
    'projeto (pelo Gerenciador de Arquivos do cPanel) com essas variáveis, ou defina-as no ambiente.')
}
ok('Variáveis da Simob encontradas (valores não exibidos)')
if (process.env.SITE_NOINDEX === 'true') fail('SITE_NOINDEX=true faria o site sair do Google. Remova antes do build de produção.')

// 3. next build (standalone)
fs.rmSync(path.join(root, '.next'), { recursive: true, force: true, maxRetries: 5, retryDelay: 500 })
const nextBin = require.resolve('next/dist/bin/next')
const build = spawnSync(process.execPath, [nextBin, 'build'], {
  stdio: 'inherit',
  env: { ...process.env, NEXT_OUTPUT: 'standalone', NEXT_TELEMETRY_DISABLED: '1' },
})
if (build.status !== 0) fail('next build falhou (veja as mensagens acima). Nada foi alterado no site em produção.')
if (!fs.existsSync(path.join(standalone, 'server.js'))) fail('.next/standalone/server.js não foi gerado.')
ok('next build concluído')

// 4. Arquivos estáticos
fs.cpSync(path.join(root, 'public'), path.join(standalone, 'public'), { recursive: true })
fs.cpSync(path.join(root, '.next', 'static'), path.join(standalone, '.next', 'static'), { recursive: true })
ok('public/ e .next/static/ copiados para .next/standalone/')

// 5. Credenciais para o servidor em execução
const envFile = path.join(root, '.env.production.local')
if (fs.existsSync(envFile)) {
  const destino = path.join(standalone, '.env.production.local')
  fs.copyFileSync(envFile, destino)
  try { fs.chmodSync(destino, 0o600) } catch {}
  ok('.env.production.local copiado para .next/standalone/ (permissão 600)')
} else {
  console.log('ℹ Sem .env.production.local: o servidor dependerá das variáveis definidas no cPanel.')
}

// 6. sharp (otimização de imagens). O rastreamento de arquivos do Next copia o
// módulo nativo do sharp mas pode deixar de fora as bibliotecas libvips de que
// ele depende — aí o Next serve as fotos originais (vários MB) sem otimizar.
// Copiamos os pacotes completos e provamos que funciona convertendo uma imagem.
const nm = path.join(root, 'node_modules')
const nmStandalone = path.join(standalone, 'node_modules')
const imgRoot = path.join(nm, '@img')
if (!fs.existsSync(path.join(nm, 'sharp')) || !fs.existsSync(imgRoot)) {
  fail('Pacote sharp não instalado em node_modules. Rode a instalação de dependências (npm install) no servidor.')
}
fs.cpSync(path.join(nm, 'sharp'), path.join(nmStandalone, 'sharp'), { recursive: true, dereference: true })
for (const pkg of fs.readdirSync(imgRoot)) {
  fs.cpSync(path.join(imgRoot, pkg), path.join(nmStandalone, '@img', pkg), { recursive: true, dereference: true })
}
for (const dep of ['detect-libc', 'semver']) {
  if (fs.existsSync(path.join(nm, dep))) fs.cpSync(path.join(nm, dep), path.join(nmStandalone, dep), { recursive: true, dereference: true })
}
const teste = spawnSync(process.execPath, ['-e', `
  const sharp = require('sharp')
  sharp({ create: { width: 2, height: 2, channels: 3, background: '#1C3E77' } }).webp().toBuffer()
    .then((b) => { console.log('webp:' + b.length + ' libvips:' + sharp.versions.vips) })
    .catch((e) => { console.error(e.message); process.exit(1) })
`], { cwd: standalone, encoding: 'utf8' })
if (teste.status !== 0) {
  fail('sharp NÃO funciona dentro de .next/standalone — as fotos não seriam otimizadas.\n' + (teste.stderr || '').split('\n').slice(0, 4).join('\n'))
}
ok(`sharp funcionando em .next/standalone para ${process.platform}/${process.arch} (${teste.stdout.trim()})`)

console.log('\nPronto. Arquivo de inicialização para o cPanel: server.cpanel.js\n')
