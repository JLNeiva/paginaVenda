import { useEffect, useState } from 'react';
import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  TrendingUp, // Adicione esta linha
  Clock,
  Target,
  PieChart,
  Zap,
  LineChart,
  CheckCircle
} from 'lucide-react';
import { AuthButton } from './components/AuthButton';
import { supabase } from './lib/supabase';
import { Link } from 'react-router-dom';

function App() {
  const [webhookUrl, setWebhookUrl] = useState('');

  useEffect(() => {
    const fetchWebhookUrl = async () => {
      const { data, error } = await supabase
        .from('parametro')
        .select('valor')
        .eq('chave', 'WebHoockFormulario')
        .single();

      if (error) {
        console.error('Erro ao buscar o parâmetro WebHoockFormulario:', error);
      } else {
        setWebhookUrl(data.valor);
      }
    };

    fetchWebhookUrl();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" onClick={scrollToTop} className="flex items-center">
            <img
              src="/assets/dashvision-logo.svg"
              alt="DashVision Logo"
              className="h-8 w-auto"
            />
            <span className="ml-2 text-xl font-bold text-gray-800">DashVision</span>
          </Link>
          <nav className="hidden md:flex space-x-8">
            <Link to="/about" className="text-gray-600 hover:text-blue-600 font-medium">Sobre nós</Link>
            <a onClick={() => scrollToSection('beneficios')} className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Benefícios</a>
            <a onClick={() => scrollToSection('casos')} className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Casos de Uso</a>
            <a onClick={() => scrollToSection('contato')} className="text-gray-600 hover:text-blue-600 font-medium cursor-pointer">Contato</a>
          </nav>
          <AuthButton />
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 mr-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Transforme dados em decisões estratégicas
            </h1>
            <p className="text-xl mb-8">
            Nossa plataforma de dashboards de indicadores de desempenho oferece inteligência de dados para impulsionar o crescimento do seu negócio.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a
                href="#nossaPlataforma"
                className="bg-transparent border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white hover:text-blue-600 transition-colors inline-block text-center"
              >
                Saiba Mais
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
              alt="Executivos analisando dashboard"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </section>

      {/* Estatísticas */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">250%</p>
              <p className="text-gray-600">ROI no primeiro ano</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">+30 h</p>
              <p className="text-gray-600">mensais economia por equipe</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">35%</p>
              <p className="text-gray-600">aumento na produtividade</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <p className="text-4xl font-bold text-blue-600 mb-2">-40%</p>
              <p className="text-gray-600">redução no tempo de análise</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefícios */}
      <section id="beneficios" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Benefícios Principais</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nossa plataforma foi desenvolvida para transformar a maneira como sua empresa utiliza dados para tomar decisões.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <TrendingUp className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Decisões Baseadas em Dados</h3>
              <p className="text-gray-600">
                Transforme dados brutos em insights acionáveis para tomar decisões estratégicas com confiança e precisão.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Clock className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Economia de Tempo</h3>
              <p className="text-gray-600">
                Automatize a coleta e análise de dados, reduzindo em até 40% o tempo gasto em relatórios manuais.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Target className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Visualização Clara de KPIs</h3>
              <p className="text-gray-600">
                Monitore seus indicadores-chave em tempo real com dashboards personalizados e intuitivos.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <PieChart className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Relatórios Automatizados</h3>
              <p className="text-gray-600">
                Gere e compartilhe relatórios profissionais automaticamente, programados conforme sua necessidade.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <Zap className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Insights em Tempo Real</h3>
              <p className="text-gray-600">
                Acesse dados atualizados instantaneamente, permitindo reações rápidas às mudanças do mercado.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <LineChart className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Previsões Avançadas</h3>
              <p className="text-gray-600">
                Utilize algoritmos de machine learning para prever tendências e antecipar oportunidades de negócio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Casos de Uso */}
      <section id="casos" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Casos de Uso</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Conheça como diferentes setores utilizam nossa plataforma para impulsionar seus resultados.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Equipe de vendas"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-3">Equipes de Vendas</h3>
                <p className="text-gray-600 mb-4">
                  Monitore o desempenho da equipe, acompanhe o funil de vendas e identifique oportunidades de crescimento com dashboards específicos para o setor comercial.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aumento médio de 27% na conversão de leads</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Redução de 35% no ciclo de vendas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Executivo de marketing"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-3">Marketing Digital</h3>
                <p className="text-gray-600 mb-4">
                  Analise o desempenho de campanhas, acompanhe métricas de engajamento e otimize o ROI de investimentos em marketing com painéis personalizados.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Otimização de 42% no orçamento de mídia</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aumento de 53% na taxa de conversão</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Executivo financeiro"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-3">Gestão Financeira</h3>
                <p className="text-gray-600 mb-4">
                  Visualize fluxo de caixa, monitore despesas e receitas, e crie projeções financeiras precisas com dashboards financeiros completos.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Redução de 18% em custos operacionais</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Previsões financeiras 31% mais precisas</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              <div className="md:w-1/3">
                <img
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                  alt="Equipe de produção"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
              <div className="md:w-2/3">
                <h3 className="text-xl font-bold mb-3">Operações e Logística</h3>
                <p className="text-gray-600 mb-4">
                  Otimize processos, monitore a cadeia de suprimentos e identifique gargalos operacionais com painéis de controle em tempo real.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Aumento de 24% na eficiência operacional</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                    <span>Redução de 29% no tempo de entrega</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot do Produto */}
      <section id="nossaPlataforma" className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossa Plataforma</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Interface intuitiva e personalizável para atender às necessidades específicas do seu negócio.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80"
              alt="Dashboard em uso"
              className="w-full"
            />
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-3">Dashboards Personalizáveis</h3>
              <p className="text-gray-600">
                Crie painéis sob medida para cada departamento e necessidade específica do seu negócio.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-3">Integração Completa</h3>
              <p className="text-gray-600">
                Conecte-se com mais de 50 fontes de dados diferentes, incluindo ERPs, CRMs e plataformas de marketing.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-3">Acesso Mobile</h3>
              <p className="text-gray-600">
                Acesse seus dados de qualquer lugar através do nosso aplicativo móvel otimizado.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* Formulário de Contato */}
      <section id="contato" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2 bg-blue-600 text-white p-8 md:p-12">
                <h2 className="text-3xl font-bold mb-6">Entre em Contato</h2>
                <p className="mb-8">
                  Estamos prontos para ajudar sua empresa a transformar dados em resultados concretos. Preencha o formulário e nossa equipe entrará em contato em até 24 horas.
                </p>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <Mail className="h-6 w-6 mr-3 flex-shrink-0" />
                    <a href="mailto:ime@institutometamorfose.com.br" className="hover:underline">
                      ime@institutometamorfose.com.br
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Phone className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>(11) 97371-5113</span>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-6 w-6 mr-3 flex-shrink-0" />
                    <span>Avenida Ator José Wilker nº605, Condomínio One World Offices, Bl.1A-Europe, 4º Andar, RJ</span>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 p-8 md:p-12">
                <form
                  className="space-y-6"
                  action="#"
                  method="POST"
                  onSubmit={(e) => {
                    e.preventDefault();

                    const form = e.target as HTMLFormElement;
                    const nome = (form.elements.namedItem('nome') as HTMLInputElement).value;
                    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
                    const telefone = (form.elements.namedItem('telefone') as HTMLInputElement).value;
                    const empresa = (form.elements.namedItem('empresa') as HTMLInputElement).value;
                    const observacoes = (form.elements.namedItem('observacoes') as HTMLTextAreaElement).value;

                    const exibirMensagem = (mensagem: string, cor: string) => {
                      const mensagemDiv = document.createElement("div");
                      mensagemDiv.innerText = mensagem;
                      mensagemDiv.style.position = "fixed";
                      mensagemDiv.style.top = "20px";
                      mensagemDiv.style.left = "50%";
                      mensagemDiv.style.transform = "translateX(-50%)";
                      mensagemDiv.style.background = cor;
                      mensagemDiv.style.color = "#555";
                      mensagemDiv.style.padding = "10px 20px";
                      mensagemDiv.style.borderRadius = "5px";
                      mensagemDiv.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
                      mensagemDiv.style.zIndex = "9999"; // Garante que fica acima de outros elementos
                      mensagemDiv.style.fontSize = "16px"; // Ajusta a fonte para melhor visualização
                      mensagemDiv.style.fontWeight = "bold";
                      mensagemDiv.style.textAlign = "center";
                      mensagemDiv.style.minWidth = "200px"; // Define uma largura mínima
                      mensagemDiv.style.maxWidth = "90%"; // Evita que ultrapasse a tela
                      mensagemDiv.style.padding = "15px"; // Melhora o espaçamento interno

                      document.body.appendChild(mensagemDiv);

                      setTimeout(() => mensagemDiv.remove(), 3000);
                    };

                    fetch(webhookUrl, { // Usa o valor do parâmetro WebHoockFormulario
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({
                        nome: nome,
                        email: email,
                        telefone: telefone,
                        empresa: empresa,
                        observacoes: observacoes,
                      }),
                    }).then(response => {
                      if (response.ok) {
                        exibirMensagem("Formulário enviado com sucesso!", "#ADD8E6");
                        form.reset(); // Limpa os dados do formulário
                      } else {
                        exibirMensagem("Erro ao enviar o formulário", "#FFB6C1");
                      }
                    }).catch(error => {
                      console.error('Erro ao enviar o formulário:', error);
                      exibirMensagem("Erro ao enviar o formulário", "#FFB6C1");
                    });
                  }}
                >
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder:italic"
                      placeholder="Seu nome completo"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder:italic"
                      placeholder="seu.email@empresa.com.br"
                    />
                  </div>

                  <div>
                    <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone *
                    </label>
                    <input
                      type="tel"
                      id="telefone"
                      name="telefone"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder:italic"
                      placeholder="(00) 00000-0000"
                      maxLength={15}
                      onKeyPress={(e) => {
                        const onlyNumbers = /[0-9]/;
                        if (!onlyNumbers.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      onInput={(e) => {
                        let value = (e.target as HTMLInputElement).value;
                        value = value.replace(/\D/g, '');

                        if (value.length <= 11) {
                          value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                          value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                        } else {
                          value = value.slice(0, 11);
                          value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
                          value = value.replace(/(\d)(\d{4})$/, '$1-$2');
                        }

                        (e.target as HTMLInputElement).value = value;
                      }}
                    />
                  </div>

                  <div>
                    <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                      Ramo de Atuação *
                    </label>
                    <input
                      type="text"
                      id="empresa"
                      name="empresa"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder:italic"
                      placeholder="Alimentação, Saúde, Logisitca ..."
                    />
                  </div>

                  <div>
                    <label htmlFor="observacoes" className="block text-sm font-medium text-gray-700 mb-1">
                      Observações
                    </label>
                    <textarea
                      id="observacoes"
                      name="observacoes"
                      rows={4}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 placeholder:italic resize-none"
                      placeholder="O que precisa? Quais dúvidas? ..."
                    />
                  </div>

                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="privacidade"
                      required
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-1 mr-2"
                    />
                    <label htmlFor="privacidade" className="text-sm text-gray-600">
                      Concordo com a <Link to="/privacy" className="text-blue-600 hover:underline">Política de Privacidade</Link> e com o recebimento de comunicações.
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-medium hover:bg-blue-700 transition-colors"
                  >
                    Solicitar Demonstração
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Pronto para transformar seus dados em resultados?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Agende uma demonstração gratuita e descubra como nossa plataforma pode impulsionar o crescimento do seu negócio.
          </p>
          <a
            href="#contato"
            className="inline-block bg-white text-blue-600 px-8 py-3 rounded-md font-medium hover:bg-gray-100 transition-colors text-lg"
          >
            Entre em contato com nossa equipe
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">

            <div>
              <div className="flex items-center mb-4">
                <img
                  src="/assets/dashvision-logo.svg"
                  alt="DashVision Logo"
                  className="h-8 w-auto"
                />
                <span className="ml-2 text-xl font-bold">DashVision</span>
              </div>
              <p className="text-gray-400 mb-4">
                Transformando dados em decisões estratégicas desde 2018.
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <Mail className="h-5 w-5 text-gray-400" />
                <a href="mailto:ime@institutometamorfose.com.br" className="text-gray-400 hover:text-white">
                  ime@institutometamorfose.com.br
                </a>
              </div>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <Linkedin className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <Facebook className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div> </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><Link to="/about" className="text-gray-400 hover:text-white">Sobre nós</Link></li>
                <li><a href="#beneficios" className="text-gray-400 hover:text-white">Benefícios</a></li>
                <li><a href="#casos" className="text-gray-400 hover:text-white">Casos de Uso</a></li>

              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><Link to="/terms" className="text-gray-400 hover:text-white">Termos de uso</Link></li>
                <li><Link to="/privacy" className="text-gray-400 hover:text-white">Política de Privacidade</Link></li>
              </ul>
            </div>

          </div>

          <div className="pt-8 border-t border-gray-700 text-center text-gray-400">
            <p>&copy; 2025 DashVision. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
