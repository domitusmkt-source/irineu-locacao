'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const categorias = [
  {
    label: 'Casas',
    sub: 'Residencial',
    img: '/images/casa.png',
    href: '/locacao-residencial?tipo=casa',
  },
  {
    label: 'Terrenos',
    sub: 'Residencial',
    img: '/images/terreno.png',
    href: '/locacao-residencial?tipo=terreno',
  },
  {
    label: 'Salas Comerciais',
    sub: 'Comercial',
    img: '/images/salacomercial.png',
    href: '/locacao-comercial?tipo=sala-comercial',
  },
  {
    label: 'Galpões',
    sub: 'Industrial',
    img: '/images/galpaoe.png',
    href: '/locacao-comercial?tipo=galpao',
  },
  {
    label: 'Prédios',
    sub: 'Comercial',
    img: '/images/predio.png',
    href: '/locacao-comercial?tipo=predio',
  },
]

export function TiposImovelSection() {
  return (
    <section className="py-20 md:py-28 bg-white" id="categorias">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <p className="text-[#E32618] text-xs font-bold uppercase tracking-widest mb-3">O que procura?</p>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#1E293B] leading-tight max-w-xl">
              Encontre aqui seu tipo de imóvel para locação
            </h2>
          </div>
          <motion.div
            className="h-1 w-20 bg-[#E32618] rounded-full shrink-0 mb-1"
            initial={{ scaleX: 0, originX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            viewport={{ once: true }}
          />
        </div>

        {/* Grade de cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
          {categorias.map((cat, i) => (
            <motion.div
              key={cat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: 'easeOut' }}
              viewport={{ once: true }}
            >
              <Link
                href={cat.href}
                className="group relative flex flex-col rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                style={{ aspectRatio: '3/4' }}
              >
                <Image
                  src={cat.img}
                  alt={cat.label}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                />

                {/* Overlay escuro neutro */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />

                {/* Conteúdo no rodapé */}
                <div className="absolute bottom-0 inset-x-0 p-4 md:p-5">
                  <p className="text-white/55 text-[10px] font-semibold uppercase tracking-widest mb-1">{cat.sub}</p>
                  <div className="flex items-end justify-between gap-2">
                    <p className="text-white font-bold text-base md:text-lg leading-tight">{cat.label}</p>
                    <ArrowRight
                      size={17}
                      className="text-white/60 group-hover:text-white group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                    />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
