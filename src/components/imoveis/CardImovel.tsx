'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { MapPin, BedDouble, Car, Maximize2, MessageCircle } from 'lucide-react'
import { Imovel } from '@/types/imovel'
import { formatarArea } from '@/lib/imovel-texto'

const TIPO_BADGE_CLASS = 'bg-[#1C3E77] text-white'

const tipoLabel: Record<string, string> = {
  apartamento: 'Apartamento',
  casa: 'Casa',
  'casa-residencial': 'Casa',
  'casa-comercial': 'Casa Comercial',
  kitnet: 'Kitnet',
  terreno: 'Terreno',
  galpao: 'Galpão',
  'sala-comercial': 'Sala Comercial',
  comercial: 'Comercial',
}

interface CardImovelProps {
  imovel: Imovel
}

export function CardImovel({ imovel }: CardImovelProps) {
  // Área 0 = não informada na Simob: omitida em vez de exibir "0 m²".
  const area = formatarArea(imovel.area)
  const waMsg = encodeURIComponent(`Olá! Tenho interesse no imóvel: ${imovel.titulo} - ${imovel.cidade}/${imovel.bairro}. Código: ${imovel.id}`)

  return (
    <motion.article
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border border-gray-100 flex flex-col group"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
    >
      {/* Foto */}
      <Link href={`/imoveis/${imovel.id}`} className="relative block aspect-video overflow-hidden bg-gray-100">
        <Image
          src={imovel.fotos[0]}
          alt={`${imovel.titulo} para alugar em ${imovel.cidade}`}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${TIPO_BADGE_CLASS}`}>
            {tipoLabel[imovel.tipo] ?? imovel.tipo}
          </span>
        </div>
        {imovel.destaque && (
          <div className="absolute top-3 right-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#E32618] text-white">Destaque</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        <div>
          <p className="text-xl font-bold text-[#1C3E77]">
            R$ {imovel.preco.toLocaleString('pt-BR')}
            <span className="text-sm font-normal text-gray-500">/mês</span>
          </p>
          <Link href={`/imoveis/${imovel.id}`}>
            <h3 className="font-semibold text-[#1E293B] mt-1 hover:text-[#1C3E77] transition-colors line-clamp-2">
              {imovel.titulo}
            </h3>
          </Link>
          <div className="flex items-center gap-1.5 mt-1 text-gray-500 text-sm">
            <MapPin size={13} />
            <span>{imovel.bairro}, {imovel.cidade}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex items-center gap-4 text-gray-500 text-sm border-t pt-3">
          {imovel.quartos != null && (
            <div className="flex items-center gap-1">
              <BedDouble size={14} />
              <span>{imovel.quartos}</span>
            </div>
          )}
          {imovel.vagas != null && (
            <div className="flex items-center gap-1">
              <Car size={14} />
              <span>{imovel.vagas}</span>
            </div>
          )}
          {area && (
            <div className="flex items-center gap-1">
              <Maximize2 size={14} />
              <span>{area} m²</span>
            </div>
          )}
        </div>

        {/* Botões */}
        <div className="flex gap-2 mt-auto">
          <Link
            href={`/imoveis/${imovel.id}`}
            className="flex-1 bg-[#1C3E77] hover:bg-[#0D2853] text-white text-sm font-semibold py-2.5 rounded-lg text-center transition-colors"
          >
            Ver detalhes
          </Link>
          <a
            href={`https://api.whatsapp.com/send?phone=554734817707&text=${waMsg}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 bg-green-600 hover:bg-green-700 text-white text-sm font-semibold px-3 py-2.5 rounded-lg transition-colors"
            aria-label="Contato via WhatsApp"
          >
            <MessageCircle size={16} />
          </a>
        </div>
      </div>
    </motion.article>
  )
}
