/** Converte números no formato brasileiro (vírgula ou ponto decimal, com ou
 * sem separador de milhar) para number. Retorna undefined se não for numérico. */
export function parseBrNumber(raw: string | number | undefined | null): number | undefined {
  if (raw === undefined || raw === null) return undefined
  if (typeof raw === 'number') return Number.isFinite(raw) ? raw : undefined
  let s = raw.trim()
  if (!s) return undefined
  s = s.replace(/[^\d.,-]/g, '')
  if (!s) return undefined
  const hasComma = s.includes(',')
  const hasDot = s.includes('.')
  if (hasComma && hasDot) {
    s = s.replace(/\./g, '').replace(',', '.')
  } else if (hasComma) {
    s = s.replace(',', '.')
  }
  const n = parseFloat(s)
  return Number.isFinite(n) ? n : undefined
}

/** Remove tags HTML e decodifica as entidades mais comuns vindas da descrição do imóvel. */
export function stripHtml(html: string | undefined | null): string {
  if (!html) return ''
  return html
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&aacute;/g, 'á')
    .replace(/&eacute;/g, 'é')
    .replace(/&iacute;/g, 'í')
    .replace(/&oacute;/g, 'ó')
    .replace(/&uacute;/g, 'ú')
    .replace(/&atilde;/g, 'ã')
    .replace(/&otilde;/g, 'õ')
    .replace(/&ccedil;/g, 'ç')
    .replace(/&sup2;/g, '²')
    .replace(/\r\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim()
}

const CONECTORES = new Set(['de', 'da', 'do', 'das', 'dos', 'e'])

/** Title-case respeitando conectores comuns em nomes de cidade/bairro em pt-BR. */
export function toTitleCasePtBr(text: string | undefined | null): string {
  if (!text) return ''
  return text
    .trim()
    .toLowerCase()
    .split(/\s+/)
    .map((word, i) => {
      if (i > 0 && CONECTORES.has(word)) return word
      return word.charAt(0).toUpperCase() + word.slice(1)
    })
    .join(' ')
}

/** Slug estável para usar como `tipo` (ex.: "CASA RESIDENCIAL " -> "casa-residencial"). */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Formata CEP como 00000-000 quando possível. */
export function formatCep(cep: string | undefined | null): string | undefined {
  if (!cep) return undefined
  const digits = cep.replace(/\D/g, '')
  if (digits.length !== 8) return cep
  return `${digits.slice(0, 5)}-${digits.slice(5)}`
}
