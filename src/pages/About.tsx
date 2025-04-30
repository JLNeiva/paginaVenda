import { ArrowLeft, LineChart, Bot, Shield, Globe, Target, FormInput} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { AuthButton } from '../components/AuthButton';

export function About() {
  const navigate = useNavigate();

  const handleContactClick = () => {
    navigate('/');
    setTimeout(() => {
      const contactElement = document.getElementById('contato');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white">
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
            <a href="../" className="text-gray-600 hover:text-blue-600 font-medium">Home</a>
          </nav>
          <AuthButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
         {/*  <button
            onClick={() => navigate("/")}
            className="flex items-center text-white hover:text-gray-200 mb-8"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Voltar
          </button> */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Sobre Nós | DashVision</h1>
          <p className="text-xl mb-4">Na DashVision, transformamos dados em decisões estratégicas.</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <section className="max-w-4xl mx-auto mb-16">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Somos a unidade de tecnologia e inovação do Instituto Metamorfose, atuando como o braço
              responsável por levar inteligência de dados, automação e soluções digitais para empresas
              que buscam evolução contínua.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Desde nossa criação, unimos o conhecimento sólido do Instituto Metamorfose — reconhecido
              por sua atuação em desenvolvimento humano e organizacional — com a expertise tecnológica
              necessária para enfrentar os desafios do mundo digital.
            </p>
          </section>

          {/* Quem Somos Section */}
          <section id="quemSomos" className="bg-gray-50 py-16 mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">🚀 Quem Somos</h2>
              <p className="text-lg text-gray-700 mb-12 text-center">
                A DashVision nasceu da necessidade de transformar informação em valor. Mais do que criar
                dashboards ou automatizar processos, nosso propósito é potencializar a tomada de decisões
                através de dados claros, acessíveis e em tempo real.
              </p>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <LineChart className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Business Intelligence</h3>
                  <p className="text-gray-600">Dashboards personalizados e inteligentes.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Bot className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Automação de Processos</h3>
                  <p className="text-gray-600">Redução de tarefas manuais com soluções integradas.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                  <Shield className="h-12 w-12 text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold mb-3">Infraestrutura Segura</h3>
                  <p className="text-gray-600">Implementações robustas com foco em performance e proteção de dados.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Instituto Section */}
          <section className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-8">🌐 A Força do Grupo Instituto Metamorfose</h2>
            <p className="text-lg text-gray-700 mb-6">
              Ser parte do Instituto Metamorfose nos dá uma visão ampliada:
              Não entregamos apenas tecnologia, entregamos transformação.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              O Instituto é referência em promover mudanças significativas em pessoas e organizações,
              e a DashVision reflete esse DNA ao aplicar inovação para gerar eficiência, controle e
              crescimento sustentável nos negócios de nossos clientes.
            </p>
            <div className="mt-8">
              <a
                href="https://institutometamorfose.com.br"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <Globe className="h-5 w-5 mr-2" />
                Saiba mais sobre o nosso grupo
              </a>
            </div>
          </section>

          {/* Missão Section */}
          <section className="bg-blue-600 text-white py-16 mb-16">
            <div className="max-w-4xl mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 flex items-center">
                <Target className="h-8 w-8 mr-3" />
                Nossa Missão
              </h2>
              <p className="text-xl leading-relaxed">
                Facilitar a jornada digital das empresas, oferecendo soluções que traduzem dados em
                ações estratégicas, sempre com a segurança e a confiabilidade que o mercado exige.
              </p>
            </div>
          </section>

          {/* CTA Section */}
          <section className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">🤝 Vamos Transformar seu Negócio?</h2>
            <p className="text-xl text-gray-700 mb-8">
              Entre em contato e descubra como a DashVision pode ajudar sua empresa a enxergar além dos números.
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
      </main>
    </div>
  );
}
