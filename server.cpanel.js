// Arquivo de inicialização ("Application startup file") da aplicação Node.js
// no cPanel (Phusion Passenger). Executa o servidor standalone gerado por
// `npm run build:standalone`.
//
// Credenciais: lidas de `.next/standalone/.env.production.local` (copiado pelo
// build) e/ou das variáveis de ambiente definidas na tela "Setup Node.js App".
// Este arquivo não contém nenhum segredo.
'use strict'

const fs = require('node:fs')
const path = require('node:path')

const serverFile = path.join(__dirname, '.next', 'standalone', 'server.js')
if (!fs.existsSync(serverFile)) {
  console.error('[irineu] .next/standalone/server.js não encontrado. Rode "npm run build:standalone" antes de iniciar.')
  process.exit(1)
}

process.env.NODE_ENV = 'production'
process.env.NEXT_TELEMETRY_DISABLED = '1'
// Em Linux a variável HOSTNAME costuma vir com o nome da máquina; o servidor do
// Next a usaria como endereço de escuta. O Passenger encaminha as requisições
// localmente, então escutamos sempre em 127.0.0.1 (a porta vem do PORT, se houver).
process.env.HOSTNAME = '127.0.0.1'

require(serverFile)
