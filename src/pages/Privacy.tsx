import { Shield, FormInput } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthButton } from '../components/AuthButton';

export function Privacy() {
  const navigate = useNavigate();
  // const currentDate = new Date("2018-05-05").toLocaleDateString('pt-BR');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSectionNavigation = (sectionId: string) => {
    navigate('/');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/assets/dashvision-logo.svg"
              alt="DashVision Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">DashVision</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">Sobre nós</Link>
            <a onClick={() => handleSectionNavigation('beneficios')} className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Benefícios</a>
            <a onClick={() => handleSectionNavigation('casos')} className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Casos de Uso</a>
            <a onClick={() => handleSectionNavigation('contato')} className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Contato</a>
          </nav>
          <AuthButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Política de Privacidade | DashVision</h1>
          <p className="text-xl mb-4">Protegendo seus dados com transparência e segurança.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              A DashVision valoriza a sua privacidade. Este documento explica como coletamos,
              usamos e protegemos suas informações ao utilizar nosso site.
            </p>

            {/* Políticas em Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { title: "1. Coleta de Informações", content: "Coletamos informações fornecidas voluntariamente por você, como nome, e-mail e telefone, por meio de nossos formulários de contato." },
                { title: "2. Uso das Informações", content: "As informações coletadas são utilizadas exclusivamente para responder solicitações, oferecer serviços e melhorar a experiência no site." },
                { title: "3. Compartilhamento de Dados", content: "Não compartilhamos suas informações com terceiros, exceto quando necessário para cumprimento legal ou mediante sua autorização." },
                { title: "4. Cookies", content: "Este site pode utilizar cookies para melhorar a navegação. Você pode desativá-los nas configurações do seu navegador." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>

            {/* Seção de Segurança */}
            <section className="bg-blue-600 text-white py-16 px-8 rounded-lg mb-16">
              <div className="flex items-center mb-6">
                <Shield className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">5. Segurança</h2>
              </div>
              <p className="text-lg">
                Adotamos medidas de segurança para proteger suas informações contra
                acessos não autorizados.
              </p>
            </section>

            {/* Seções Restantes */}
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold mb-4">6. Direitos do Usuário (LGPD)</h2>
                <p className="text-gray-700">
                  Você pode solicitar a atualização, correção ou exclusão dos seus dados
                  a qualquer momento, conforme a Lei Geral de Proteção de Dados (LGPD).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">7. Alterações nesta Política</h2>
                <p className="text-gray-700">
                  A DashVision poderá atualizar esta Política de Privacidade periodicamente.
                  Recomendamos que consulte esta página regularmente.
                </p>
              </section>
            </div>

            {/* CTA Section */}
            <section className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-8">Dúvidas sobre nossa política?</h2>
              <p className="text-xl text-gray-700 mb-8">
                Entre em contato conosco para esclarecimentos sobre nossa política de privacidade.
              </p>
              <a
                onClick={() => handleSectionNavigation('contato')}
                className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors cursor-pointer"
              >
                <FormInput className="h-5 w-5 mr-2" />
                Entre em Contato
              </a>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
