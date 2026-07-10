'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Building2, Award, MapPin, ShieldCheck } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { icon: Award, value: '25+', label: 'Anos de experiência', color: 'text-[#1B4398]' },
  { icon: Building2, value: '500+', label: 'Imóveis locados', color: 'text-[#CC2929]' },
  { icon: MapPin, value: '7', label: 'Cidades atendidas', color: 'text-[#1B4398]' },
  { icon: ShieldCheck, value: 'CRECI 2959J', label: 'Certificação ativa', color: 'text-[#CC2929]' },
]

export function TrustBar() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return
    const items = ref.current.querySelectorAll('.trust-item')
    gsap.fromTo(
      items,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: { trigger: ref.current, start: 'top 85%' },
      }
    )
  }, [])

  return (
    <section className="bg-white border-b border-gray-100 py-10" aria-label="Números da Irineu">
      <div ref={ref} className="max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map(({ icon: Icon, value, label, color }) => (
          <div key={label} className="trust-item flex flex-col items-center text-center gap-2">
            <Icon size={28} className={color} />
            <p className={`text-3xl font-extrabold ${color}`}>{value}</p>
            <p className="text-gray-500 text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
