'use client'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { CheckCircle2 } from 'lucide-react'

interface FormInteresseProps {
  imovelId: string
  imovelTitulo: string
}

export function FormInteresse({ imovelId, imovelTitulo }: FormInteresseProps) {
  const [nome, setNome] = useState('')
  const [tel, setTel] = useState('')
  const [msg, setMsg] = useState('')
  const [lgpd, setLgpd] = useState(false)
  const [enviado, setEnviado] = useState(false)
  const [erro, setErro] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!lgpd) { setErro('Aceite a política de privacidade para continuar.'); return }
    if (!nome || !tel) { setErro('Preencha nome e telefone.'); return }
    setErro('')
    // Monta mensagem WhatsApp
    const texto = `Olá! Me chamo ${nome}.\nTenho interesse no imóvel: *${imovelTitulo}* (Cód: ${imovelId}).\nTelefone: ${tel}.\n${msg ? `Mensagem: ${msg}` : ''}`
    window.open(`https://api.whatsapp.com/send?phone=554734817707&text=${encodeURIComponent(texto)}`, '_blank')
    setEnviado(true)
  }

  if (enviado) {
    return (
      <div className="text-center py-4">
        <CheckCircle2 size={36} className="text-green-500 mx-auto mb-2" />
        <p className="font-semibold text-[#1E293B]">Mensagem enviada!</p>
        <p className="text-gray-500 text-sm">Em breve entraremos em contato.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3" noValidate>
      <p className="text-sm font-semibold text-gray-600 mb-1">Ou deixe seus dados:</p>
      <div>
        <label htmlFor="nome-interesse" className="sr-only">Nome completo</label>
        <Input
          id="nome-interesse"
          placeholder="Seu nome completo *"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="tel-interesse" className="sr-only">Telefone</label>
        <Input
          id="tel-interesse"
          type="tel"
          placeholder="Telefone / WhatsApp *"
          value={tel}
          onChange={(e) => setTel(e.target.value)}
          required
          autoComplete="tel"
        />
      </div>
      <div>
        <label htmlFor="msg-interesse" className="sr-only">Mensagem</label>
        <Textarea
          id="msg-interesse"
          placeholder="Mensagem (opcional)"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          rows={2}
          className="resize-none"
        />
      </div>
      <label className="flex items-start gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={lgpd}
          onChange={(e) => setLgpd(e.target.checked)}
          className="mt-0.5 accent-[#1B4398]"
          aria-label="Aceitar política de privacidade"
        />
        <span className="text-xs text-gray-500">
          Li e concordo com a{' '}
          <a href="/privacidade" target="_blank" className="text-[#1B4398] underline">Política de Privacidade</a>
        </span>
      </label>
      {erro && <p role="alert" className="text-[#CC2929] text-xs">{erro}</p>}
      <button
        type="submit"
        className="w-full bg-[#1B4398] hover:bg-[#0D2B6B] text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        Enviar interesse
      </button>
    </form>
  )
}
