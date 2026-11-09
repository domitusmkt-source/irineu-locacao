#!/usr/bin/env node
// Gera o pacote pronto para enviar ao cPanel (Node.js 22, Linux x64/glibc),
// para quando o servidor NÃO oferece Terminal/SSH para compilar lá.
//
//   npm run package:cpanel
//
// Saída: deploy-pacote/irineu-locacao-cpanel-node22-linux-x64-<data>-<commit>.zip
//        (+ .sha256). A pasta deploy-pacote/ é ignorada pelo Git.
//
// O JavaScript gerado pelo Next não depende do sistema operacional; o único
// binário nativo do pacote é o `sharp` (otimização de imagens). Por isso o
// pacote recebe os binários Linux x64 oficiais do sharp (instalação
// multiplataforma documentada pelo sharp), e o binário do sistema de build é
// removido. O pacote NUNCA inclui credenciais: o .env.production.local é criado
// no servidor pelo Gerenciador de Arquivos do cPanel.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import os from 'node:os'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const root = process.cwd()
const outDir = path.join(root, 'deploy-pacote')
const stageName = 'irineu-locacao-cpanel'
const stageRoot = path.join(outDir, stageName)
// O servidor fica em <pacote>/standalone; a raiz do pacote não tem node_modules
// (o "Setup Node.js App" do CloudLinux reserva esse nome na raiz da aplicação).
const stage = path.join(stageRoot, 'standalone')
const standalone = path.join(root, '.next', 'standalone')
const TARGET = { os: 'linux', cpu: 'x64', libc: 'glibc' }

const fail = (m) => { console.error(`\n✖ ${m}\n`); process.exit(1) }
const ok = (m) => console.log(`✔ ${m}`)
// No Windows, usar o tar nativo (bsdtar, suporta .zip); o tar do Git Bash
// interpreta "C:" como host remoto.
const TAR = process.platform === 'win32' ? path.join(process.env.SystemRoot || 'C:\\Windows', 'System32', 'tar.exe') : 'tar'
const run = (cmd, args, opts = {}) => spawnSync(cmd, args, { encoding: 'utf8', shell: process.platform === 'win32', ...opts })

// 1. Build standalone (o script de build valida variáveis, estáticos e sharp local)
const buildArgs = [path.join(root, 'scripts', 'build-standalone.mjs')]
if (process.platform !== 'linux') buildArgs.push('--allow-non-linux')
const b = spawnSync(process.execPath, buildArgs, { stdio: 'inherit' })
if (b.status !== 0) fail('Build standalone falhou.')

// 2. Pasta de montagem
fs.rmSync(outDir, { recursive: true, force: true, maxRetries: 5, retryDelay: 500 })
fs.mkdirSync(outDir, { recursive: true })
fs.mkdirSync(stageRoot, { recursive: true })
fs.cpSync(standalone, stage, { recursive: true, dereference: true })
// Credenciais nunca vão no pacote.
for (const f of fs.readdirSync(stage)) if (f.startsWith('.env')) fs.rmSync(path.join(stage, f), { force: true })
ok('standalone copiado para a pasta de montagem (sem arquivos .env)')

// 3. sharp para Linux x64 (glibc)
const sharpPkg = require(path.join(root, 'node_modules', 'sharp', 'package.json'))
const opt = sharpPkg.optionalDependencies || {}
const linuxPkgs = Object.keys(opt).filter((k) => k === `@img/sharp-${TARGET.os}-${TARGET.cpu}` || k === `@img/sharp-libvips-${TARGET.os}-${TARGET.cpu}`)
if (linuxPkgs.length !== 2) fail('Não foi possível identificar os pacotes Linux do sharp.')
// `npm pack` baixa o tarball oficial do registro (com verificação de integridade)
// sem instalar nem executar scripts; a instalação direta é bloqueada pelo npm
// por ser de outra plataforma.
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'sharp-linux-'))
const imgStage = path.join(stage, 'node_modules', '@img')
for (const d of fs.existsSync(imgStage) ? fs.readdirSync(imgStage) : []) {
  if (/^sharp-(libvips-)?/.test(d) && !d.includes(`${TARGET.os}-${TARGET.cpu}`)) fs.rmSync(path.join(imgStage, d), { recursive: true, force: true })
}
for (const p of linuxPkgs) {
  const pack = run('npm', ['pack', `${p}@${opt[p]}`, '--json', '--pack-destination', tmp], { cwd: tmp })
  if (pack.status !== 0) fail(`Falha ao baixar ${p}@${opt[p]} do registro npm:\n${pack.stderr}`)
  const info = JSON.parse(pack.stdout)[0]
  const tgz = path.join(tmp, info.filename)
  const dest = path.join(tmp, p.replace('/', '__'))
  fs.mkdirSync(dest, { recursive: true })
  const x = spawnSync(TAR, ['-xzf', tgz, '-C', dest], { encoding: 'utf8' })
  if (x.status !== 0) fail(`Falha ao extrair ${info.filename}: ${x.stderr}`)
  fs.cpSync(path.join(dest, 'package'), path.join(stage, 'node_modules', p), { recursive: true })
  console.log(`  ${p}@${info.version} (integridade ${info.integrity.slice(0, 20)}…)`)
}
fs.rmSync(tmp, { recursive: true, force: true })
const nodeBin = path.join(imgStage, `sharp-${TARGET.os}-${TARGET.cpu}`, 'lib', `sharp-${TARGET.os}-${TARGET.cpu}.node`)
const libDir = path.join(imgStage, `sharp-libvips-${TARGET.os}-${TARGET.cpu}`, 'lib')
const elf = (f) => fs.existsSync(f) && fs.readFileSync(f).subarray(0, 4).equals(Buffer.from([0x7f, 0x45, 0x4c, 0x46]))
const libvips = fs.existsSync(libDir) ? fs.readdirSync(libDir).filter((f) => f.startsWith('libvips-cpp.so')) : []
if (!elf(nodeBin) || !libvips.length || !elf(path.join(libDir, libvips[0]))) fail('Binários Linux do sharp ausentes ou inválidos.')
const restantes = fs.readdirSync(imgStage).filter((d) => d.startsWith('sharp-'))
ok(`sharp ${sharpPkg.version} para Linux x64 glibc incluído (${restantes.join(', ')}; ELF válido; ${libvips[0]})`)

// 4. Caminhos absolutos da máquina de build -> relativos (não são usados para
//    acessar arquivos em produção; evita avisos no Linux)
const rootJson = JSON.stringify(root).slice(1, -1) // escapado como aparece em JSON/JS
for (const rel of ['server.js', path.join('.next', 'required-server-files.json')]) {
  const f = path.join(stage, rel)
  const txt = fs.readFileSync(f, 'utf8')
  fs.writeFileSync(f, txt.split(rootJson).join('.'))
}
ok('caminhos da máquina de build substituídos por "." em server.js e required-server-files.json')

// 5. Arquivos de inicialização e instalação
for (const f of ['app.js', 'LEIA-ME-INSTALACAO.md', 'modelo.env.production.local']) {
  fs.copyFileSync(path.join(root, 'deploy', 'cpanel', f), path.join(stageRoot, f))
}
if (!fs.existsSync(path.join(stage, 'node_modules', '@next', 'env'))) fail('@next/env ausente no standalone (necessário ao app.js).')
ok('app.js, LEIA-ME-INSTALACAO.md e modelo.env.production.local incluídos na raiz do pacote')

// 6. Varredura de segredos (compara com os valores locais, sem exibi-los)
const { loadEnvConfig } = require('@next/env')
loadEnvConfig(root, false, { info: () => {}, error: () => {} })
const segredos = ['SIMOB_TOKEN', 'SIMOB_JWT_SECRET'].map((k) => process.env[k]).filter((v) => v && v.length >= 8)
let achados = 0
const varrer = (dir) => {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) varrer(p)
    else if (fs.statSync(p).size < 20 * 1024 * 1024) {
      const buf = fs.readFileSync(p)
      for (const s of segredos) if (buf.includes(s)) { achados++; console.error('  segredo encontrado em', path.relative(stageRoot, p)) }
    }
  }
}
varrer(stageRoot)
if (achados) fail('O pacote contém credenciais. Nada foi gerado.')
ok(`varredura de segredos: nenhum token encontrado no pacote (${segredos.length} valores verificados)`)

// 7. Compactação
const commit = run('git', ['rev-parse', '--short', 'HEAD'], { cwd: root }).stdout.trim() || 'local'
const data = new Date().toISOString().slice(0, 10).replace(/-/g, '')
const zipName = `irineu-locacao-cpanel-node22-linux-x64-${data}-${commit}.zip`
const zipPath = path.join(outDir, zipName)
const z = process.platform === 'win32'
  ? run(TAR, ['-a', '-c', '-f', zipName, stageName], { cwd: outDir, shell: false })
  : run('zip', ['-qr', zipName, stageName], { cwd: outDir })
if (z.status !== 0 || !fs.existsSync(zipPath)) fail('Falha ao compactar:\n' + (z.stderr || ''))
const hash = require('node:crypto').createHash('sha256').update(fs.readFileSync(zipPath)).digest('hex')
fs.writeFileSync(`${zipPath}.sha256`, `${hash}  ${zipName}\n`)
const mb = (fs.statSync(zipPath).size / 1024 / 1024).toFixed(1)
console.log(`\n✔ Pacote: ${zipPath}\n  Tamanho: ${mb} MB\n  SHA-256: ${hash}\n`)
