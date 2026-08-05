'use client'

import { useEffect, useState, type ReactNode } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface GaleriaDetalheImovelProps {
  fotos: string[]
  titulo: string
  /** Classes de altura do bloco da foto principal (definidas pela página). */
  alturaClassName: string
  /** Overlay (badge/título/preço) renderizado pela página por cima da foto principal. */
  children?: ReactNode
}

const THUMBS_VISIVEIS = 5

/**
 * Foto principal + tira de miniaturas + lightbox da página de detalhe do imóvel.
 * Clicar em uma miniatura troca a foto principal na hora (sem modal); a 6ª
 * miniatura ("+N Fotos") abre o lightbox com a galeria completa.
 */
export function GaleriaDetalheImovel({ fotos, titulo, alturaClassName, children }: GaleriaDetalheImovelProps) {
  const lista = fotos.length > 0 ? fotos : ['/images/predioirienu.png']
  const [ativa, setAtiva] = useState(0)
  const [lightbox, setLightbox] = useState<number | null>(null)

  function prev() {
    setLightbox((i) => (i === null ? i : i === 0 ? lista.length - 1 : i - 1))
  }
  function next() {
    setLightbox((i) => (i === null ? i : i === lista.length - 1 ? 0 : i + 1))
  }

  useEffect(() => {
    if (lightbox === null) return
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') setLightbox(null)
      else if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lightbox, lista.length])

  const thumbsVisiveis = lista.slice(0, THUMBS_VISIVEIS)
  const restantes = lista.length - THUMBS_VISIVEIS

  return (
    <>
      {/* Foto principal */}
      <div className={`relative w-full ${alturaClassName} bg-gray-200`}>
        <Image
          src={lista[ativa]}
          alt={titulo}
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        {children}
      </div>

      {/* Miniaturas */}
      {lista.length > 1 && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 lg:flex lg:justify-center lg:gap-3">
            {thumbsVisiveis.map((foto, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setAtiva(i)}
                className={`relative aspect-square rounded-lg overflow-hidden bg-gray-100 transition-all lg:aspect-auto lg:w-32 lg:h-24 lg:shrink-0 ${
                  ativa === i ? 'ring-2 ring-[#1B4398] ring-offset-2' : 'opacity-90 hover:opacity-100'
                }`}
                aria-label={`Ver foto ${i + 1}`}
                aria-current={ativa === i}
              >
                <Image
                  src={foto}
                  alt={`${titulo} - foto ${i + 1}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 130px, 120px"
                />
              </button>
            ))}
            {restantes > 0 && (
              <button
                type="button"
                onClick={() => setLightbox(THUMBS_VISIVEIS)}
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 lg:aspect-auto lg:w-32 lg:h-24 lg:shrink-0"
                aria-label={`Ver todas as ${lista.length} fotos`}
              >
                <Image
                  src={lista[THUMBS_VISIVEIS]}
                  alt={`${titulo} - mais fotos`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 130px, 120px"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                  <span className="text-white font-bold text-lg">+{restantes} Fotos</span>
                </div>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-gray-300"
            onClick={() => setLightbox(null)}
            aria-label="Fechar"
          >
            <X size={28} />
          </button>
          <button
            className="absolute left-4 text-white hover:text-gray-300 z-10"
            onClick={(e) => { e.stopPropagation(); prev() }}
            aria-label="Foto anterior"
          >
            <ChevronLeft size={40} />
          </button>
          <div className="relative max-w-4xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
            <Image
              src={lista[lightbox]}
              alt={`${titulo} - foto ${lightbox + 1}`}
              width={1200}
              height={800}
              className="object-contain max-h-[80vh] w-full"
            />
          </div>
          <button
            className="absolute right-4 text-white hover:text-gray-300 z-10"
            onClick={(e) => { e.stopPropagation(); next() }}
            aria-label="Próxima foto"
          >
            <ChevronRight size={40} />
          </button>
          <p className="absolute bottom-4 text-white/60 text-sm">{lightbox + 1} / {lista.length}</p>
        </div>
      )}
    </>
  )
}
