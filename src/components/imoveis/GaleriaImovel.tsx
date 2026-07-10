'use client'
import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface GaleriaImovelProps {
  fotos: string[]
  titulo: string
}

export function GaleriaImovel({ fotos, titulo }: GaleriaImovelProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  function prev() {
    if (lightbox === null) return
    setLightbox(lightbox === 0 ? fotos.length - 1 : lightbox - 1)
  }

  function next() {
    if (lightbox === null) return
    setLightbox(lightbox === fotos.length - 1 ? 0 : lightbox + 1)
  }

  const all = fotos.length > 0 ? fotos : ['/images/predioirienu.png']

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 rounded-2xl overflow-hidden">
        {/* Main photo */}
        <button
          onClick={() => setLightbox(0)}
          className="col-span-2 row-span-2 relative aspect-video md:aspect-auto md:h-72 w-full overflow-hidden"
          aria-label="Ver foto em tela cheia"
        >
          <Image
            src={all[0]}
            alt={`${titulo} - foto principal`}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </button>

        {/* Other photos */}
        {all.slice(1, 5).map((foto, i) => (
          <button
            key={i}
            onClick={() => setLightbox(i + 1)}
            className="relative aspect-video overflow-hidden bg-gray-100"
            aria-label={`Ver foto ${i + 2} em tela cheia`}
          >
            <Image
              src={foto}
              alt={`${titulo} - foto ${i + 2}`}
              fill
              className="object-cover hover:scale-105 transition-transform duration-500"
              sizes="25vw"
            />
            {i === 3 && all.length > 5 && (
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{all.length - 5} fotos</span>
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button className="absolute top-4 right-4 text-white hover:text-gray-300" onClick={() => setLightbox(null)}>
              <X size={28} />
            </button>
            <button className="absolute left-4 text-white hover:text-gray-300 z-10" onClick={(e) => { e.stopPropagation(); prev() }}>
              <ChevronLeft size={40} />
            </button>
            <div className="relative max-w-4xl max-h-[80vh] w-full" onClick={(e) => e.stopPropagation()}>
              <Image
                src={all[lightbox]}
                alt={`${titulo} - foto ${lightbox + 1}`}
                width={1200}
                height={800}
                className="object-contain max-h-[80vh] w-full"
              />
            </div>
            <button className="absolute right-4 text-white hover:text-gray-300 z-10" onClick={(e) => { e.stopPropagation(); next() }}>
              <ChevronRight size={40} />
            </button>
            <p className="absolute bottom-4 text-white/60 text-sm">{lightbox + 1} / {all.length}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
