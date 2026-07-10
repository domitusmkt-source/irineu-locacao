'use client'

interface MapaImovelProps {
  lat: number
  lng: number
  titulo: string
  preco: number
}

export function MapaImovel({ lat, lng, titulo, preco }: MapaImovelProps) {
  const delta = 0.008
  const bbox = `${lng - delta},${lat - delta},${lng + delta},${lat + delta}`
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${lat},${lng}`

  return (
    <div className="rounded-xl overflow-hidden border border-gray-100" style={{ height: 380 }}>
      <iframe
        title={`Localização: ${titulo}`}
        src={src}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        sandbox="allow-scripts allow-same-origin"
        aria-label={`Mapa mostrando localização de ${titulo} — R$ ${preco.toLocaleString('pt-BR')}/mês`}
      />
    </div>
  )
}
