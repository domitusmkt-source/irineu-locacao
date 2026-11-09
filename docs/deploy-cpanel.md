# Implantação no cPanel (Node.js 22 + Next.js standalone)

Guia de referência da migração da Netlify para o cPanel da Informatech.
A Netlify continua no ar até a troca de DNS, que é a **última** etapa.

## Como funciona

| Item | Onde fica |
|---|---|
| Código-fonte e build | Pasta da aplicação no servidor (ex.: `~/irineu-app`) |
| Build | `npm run build:standalone` — **sempre no servidor Linux** (nunca enviar um build feito no Windows: o `sharp`, que otimiza as fotos, é binário nativo) |
| Inicialização | `server.cpanel.js` (arquivo de inicialização no "Setup Node.js App") → executa `.next/standalone/server.js` |
| Credenciais da Simob | Arquivo `.env.production.local` na pasta da aplicação, criado pelo Gerenciador de Arquivos do cPanel, permissão `600`. O build o copia para `.next/standalone/` |
| Cache ISR (300 s) | `.next/standalone/.next/cache` — a pasta precisa permitir escrita (padrão na conta do usuário) |

Variáveis necessárias no `.env.production.local` (os valores ficam só no servidor
e no Bitwarden; nunca no Git, no chat ou em print):

```
SIMOB_BASE_URL=
SIMOB_TOKEN=
```

Não definir `SITE_NOINDEX` em produção. `SIMOB_JWT_SECRET` não é usado pelo código.

## O que o `build:standalone` garante

1. Recusa rodar fora do Linux.
2. Confere (sem exibir valores) se `SIMOB_BASE_URL` e `SIMOB_TOKEN` existem; bloqueia `SITE_NOINDEX=true`.
3. Roda `next build` com `output: 'standalone'` (só neste script — a Netlify não é afetada).
4. Copia `public/` e `.next/static/` para o standalone.
5. Copia `.env.production.local` para o standalone com permissão 600.
6. Copia os pacotes completos do `sharp`/libvips e **converte uma imagem de teste**; se o sharp não funcionar, o build falha (sem isso o site serviria fotos de vários MB sem otimizar).

Se a Simob estiver fora do ar durante o build, ele falha e nada muda no site.

## Etapas

1. **Levantamento do servidor** — Node.js 22 no "Setup Node.js App", acesso a Terminal/SSH, limites de memória, sistema/glibc e domínio na conta.
2. **Código no servidor** — clonar o repositório (cPanel "Git Version Control" com chave de implantação somente leitura no GitHub).
3. **Criar a aplicação** em "Setup Node.js App" (Node 22, modo Production, raiz da aplicação, URL, arquivo de inicialização `server.cpanel.js`).
4. **Credenciais** — criar `.env.production.local` pelo Gerenciador de Arquivos, permissão 600.
5. **Dependências e build** — no Terminal, com o ambiente da aplicação ativado: `npm install` e `npm run build:standalone`.
6. **Iniciar/reiniciar** a aplicação no "Setup Node.js App".
7. **Teste sem DNS** — `curl --resolve irineulocacao.com.br:443:<IP_DO_SERVIDOR>` e/ou arquivo `hosts`: 152 URLs, 404, ISR, imagens, `robots.txt`, sitemap.
8. **SSL na origem** — certificado de origem do Cloudflare instalado no cPanel (modo Full strict).
9. **Troca** — no Cloudflare, alterar somente o registro A/CNAME do domínio e do `www` (com proxy), mantendo TXT e demais registros. Netlify fica ativa por 2 semanas para rollback.
10. **Pós-troca** — auditoria das 152 URLs, Search Console (inspeção de URL, sitemap).

## Atualizações futuras

```
cd ~/irineu-app && git pull && npm install && npm run build:standalone
```
Depois, "Restart" no "Setup Node.js App".
