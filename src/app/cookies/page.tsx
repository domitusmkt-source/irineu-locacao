import { pageMetadata } from '@/lib/site'
import Link from 'next/link'

export const metadata = pageMetadata({
  title: 'Política de Cookies',
  description: 'Política de Cookies do site Irineu Locação de Imóveis.',
  path: '/cookies',
})

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-white pt-24 md:pt-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
        <h1 className="text-3xl font-extrabold text-[#1E293B] mb-2">Política de Cookies</h1>
        <p className="text-gray-500 mb-8 text-sm">Última atualização: Janeiro de 2025</p>

        <div className="space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">O que são cookies?</h2>
            <p className="text-gray-600 leading-relaxed">
              Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam o site a lembrar suas preferências e a melhorar sua experiência de navegação.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">Tipos de cookies que usamos</h2>
            <div className="space-y-4">
              {[
                { tipo: 'Essenciais', desc: 'Necessários para o funcionamento básico do site. Não podem ser desativados. Incluem cookies de sessão e de segurança.' },
                { tipo: 'Funcionais', desc: 'Permitem que o site lembre suas preferências, como idioma ou localização, para personalizar sua experiência.' },
                { tipo: 'Analíticos', desc: 'Coletam informações sobre como os visitantes usam o site (páginas visitadas, tempo de permanência) para nos ajudar a melhorá-lo. Usados com Google Analytics de forma anonimizada.' },
                { tipo: 'Marketing', desc: 'Usados para exibir anúncios relevantes. Podem ser definidos por nossos parceiros de publicidade.' },
              ].map(({ tipo, desc }) => (
                <div key={tipo} className="bg-[#F4F6F9] rounded-xl p-4">
                  <h3 className="font-bold text-[#1E293B] mb-1">{tipo}</h3>
                  <p className="text-gray-600 text-sm">{desc}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">Como gerenciar cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-3">
              Você pode controlar e/ou excluir cookies nas configurações do seu navegador. A maioria dos navegadores permite bloquear ou deletar cookies. Veja instruções para:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
              <li>Google Chrome: Configurações &gt; Privacidade e Segurança &gt; Cookies</li>
              <li>Mozilla Firefox: Opções &gt; Privacidade e Segurança</li>
              <li>Safari: Preferências &gt; Privacidade</li>
              <li>Microsoft Edge: Configurações &gt; Privacidade, Pesquisa e Serviços</li>
            </ul>
            <p className="text-gray-600 text-sm mt-3">
              Desativar cookies pode afetar o funcionamento de algumas funcionalidades do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">Consentimento</h2>
            <p className="text-gray-600 leading-relaxed">
              Ao acessar nosso site, você é informado sobre o uso de cookies e pode escolher aceitar ou recusar. Cookies essenciais sempre serão utilizados, pois são necessários para o funcionamento do site.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1E293B] mb-3">Mais informações</h2>
            <p className="text-gray-600 leading-relaxed">
              Para saber mais sobre como tratamos seus dados pessoais, consulte nossa{' '}
              <Link href="/privacidade" className="text-[#1C3E77] underline">Política de Privacidade</Link>.
              Em caso de dúvidas, entre em contato pelo e-mail{' '}
              <a href="mailto:privacidade@irineulocacao.com.br" className="text-[#1C3E77] underline">
                privacidade@irineulocacao.com.br
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
