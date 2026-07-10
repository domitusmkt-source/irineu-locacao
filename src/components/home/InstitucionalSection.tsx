'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function InstitucionalSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('.anim'),
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.55, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      }
    )
  }, [])

  return (
    <section className="py-16 md:py-24 bg-[#F4F6F9]" id="sobre">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">

          {/* Foto — coluna completa, grande */}
          <div className="relative">
            <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/donosirineu.png"
                alt="Fundadores da Irineu Locação de Imóveis — mais de 25 anos de história"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2B6B]/25 to-transparent" />
              {/* Selo 25+ sobreposto na foto */}
              <div className="absolute bottom-4 right-4 bg-[#CC2929] text-white rounded-2xl px-5 py-4 shadow-2xl text-center">
                <p className="text-3xl font-extrabold leading-none">25+</p>
                <p className="text-xs font-semibold mt-1 whitespace-nowrap">anos de história</p>
              </div>
            </div>
          </div>

          {/* Texto */}
          <div ref={ref} className="pt-2 md:pt-0">
            <p className="anim text-[#CC2929] text-xs font-bold uppercase tracking-widest mb-3">Quem somos</p>
            <h2 className="anim text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-5 leading-tight">
              Mais de 25 anos cuidando de quem confia na Irineu
            </h2>
            <p className="anim text-gray-600 leading-relaxed mb-4 text-sm md:text-base">
              Somos referência em locação no Norte de Santa Catarina. Conectamos proprietários e inquilinos com segurança, transparência e atendimento humanizado.
            </p>
            <p className="anim text-gray-600 leading-relaxed mb-8 text-sm md:text-base hidden sm:block">
              Nossa equipe está pronta para encontrar o imóvel certo para você — ou para cuidar do seu patrimônio com a dedicação que ele merece.
            </p>

            <div className="anim flex flex-wrap gap-3">
              <div className="bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                <span className="text-[#1B4398] font-bold text-sm">CRECI 2959J</span>
              </div>
              <div className="bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                <span className="text-[#1E293B] font-semibold text-sm">Joinville e Norte SC</span>
              </div>
              <div className="bg-white rounded-xl px-4 py-2.5 border border-gray-100 shadow-sm">
                <span className="text-[#1E293B] font-semibold text-sm">7 cidades atendidas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
