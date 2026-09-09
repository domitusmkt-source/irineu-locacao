'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/** Uma das três setas/telhados da identidade, usada como elemento gráfico
 *  decorativo em grande escala e baixíssima opacidade — nunca como conteúdo. */
function ChevronMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 90" fill="none" aria-hidden="true" className={className}>
      <path d="M4 78 L50 34 L96 78 V90 L50 52 L4 90 Z" fill="currentColor" />
    </svg>
  )
}

/** Seção de marca: pausa institucional na jornada da Home, com a arte oficial
 *  do slogan como único protagonista. Nenhum texto é recriado — apenas o asset. */
export function SloganSection() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    gsap.fromTo(
      ref.current,
      { opacity: 0, y: 24 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      }
    )
  }, [])

  return (
    <section className="relative bg-[#F7F8FA] py-24 md:py-36 overflow-hidden">
      {/* Elementos geométricos sutis — ecoam as três setas da marca, sem competir com ela */}
      <ChevronMark className="pointer-events-none absolute -top-6 -left-10 w-40 h-36 md:w-64 md:h-56 text-[#1C3E77] opacity-[0.05]" />
      <ChevronMark className="pointer-events-none absolute -bottom-10 -right-8 w-48 h-44 md:w-72 md:h-64 text-[#1C3E77] opacity-[0.05] rotate-6" />

      <div ref={ref} className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="w-10 h-0.5 bg-[#E32618] mx-auto mb-10" />
        <Image
          src="/images/slogan-irineu.png"
          alt="Se é da Irineu, pode confiar"
          width={850}
          height={347}
          className="mx-auto w-72 sm:w-96 md:w-[460px] h-auto"
          priority={false}
        />
      </div>
    </section>
  )
}
