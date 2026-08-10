import type { Imovel } from '@/types/imovel'
import { buildImovelImageUrl } from './image'
import { extrairCaracteristicas } from './caracteristicas'
import { extrairEncargos } from './encargos'
import { classificarCategoria } from './categorias'
import { formatCep, slugify, stripHtml, toTitleCasePtBr } from './parse'
import type { SimobImovelDetalhe, SimobImovelListagem } from './types'

const FOTO_PLACEHOLDER = '/images/predioirienu.png'

function montarTitulo(categoriaLabel: string, bairro: string, edificio: string | null | undefined, quartos: number | undefined): string {
  if (edificio && edificio.trim()) {
    return `${categoriaLabel} - ${edificio.trim()}`
  }
  const sufixoQuartos = quartos ? ` ${quartos} ${quartos === 1 ? 'Quarto' : 'Quartos'}` : ''
  return `${categoriaLabel}${sufixoQuartos} - ${bairro}`
}

function montarEndereco(endereco: string, numero: string | undefined | null): string {
  const num = numero?.trim()
  return num ? `${toTitleCasePtBr(endereco)}, ${num}` : toTitleCasePtBr(endereco)
}

/** Mapeia um item de listagem (/filtro/categoria/caracteristicas, /destaques, /exclusivos) para o modelo interno do site. */
export function mapListagemToImovel(item: SimobImovelListagem): Imovel {
  const categoriaLabel = toTitleCasePtBr(item.descricaoCategoria)
  const { quartos, banheiros, vagas, area, diferenciais } = extrairCaracteristicas(item.caracteristicas)

  const imagensSource = item.imagens && item.imagens.length > 0
    ? item.imagens.map((img) => buildImovelImageUrl(item.baseUrlImagem, img.baseNomeImagem, img.extensao))
    : item.baseNomeImagem
      ? [buildImovelImageUrl(item.baseUrlImagem, item.baseNomeImagem, item.extensao)]
      : []

  return {
    id: item.codigo,
    titulo: montarTitulo(categoriaLabel, toTitleCasePtBr(item.bairro), item.edificio, quartos),
    tipo: slugify(item.descricaoCategoria),
    categoria: classificarCategoria(item.descricaoCategoria),
    status: 'disponivel',
    preco: Number(item.valor) || 0,
    cidade: toTitleCasePtBr(item.cidade),
    bairro: toTitleCasePtBr(item.bairro),
    regiao: item.uf || '',
    endereco: montarEndereco(item.endereco, item.numero),
    cep: formatCep(item.cep),
    area: area ?? 0,
    quartos,
    banheiros,
    vagas,
    descricao: stripHtml(item.descricaoImovel),
    caracteristicas: diferenciais,
    encargos: [],
    fotos: imagensSource.length > 0 ? imagensSource : [FOTO_PLACEHOLDER],
    destaque: item.exclusividade === '1',
    codigoSimob: item.codigo,
    createdAt: item.updatedAt.replace(' ', 'T'),
    updatedAt: item.updatedAt.replace(' ', 'T'),
  }
}

/** Mapeia a resposta de /detalhes/imovel/{codigo} para o modelo interno do site. */
export function mapDetalheToImovel(item: SimobImovelDetalhe): Imovel {
  const categoriaLabel = toTitleCasePtBr(item.categoria.descricao)
  const { quartos, banheiros, vagas, area, diferenciais } = extrairCaracteristicas(item.caracteristicas)

  // Só o tamanho-base (sem sufixo) é gerado de forma confiável para todas as
  // fotos no servidor da Simob — os sufixos de miniatura/1366x768 retornam
  // 404 em parte do acervo, então evitamos depender deles.
  const imagensSource = item.imagens && item.imagens.length > 0
    ? [...item.imagens].sort((a, b) => (a.posicao ?? 0) - (b.posicao ?? 0)).map((img) => buildImovelImageUrl(item.baseUrlImagem, img.baseNomeImagem, img.extensao))
    : []

  const valor = item.configLocacao?.valor ?? item.configVenda?.valor ?? '0'

  return {
    id: item.codigo,
    titulo: montarTitulo(categoriaLabel, toTitleCasePtBr(item.bairro), item.edificio, quartos),
    tipo: slugify(item.categoria.descricao),
    categoria: classificarCategoria(item.categoria.descricao),
    status: 'disponivel',
    preco: Number(valor) || 0,
    cidade: toTitleCasePtBr(item.cidade),
    bairro: toTitleCasePtBr(item.bairro),
    regiao: item.uf || '',
    endereco: montarEndereco(item.endereco, item.numero),
    cep: formatCep(item.cep),
    area: area ?? 0,
    quartos,
    banheiros,
    vagas,
    descricao: stripHtml(item.descricao),
    caracteristicas: diferenciais,
    encargos: extrairEncargos(item.caracteristicas),
    fotos: imagensSource.length > 0 ? imagensSource : [FOTO_PLACEHOLDER],
    destaque: false,
    codigoSimob: item.codigo,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
}
