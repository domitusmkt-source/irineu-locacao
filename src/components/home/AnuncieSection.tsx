'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { CheckCircle2, MessageCircle } from 'lucide-react'

const WA_URL = 'https://api.whatsapp.com/send?phone=554734817707&text=Olá! Gostaria de anunciar meu imóvel com a Irineu Locação.'

const beneficios = [
  'Avaliação gratuita do imóvel',
  'Contrato seguro e transparente',
  'Gestão completa de cobranças',
  'Carteira de clientes qualificados',
]

export function AnuncieSection() {
  return (
    <section className="bg-[#0D2B6B]" id="anuncie">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 items-end">

          {/* Coluna esquerda — texto */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="py-14 md:py-20 md:pr-10"
          >
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mb-4">Para Proprietários</p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white leading-tight mb-4">
              Tem um imóvel<br />para alugar?
            </h2>
            <p className="text-blue-200 mb-8 max-w-md">
              Anuncie com quem entende do mercado local. Cuidamos de tudo para você locar com segurança.
            </p>

            {/* Cards de benefício */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {beneficios.map((b) => (
                <div key={b} className="flex items-center gap-2.5 bg-white/10 rounded-xl px-4 py-3">
                  <CheckCircle2 size={15} className="text-blue-300 shrink-0" />
                  <span className="text-white/90 text-sm">{b}</span>
                </div>
              ))}
            </div>

            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-green-500 hover:bg-green-600 text-white font-bold px-7 py-4 rounded-xl transition-colors text-sm"
            >
              <MessageCircle size={19} />
              Quero anunciar meu imóvel
            </a>
          </motion.div>

          {/* Coluna direita — imagem desktop (object-contain, proporcional) */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            viewport={{ once: true }}
            className="hidden md:flex justify-center items-end pt-8"
          >
            <Image
              src="/images/chavefundo.png"
              alt="Anuncie seu imóvel com a Irineu Locação"
              width={504}
              height={504}
              className="w-auto max-w-full object-contain object-bottom"
              style={{ maxHeight: 504, filter: 'drop-shadow(0 10px 40px rgba(0,0,0,0.4))' }}
            />
          </motion.div>

          {/* Imagem mobile — abaixo do texto, centralizada, sem cortar */}
          <div className="md:hidden flex justify-center items-end pt-10">
            <Image
              src="/images/chavefundo.png"
              alt="Anuncie seu imóvel com a Irineu Locação"
              width={370}
              height={370}
              className="w-auto max-w-full object-contain object-bottom"
              style={{ maxHeight: 370, filter: 'drop-shadow(0 8px 24px rgba(0,0,0,0.25))' }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
