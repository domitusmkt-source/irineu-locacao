'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { BarChart3, ShieldCheck, Users, TrendingUp, CheckCircle2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const beneficios = [
  { icon: BarChart3, titulo: 'Análise Especializada', desc: 'Avaliamos seu imóvel e definimos o melhor valor de locação para o mercado atual.' },
  { icon: ShieldCheck, titulo: 'Suporte Jurídico', desc: 'Contratos seguros, vistorias profissionais e respaldo jurídico em todo o processo.' },
  { icon: Users, titulo: 'Maior Visibilidade', desc: 'Seu imóvel em nossos portais, redes sociais e carteira de clientes qualificados.' },
  { icon: TrendingUp, titulo: 'Gestão Completa', desc: 'Do anúncio ao contrato assinado, cuidamos de tudo para você.' },
]

export default function AnunciePage() {
  const [form, setForm] = useState({
    nome: '', tel: '', email: '', tipo: '', cidade: '', bairro: '',
    valor: '', descricao: '', lgpd: false, whatsapp: false,
  })
  const [erro, setErro] = useState('')
  const [enviado, setEnviado] = useState(false)

  function set(field: string, value: string | boolean) {
    setForm((f) => ({ ...f, [field]: value }))
  }

  function handleEmail(e: React.FormEvent) {
    e.preventDefault()
    if (!form.lgpd) { setErro('Aceite a política de privacidade para continuar.'); return }
    if (!form.nome || !form.tel || !form.email || !form.tipo || !form.cidade) {
      setErro('Preencha todos os campos obrigatórios.')
      return
    }
    setErro('')
    const corpo = `Nome: ${form.nome}\nTelefone: ${form.tel}\nE-mail: ${form.email}\nTipo: ${form.tipo}\nCidade: ${form.cidade}\nBairro: ${form.bairro}\nValor pretendido: R$ ${form.valor}\n\nDescrição:\n${form.descricao}`
    window.location.href = `mailto:locacao@irineulocacao.com.br?subject=Quero anunciar meu imóvel - ${form.tipo} em ${form.cidade}&body=${encodeURIComponent(corpo)}`
    setEnviado(true)
  }

  function handleWhatsApp() {
    if (!form.lgpd) { setErro('Aceite a política de privacidade para continuar.'); return }
    if (!form.nome || !form.tel) { setErro('Preencha nome e telefone para continuar.'); return }
    setErro('')
    const texto = `Olá! Quero anunciar meu imóvel com a Irineu Locação.\n\nNome: ${form.nome}\nTelefone: ${form.tel}\nTipo: ${form.tipo}\nCidade: ${form.cidade}${form.bairro ? `\nBairro: ${form.bairro}` : ''}\nValor pretendido: R$ ${form.valor}\n\n${form.descricao}`
    window.open(`https://api.whatsapp.com/send?phone=554734817707&text=${encodeURIComponent(texto)}`, '_blank')
    setEnviado(true)
  }

  const inputClass = 'w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#1C3E77] bg-white'
  const labelClass = 'block text-sm font-semibold text-gray-700 mb-1.5'

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <div className="relative bg-[#1C3E77] pt-24 md:pt-28 pb-16 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image src="/images/predioirienu.png" alt="" fill className="object-cover" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center text-white">
          <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-3">Para Proprietários</p>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Anuncie seu imóvel com a Irineu Locação</h1>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            Deixe sua propriedade nas mãos de especialistas. Cuidamos de tudo para você alugar com segurança e tranquilidade.
          </p>
        </div>
      </div>

      {/* Benefícios */}
      <section className="py-16 bg-[#F4F6F9]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[#1E293B] text-center mb-10">Por que anunciar com a Irineu?</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {beneficios.map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="bg-white rounded-2xl p-6 shadow-sm flex items-start gap-4">
                <div className="w-12 h-12 bg-[#1C3E77]/10 rounded-xl flex items-center justify-center shrink-0">
                  <Icon size={24} className="text-[#1C3E77]" />
                </div>
                <div>
                  <h3 className="font-bold text-[#1E293B] mb-1">{titulo}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Formulário */}
      <section className="py-16 bg-white">
        <div className="max-w-2xl mx-auto px-4 sm:px-6">
          <h2 className="text-2xl font-extrabold text-[#1E293B] mb-2">Envie seus dados</h2>
          <p className="text-gray-500 mb-8">Preencha o formulário e nossa equipe entrará em contato.</p>

          {enviado ? (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
              <CheckCircle2 size={48} className="text-green-500 mx-auto mb-3" />
              <h3 className="font-bold text-[#1E293B] text-xl mb-2">Mensagem enviada!</h3>
              <p className="text-gray-600 mb-6">Em breve nossa equipe entrará em contato.</p>
              <Link href="/" className="bg-[#1C3E77] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0D2853] transition-colors">
                Voltar ao início
              </Link>
            </div>
          ) : (
            <form onSubmit={handleEmail} className="space-y-4" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nome" className={labelClass}>Nome completo *</label>
                  <Input id="nome" value={form.nome} onChange={(e) => set('nome', e.target.value)} placeholder="Seu nome" required autoComplete="name" />
                </div>
                <div>
                  <label htmlFor="tel" className={labelClass}>Telefone *</label>
                  <Input id="tel" type="tel" value={form.tel} onChange={(e) => set('tel', e.target.value)} placeholder="(47) 99999-9999" required autoComplete="tel" />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClass}>E-mail *</label>
                <Input id="email" type="email" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="seu@email.com" required autoComplete="email" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="tipo-imovel" className={labelClass}>Tipo do imóvel *</label>
                  <select id="tipo-imovel" value={form.tipo} onChange={(e) => set('tipo', e.target.value)} className={inputClass} required>
                    <option value="">Selecione</option>
                    <option value="Apartamento">Apartamento</option>
                    <option value="Casa">Casa</option>
                    <option value="Terreno">Terreno</option>
                    <option value="Galpão">Galpão</option>
                    <option value="Sala Comercial">Sala Comercial</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="cidade" className={labelClass}>Cidade *</label>
                  <Input id="cidade" value={form.cidade} onChange={(e) => set('cidade', e.target.value)} placeholder="Ex: Joinville" required />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="bairro" className={labelClass}>Bairro</label>
                  <Input id="bairro" value={form.bairro} onChange={(e) => set('bairro', e.target.value)} placeholder="Ex: Centro" />
                </div>
                <div>
                  <label htmlFor="valor" className={labelClass}>Valor pretendido (R$)</label>
                  <Input id="valor" type="number" value={form.valor} onChange={(e) => set('valor', e.target.value)} placeholder="Ex: 1500" min="0" />
                </div>
              </div>

              <div>
                <label htmlFor="descricao" className={labelClass}>Descrição do imóvel</label>
                <Textarea
                  id="descricao"
                  value={form.descricao}
                  onChange={(e) => set('descricao', e.target.value)}
                  placeholder="Descreva seu imóvel: área, quartos, diferenciais..."
                  rows={4}
                  className="resize-none"
                />
              </div>

              <div>
                <label htmlFor="fotos" className={labelClass}>Fotos do imóvel</label>
                <input
                  id="fotos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[#1C3E77] file:text-white hover:file:bg-[#0D2853] file:cursor-pointer"
                />
                <p className="text-xs text-gray-400 mt-1">As fotos serão enviadas por e-mail ou WhatsApp. Máx. 10 imagens.</p>
              </div>

              <div className="space-y-2 pt-1">
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.lgpd}
                    onChange={(e) => set('lgpd', e.target.checked)}
                    className="mt-0.5 accent-[#1C3E77]"
                  />
                  <span className="text-sm text-gray-600">
                    Li e concordo com a{' '}
                    <Link href="/privacidade" target="_blank" className="text-[#1C3E77] underline">Política de Privacidade</Link> *
                  </span>
                </label>
                <label className="flex items-start gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.whatsapp}
                    onChange={(e) => set('whatsapp', e.target.checked)}
                    className="mt-0.5 accent-[#1C3E77]"
                  />
                  <span className="text-sm text-gray-600">Autorizo o contato por WhatsApp</span>
                </label>
              </div>

              {erro && <p role="alert" className="text-[#E32618] text-sm">{erro}</p>}

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 bg-[#1C3E77] hover:bg-[#0D2853] text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  Enviar por e-mail
                </button>
                <button
                  type="button"
                  onClick={handleWhatsApp}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3.5 rounded-xl transition-colors"
                >
                  Enviar por WhatsApp
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  )
}
