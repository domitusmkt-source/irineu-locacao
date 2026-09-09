'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CheckCircle2 } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const benefits = [
  'Imóveis bem localizados',
  'Contratos claros e seguros',
  'Atendimento do início ao fim',
]

interface ResidencialSectionProps {
  /** Quantidade real de imóveis residenciais disponíveis, vinda do Simob. */
  totalResidenciais?: number
}

export function ResidencialSection({ totalResidenciais }: ResidencialSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current.querySelectorAll('.anim-fade'),
      { opacity: 0, x: -40 },
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
    <section className="py-20 bg-white" id="residencial">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
            <Image
              src="/images/predioirienu.png"
              alt="Imóveis residenciais para alugar - Irineu Locação"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0D2853]/40 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-white rounded-xl px-4 py-2 shadow">
              <p className="text-[#1C3E77] font-bold text-sm">
                {totalResidenciais ? `+${totalResidenciais} imóveis residenciais` : 'Diversos imóveis residenciais'}
              </p>
              <p className="text-gray-500 text-xs">disponíveis agora</p>
            </div>
          </div>

          <div>
            <p className="anim-fade text-[#E32618] text-sm font-bold uppercase tracking-widest mb-3">Locação Residencial</p>
            <h2 className="anim-fade text-3xl md:text-4xl font-extrabold text-[#1E293B] mb-4 leading-tight">
              O lar ideal para você e sua família
            </h2>
            <p className="anim-fade text-gray-600 leading-relaxed mb-6">
              Apartamentos, casas e terrenos para você encontrar o lugar certo para chamar de lar.
            </p>
            <ul className="space-y-3 mb-8">
              {benefits.map((b) => (
                <li key={b} className="anim-fade flex items-start gap-3 text-gray-700">
                  <CheckCircle2 size={18} className="text-[#1C3E77] mt-0.5 shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
            <Link
              href="/imoveis?categoria=residencial"
              className="anim-fade inline-block bg-[#1C3E77] hover:bg-[#0D2853] text-white font-semibold px-7 py-3.5 rounded-xl transition-colors"
            >
              Ver imóveis residenciais
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
