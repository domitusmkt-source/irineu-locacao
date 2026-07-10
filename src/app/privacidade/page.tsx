import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Política de Privacidade',
  description: 'Política de Privacidade da Irineu Locação de Imóveis em conformidade com a LGPD.',
}

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-[#1E293B] mb-2">Política de Privacidade</h1>
        <p className="text-gray-500 mb-8 text-sm">Última atualização: Janeiro de 2025</p>

        <div className="prose prose-gray max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">1. Quem somos</h2>
            <p className="text-gray-600 leading-relaxed">
              A <strong>Irineu Locação de Imóveis</strong> (CRECI 2959J), com sede na Rua Nove de Março, 277 - Centro, Joinville - SC, é a controladora dos dados pessoais coletados por meio deste site. Estamos comprometidos com a proteção dos seus dados em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD — Lei nº 13.709/2018).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">2. Dados que coletamos</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Podemos coletar as seguintes categorias de dados pessoais:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>Nome completo e dados de identificação</li>
              <li>Telefone e e-mail</li>
              <li>Informações sobre imóveis de interesse ou propriedade</li>
              <li>Dados de navegação (cookies, IP, dispositivo)</li>
              <li>Mensagens enviadas via formulários ou WhatsApp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">3. Finalidade do tratamento</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Seus dados são utilizados para:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>Atender solicitações de locação e informações sobre imóveis</li>
              <li>Enviar propostas e informações comerciais relevantes</li>
              <li>Formalizar contratos de locação</li>
              <li>Cumprir obrigações legais e regulatórias</li>
              <li>Melhorar a experiência de navegação no site</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">4. Base legal</h2>
            <p className="text-gray-600 leading-relaxed">
              O tratamento dos seus dados baseia-se no consentimento (art. 7º, I, LGPD), no legítimo interesse (art. 7º, IX), na execução de contrato (art. 7º, V) e no cumprimento de obrigação legal (art. 7º, II), conforme a finalidade de cada tratamento.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">5. Compartilhamento</h2>
            <p className="text-gray-600 leading-relaxed">
              Seus dados não são vendidos a terceiros. Podemos compartilhá-los com parceiros necessários para a prestação dos serviços (como plataformas de e-mail e WhatsApp Business), sempre com garantias de confidencialidade. Em caso de obrigação legal, podemos compartilhar com autoridades competentes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">6. Armazenamento e segurança</h2>
            <p className="text-gray-600 leading-relaxed">
              Os dados são armazenados em servidores seguros e mantidos pelo tempo necessário à prestação dos serviços ou conforme exigência legal. Adotamos medidas técnicas e organizacionais para proteger seus dados contra acesso não autorizado, perda ou destruição.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">7. Seus direitos</h2>
            <p className="text-gray-600 leading-relaxed mb-3">Nos termos da LGPD, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600">
              <li>Confirmar a existência de tratamento dos seus dados</li>
              <li>Acessar seus dados</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados desnecessários</li>
              <li>Revogar o consentimento a qualquer momento</li>
              <li>Portabilidade dos dados</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">8. Contato — Encarregado de Dados (DPO)</h2>
            <p className="text-gray-600 leading-relaxed">
              Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento dos seus dados, entre em contato:
            </p>
            <div className="mt-3 bg-[#F4F6F9] rounded-xl p-4 text-gray-700 text-sm">
              <p><strong>E-mail:</strong> privacidade@irineulocacao.com.br</p>
              <p><strong>Telefone:</strong> (47) 3000-0000</p>
              <p><strong>Endereço:</strong> Rua Nove de Março, 277 - Centro, Joinville - SC, 89201-000</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">9. Alterações nesta política</h2>
            <p className="text-gray-600 leading-relaxed">
              Esta política pode ser atualizada periodicamente. Notificaremos mudanças relevantes no site ou por e-mail. O uso continuado do site após alterações implica aceitação da versão vigente.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
