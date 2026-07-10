'use client'
import dynamic from 'next/dynamic'

const MapaImovelDynamic = dynamic(
  () => import('@/components/MapaImovel').then((m) => m.MapaImovel),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-100 rounded-xl animate-pulse" />,
  }
)

interface MapaImovelWrapperProps {
  lat: number
  lng: number
  titulo: string
  preco: number
}

export function MapaImovelWrapper({ lat, lng, titulo, preco }: MapaImovelWrapperProps) {
  return <MapaImovelDynamic lat={lat} lng={lng} titulo={titulo} preco={preco} />
}
