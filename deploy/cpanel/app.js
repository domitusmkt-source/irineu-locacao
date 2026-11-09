// Arquivo de inicialização da aplicação Node.js no cPanel (Phusion Passenger).
// Nome "app.js": padrão do Passenger e do "Application Manager" do cPanel; no
// "Setup Node.js App" (CloudLinux) informe "app.js" como Application startup file.
//
// Estrutura do pacote:
//   app.js                   <- este arquivo (raiz da aplicação)
//   .env.production.local    <- credenciais, criado NO SERVIDOR (permissão 600)
//   standalone/              <- servidor Next.js (server.js, .next, public, node_modules)
// A raiz não tem node_modules de propósito: o "Setup Node.js App" do CloudLinux
// reserva esse nome na raiz da aplicação.
//
// Este arquivo não contém segredos e nunca imprime valores de variáveis.
'use strict'

const path = require('node:path')
const fs = require('node:fs')

const appDir = path.join(__dirname, 'standalone')
const log = (m) => console.log(`[irineu] ${m}`)

process.env.NODE_ENV = 'production'
process.env.NEXT_TELEMETRY_DISABLED = '1'
// Em Linux, HOSTNAME costuma conter o nome da máquina e o Next o usaria como
// endereço de escuta. O Passenger encaminha localmente: escutar em 127.0.0.1.
process.env.HOSTNAME = '127.0.0.1'

// Credenciais: .env.production.local da raiz (e variáveis do painel, que têm prioridade).
const { loadEnvConfig } = require(path.join(appDir, 'node_modules', '@next', 'env'))
loadEnvConfig(__dirname, false, { info: () => {}, error: (m) => log(`erro lendo .env: ${m}`) })
const faltando = ['SIMOB_BASE_URL', 'SIMOB_TOKEN'].filter((k) => !process.env[k])

// Diagnóstico de inicialização (aparece no log da aplicação)
log(`Node.js ${process.versions.node} ${process.platform}/${process.arch}`)
log(faltando.length
  ? `ATENÇÃO: variáveis ausentes: ${faltando.join(', ')} — crie o .env.production.local na raiz da aplicação`
  : 'credenciais da Simob encontradas (valores não exibidos)')
try {
  const sharp = require(path.join(appDir, 'node_modules', 'sharp'))
  log(`sharp OK (libvips ${sharp.versions.vips}) — otimização de imagens ativa`)
} catch (e) {
  log(`ATENÇÃO: sharp indisponível — fotos serão servidas sem otimização. ${String(e.message).split('\n')[0]}`)
}
try {
  const cache = path.join(appDir, '.next', 'cache')
  fs.mkdirSync(cache, { recursive: true })
  fs.accessSync(cache, fs.constants.W_OK)
  log('cache ISR (standalone/.next/cache) gravável')
} catch {
  log('ATENÇÃO: standalone/.next/cache sem permissão de escrita — o ISR não conseguirá atualizar as páginas')
}

require(path.join(appDir, 'server.js'))
