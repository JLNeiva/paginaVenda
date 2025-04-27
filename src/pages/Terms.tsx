import { ArrowLeft, FileText, FormInput } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export function Terms() {
  const navigate = useNavigate();
//  const currentDate = new Date("2018-05-05").toLocaleDateString('pt-BR');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const contactElement = document.getElementById('contato');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <img 
              src="/assets/dashvision-logo.svg" 
              alt="DashVision Logo" 
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">DashVision</span>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-gray-200 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Termos de Uso | DashVision</h1>
          <p className="text-xl mb-4">Estabelecendo uma relação transparente com nossos usuários.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 leading-relaxed mb-12">
              Bem-vindo ao site da DashVision. Ao acessar e utilizar este site, você concorda com os 
              seguintes Termos de Uso. Caso não concorde com qualquer parte destes termos, por favor, 
              não utilize nosso site.
            </p>

            {/* Terms Cards */}
            <div className="grid md:grid-cols-2 gap-8 mb-16">
              {[
                { title: "1. Uso do Site", content: "O conteúdo deste site é destinado à divulgação de informações sobre nossos serviços de dashboards, automação e soluções em dados." },
                { title: "2. Propriedade Intelectual", content: "Todo o conteúdo é de propriedade da DashVision, salvo indicação em contrário. É proibida a reprodução sem autorização." },
                { title: "3. Limitação de Responsabilidade", content: "A DashVision não se responsabiliza por eventuais danos decorrentes do uso das informações do site." },
                { title: "4. Links Externos", content: "Não nos responsabilizamos pelo conteúdo ou práticas de sites de terceiros." }
              ].map((item, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-bold mb-4">{item.title}</h2>
                  <p className="text-gray-600">{item.content}</p>
                </div>
              ))}
            </div>

            {/* Alterações Section */}
            <section className="bg-blue-600 text-white py-16 px-8 rounded-lg mb-16">
              <div className="flex items-center mb-6">
                <FileText className="h-8 w-8 mr-3" />
                <h2 className="text-2xl font-bold">5. Alterações nos Termos</h2>
              </div>
              <p className="text-lg">
                A DashVision reserva-se o direito de modificar estes Termos de Uso a qualquer momento. 
                Recomendamos a revisão periódica desta página.
              </p>
            </section>

            {/* CTA Section */}
            <section className="text-center mt-16">
              <h2 className="text-3xl font-bold mb-8">Dúvidas sobre nossos termos?</h2>
              <p className="text-xl text-gray-700 mb-8">
                Entre em contato para esclarecimentos sobre nossos termos de uso.
              </p>
              <a 
                onClick={handleContactClick}
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
