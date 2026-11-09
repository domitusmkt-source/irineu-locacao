# Irineu Locação — instalação no cPanel (Node.js 22)

Pacote do site Next.js 16 compilado em modo *standalone* para **Linux x64 (glibc)**.
Não contém credenciais. A Netlify continua no ar; **não altere o DNS** até os testes
da etapa 6 serem aprovados.

## Conteúdo

```
irineu-locacao-cpanel/
├── app.js                       arquivo de inicialização (Passenger)
├── modelo.env.production.local  modelo (sem valores) das credenciais
├── LEIA-ME-INSTALACAO.md
└── standalone/                  servidor Next.js (não editar)
    ├── server.js
    ├── .next/                   páginas, cache ISR (gravável)
    ├── public/                  imagens e arquivos públicos
    └── node_modules/            dependências, já incluídas (inclui sharp Linux)
```

## Requisitos do servidor

- Node.js **22** (aceita ≥ 20.9) com Phusion Passenger: "Setup Node.js App" (CloudLinux)
  **ou** "Application Manager" (cPanel).
- Linux x64 com glibc ≥ 2.26 (para a otimização de imagens).
- Memória para o processo: recomendado ≥ 512 MB.
- Acesso de saída HTTPS do servidor para a API da Simob.

## Passo a passo

### 1. Enviar e extrair (Gerenciador de Arquivos)
1. Envie o `.zip` para a pasta **inicial da conta** (`/home/USUÁRIO/`) — **nunca** para
   `public_html` ou outra pasta pública.
2. Clique com o botão direito no `.zip` → *Extract*. Resultado: `/home/USUÁRIO/irineu-locacao-cpanel/`.
3. (Opcional) Confira o SHA-256 do `.zip` com o arquivo `.sha256` enviado junto.

### 2. Credenciais (Gerenciador de Arquivos)
1. Dentro de `irineu-locacao-cpanel/`, crie o arquivo **`.env.production.local`**
   (com o ponto inicial; ative "Mostrar arquivos ocultos" nas configurações do Gerenciador).
2. Edite e preencha, copiando os valores **direto do Bitwarden**:
   ```
   SIMOB_BASE_URL=
   SIMOB_TOKEN=
   ```
3. Permissões do arquivo: **600**.
4. Não defina `SITE_NOINDEX`. (`SIMOB_JWT_SECRET` não é usado.)

Alternativa: cadastrar as mesmas duas variáveis na tela da aplicação (etapa 3). As
variáveis do painel têm prioridade sobre o arquivo.

### 3. Criar a aplicação

**A) "Setup Node.js App" (CloudLinux)** → *Create Application*
| Campo | Valor |
|---|---|
| Node.js version | 22.x |
| Application mode | Production |
| Application root | `irineu-locacao-cpanel` |
| Application URL | o domínio/subdomínio de teste definido com a Informatech |
| Application startup file | `app.js` |

Não clique em "Run NPM Install" (as dependências já estão no pacote).

**B) "Application Manager" (cPanel)** → *Register Application*
| Campo | Valor |
|---|---|
| Application Name | irineu-locacao |
| Deployment Domain | o domínio/subdomínio de teste |
| Base Application URL | `/` |
| Application Path | `irineu-locacao-cpanel` |
| Deployment Environment | Production |

Não use "Ensure dependencies".

### 4. Iniciar
Clique em *Start*/*Restart*. Para conferir, abra o log da aplicação (ex.:
`irineu-locacao-cpanel/stderr.log`, log do Passenger, ou o indicado pela Informatech).
Linhas esperadas:
```
[irineu] Node.js 22.x linux/x64
[irineu] credenciais da Simob encontradas (valores não exibidos)
[irineu] sharp OK (libvips …) — otimização de imagens ativa
[irineu] cache ISR (standalone/.next/cache) gravável
```
Qualquer linha com **ATENÇÃO** deve ser resolvida antes de continuar.

### 5. Atualizações futuras
Gerar um novo pacote (`npm run package:cpanel` no projeto), enviar, extrair por cima
**preservando** o `.env.production.local`, e *Restart*.

### 6. Testes antes do DNS (feitos pela equipe técnica)
Com o site acessível pelo endereço de teste (ou via `curl --resolve` para o IP do servidor):
- `/`, `/imoveis`, `/locacao-residencial`, `/locacao-comercial`, `/imoveis/1987` → 200
- `/imoveis/99999999` → 404
- `/sitemap.xml` → 152 URLs; `/robots.txt` → `Allow: /`
- Uma foto em `/_next/image?...` → `image/webp`
- 2º acesso a um imóvel bem mais rápido que o 1º (cache ISR)

### 7. Troca de DNS
Somente após aprovação dos testes, no Cloudflare: alterar apenas o registro do
domínio e do `www` para o IP do servidor (proxy ativo), mantendo TXT e demais registros.
A Netlify fica ativa para retorno imediato, se necessário.
