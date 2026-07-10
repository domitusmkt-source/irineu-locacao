'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { gsap } from 'gsap'
import { BuscaHero } from './BuscaHero'

export function HeroSection() {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!textRef.current) return
    const els = textRef.current.querySelectorAll('.hero-anim')
    gsap.fromTo(
      els,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <Image
          src="/images/predioirienu.png"
          alt="Prédio Irineu Locação de Imóveis em Joinville"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#0D2B6B]/88 via-[#1B4398]/65 to-[#0D2B6B]/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 pt-24 pb-16 text-white text-center md:text-left">
        <div ref={textRef}>
          <div className="hero-anim inline-block bg-white/15 backdrop-blur-sm border border-white/20 text-white text-xs font-semibold px-4 py-1.5 rounded-full mb-5 tracking-wider">
            Irineu Locação de Imóveis • CRECI 2959J
          </div>

          <h1 className="hero-anim text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-4 max-w-3xl">
            Seu próximo endereço{' '}
            <span className="text-red-400">começa aqui</span>
          </h1>

          <p className="hero-anim text-lg sm:text-xl text-blue-100 mb-3 max-w-2xl">
            Encontre o imóvel ideal para morar ou para o seu negócio em Santa Catarina.
          </p>
          <p className="hero-anim text-base text-blue-200 mb-10 max-w-xl">
            Seu negócio pode começar aqui. Mais de 25 anos conectando pessoas aos melhores imóveis da região.
          </p>

          <div className="hero-anim">
            <BuscaHero />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/60 text-xs animate-bounce">
        <span>Scroll</span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  )
}
