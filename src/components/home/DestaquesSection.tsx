'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { CardImovel } from '@/components/imoveis/CardImovel'
import { Imovel } from '@/types/imovel'

gsap.registerPlugin(ScrollTrigger)

interface DestaquesSectionProps {
  imoveis: Imovel[]
}

export function DestaquesSection({ imoveis }: DestaquesSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const cards = ref.current.querySelectorAll('article')
    gsap.fromTo(
      cards,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 80%' },
      }
    )
  }, [])

  return (
    <section className="py-20 bg-[#F4F6F9]" id="destaques">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-[#CC2929] text-sm font-bold uppercase tracking-widest mb-2">Destaques</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#1E293B]">Destaques de Locação</h2>
            <p className="text-gray-500 mt-2">Os melhores imóveis disponíveis agora para você</p>
          </div>
          <Link
            href="/imoveis"
            className="flex items-center gap-2 text-[#1B4398] font-semibold hover:gap-3 transition-all shrink-0"
          >
            Ver todos os imóveis <ArrowRight size={18} />
          </Link>
        </div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {imoveis.map((imovel) => (
            <CardImovel key={imovel.id} imovel={imovel} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/imoveis"
            className="inline-flex items-center gap-2 bg-[#1B4398] hover:bg-[#0D2B6B] text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            Ver todos os imóveis disponíveis <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}
