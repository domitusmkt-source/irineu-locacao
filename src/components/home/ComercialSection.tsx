'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import { CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  'Galpões industriais próximos à BR-280 e ao Porto',
  'Salas no centro de Joinville e Jaraguá do Sul',
  'Contratos flexíveis para seu negócio crescer',
]

export function ComercialSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('.anim-fade'),
      { opacity: 0, x: 40 },
      {
        opacity: 1,
        x: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 75%' },
      }
    )
  }, [])

  return (
    <section className="py-20 bg-[#F4F6F9]" id="comercial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

          {/* Texto — esquerda */}
          <div>
            <p className="anim-fade text-[#E32618] text-sm font-bold uppercase tracking-widest mb-3">Locação Comercial</p>
            <h2 className="anim-fade text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-4 leading-tight">
              O espaço certo para o seu negócio
            </h2>
            <p className="anim-fade text-gray-600 leading-relaxed mb-6">
              Do pequeno escritório ao grande galpão industrial, encontre o imóvel comercial ideal para sua empresa em Santa Catarina.
            </p>

            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="anim-fade flex items-start gap-3 text-gray-700 text-sm">
                  <CheckCircle2 size={16} className="text-[#E32618] mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>

            <div className="anim-fade flex flex-wrap gap-3">
              <Link
                href="/locacao-comercial"
                className="bg-[#1C3E77] hover:bg-[#0D2853] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
              >
                Ver imóveis comerciais
              </Link>
              <Link
                href="/locacao-comercial?tipo=galpao"
                className="border border-[#1C3E77] text-[#1C3E77] hover:bg-blue-50 font-semibold px-7 py-3.5 rounded-xl transition-colors text-sm"
              >
                Galpões
              </Link>
            </div>
          </div>

          {/* Imagem — direita */}
          <div className="anim-fade relative">
            {/* Imagem principal — galpão */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
              <Image
                src="/images/galpaoe.png"
                alt="Galpão industrial para alugar - Irineu Locação"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2853]/60 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="bg-white/90 text-[#1C3E77] text-xs font-bold px-3 py-1.5 rounded-lg">Galpão Industrial</span>
              </div>
            </div>

            {/* Card flutuante — sala comercial */}
            <div className="absolute -bottom-6 -right-4 md:-right-6 w-44 rounded-2xl overflow-hidden shadow-2xl border-2 border-white">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/salacomercial.png"
                  alt="Sala comercial para alugar - Irineu Locação"
                  fill
                  className="object-cover"
                  sizes="176px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C3E77]/80 to-transparent" />
                <div className="absolute bottom-2 left-2">
                  <span className="text-white text-[10px] font-bold">Sala Comercial</span>
                </div>
              </div>
            </div>

            {/* Stats pill */}
            <div className="absolute -top-4 -left-4 md:-left-6 bg-[#E32618] text-white rounded-2xl px-4 py-3 shadow-xl text-center">
              <p className="text-2xl font-extrabold leading-none">50+</p>
              <p className="text-[10px] font-semibold mt-0.5 whitespace-nowrap">imóveis comerciais</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
