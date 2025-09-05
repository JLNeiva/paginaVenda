import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
// Removed unused import: AuthButton

interface FormData {
  nome: string;
  email: string;
  empresa: string;
  telefone: string;
  respostas: { [key: number]: string };
}

const QUESTOES = [
  {
    id: 1,
    titulo: "Canais de Escuta Ativa",
    opcoes: {
      A: "Não existem canais formais de escuta.",
      B: "Existem canais, mas são pouco divulgados.",
      C: "Canais existem e são utilizados por parte da equipe.",
      D: "Canais são amplamente divulgados, utilizados e avaliados."
    }
  },
  {
    id: 2,
    titulo: "Treinamento sobre saúde mental para a Liderança",
    opcoes: {
      A: "Líderes nunca receberam treinamento em saúde mental.",
      B: "Houve treinamento pontual, sem continuidade.",
      C: "Treinamentos esporádicos com sensibilizações gerais.",
      D: "Treinamentos regulares, práticos e acompanhados de mentoria/coaching."
    }
  },
  {
    id: 3,
    titulo: "Monitoramento de Indicadores de Saúde Mental",
    opcoes: {
      A: "Não se monitoram indicadores de saúde mental.",
      B: "Monitoramento informal (avisos de RH).",
      C: "Monitoramento sem correlação com ações.",
      D: "Monitoramento com dashboard, metas e revisão periódica."
    }
  },
  {
    id: 4,
    titulo: "Metas da empresa",
    opcoes: {
      A: "Não existem metas claras, gerando ansiedade nos colaboradores.",
      B: "Existem metas calculadas sem critério, podendo ser excessivas e gerar pressão.",
      C: "Existem metas calculadas com base histórica, mas sem acompanhamento periódico.",
      D: "Metas claras, com acompanhamento e feedbacks periódicos para ajustes rápidos."
    }
  },
  {
    id: 5,
    titulo: "Suporte Psicológico aos colaboradores",
    opcoes: {
      A: "Não há nenhum tipo de suporte psicológico.",
      B: "Suporte oferecido somente sob demanda individual.",
      C: "Suporte esporádico em momentos de crise.",
      D: "Suporte contínuo, proativo e amplamente divulgado."
    }
  },
  {
    id: 6,
    titulo: "Política Formal de Saúde Mental",
    opcoes: {
      A: "Não existe política escrita.",
      B: "Política em processo de elaboração.",
      C: "Existe política, mas é pouco aplicada.",
      D: "Política implementada, revisada e cobrada periodicamente."
    }
  },
  {
    id: 7,
    titulo: "Integração ao PGR – Programa de Gerenciamento de Riscos",
    opcoes: {
      A: "Saúde mental não está no PGR.",
      B: "Mencionada superficialmente.",
      C: "Inserida com ações, mas sem indicadores.",
      D: "Totalmente integrada, com metas e indicadores mensuráveis."
    }
  },
  {
    id: 8,
    titulo: "Clima Organizacional",
    opcoes: {
      A: "Não há pesquisa de clima.",
      B: "Pesquisa feita de maneira isolada, sendo considerada rara e genérica.",
      C: "Pesquisa realizada, com algumas ações tomadas sobre os resultados.",
      D: "Pesquisa periodicamente realizada, com plano de ação baseado nos dados."
    }
  },
  {
    id: 9,
    titulo: "Equilíbrio Trabalho-Vida",
    opcoes: {
      A: "Não há iniciativas para equilíbrio.",
      B: "Há algumas ações pontuais (ex.: home office eventual, day off no aniversário).",
      C: "Políticas formais de flexibilidade, mas sem monitoramento e dados de uso.",
      D: "Flexibilidade e programas de bem-estar totalmente integrados."
    }
  },
  {
    id: 10,
    titulo: "Reconhecimento e Valorização dos colaboradores",
    opcoes: {
      A: "Não há reconhecimentos mensuráveis.",
      B: "Eventos esporádicos de premiação.",
      C: "Reconhecimento só em avaliações anuais, mas sem critérios transparentes.",
      D: "Reconhecimento contínuo, com critérios claros e participação de toda a equipe."
    }
  },
  {
    id: 11,
    titulo: "Comunicação Transparente",
    opcoes: {
      A: "Informes internos formais, raros e com pouca transparência.",
      B: "Comunicados e reuniões informais, sem periodicidade.",
      C: "Reuniões e comunicações regulares, mas sem espaço para feedback.",
      D: "Comunicação bidirecional constante, com espaços seguros para feedback."
    }
  },
  {
    id: 12,
    titulo: "Suporte a Gestores",
    opcoes: {
      A: "Gestores não recebem suporte e treinamento sobre gestão de pessoas.",
      B: "Gestores têm acesso a materiais esporádicos.",
      C: "Mentoria e orientação ocasional para liderar situações de crise.",
      D: "Programa contínuo de mentoria, treinamento e supervisão para gestores."
    }
  }
];

const calcularPontuacao = (respostas: { [key: number]: string }) => {
  const pontuacoes = { A: 1, B: 2, C: 3, D: 4 };
  return Object.values(respostas).reduce((total, resposta) => 
    total + pontuacoes[resposta as keyof typeof pontuacoes], 0);
};

const determinarNivel = (pontos: number) => {
  if (pontos <= 24) return {
    nivel: "Nível 1 – Alerta Crítico",
    descricao: "Praticamente nenhuma ação estruturada. Urgente implementar medidas emergenciais."
  };
  if (pontos <= 35) return {
    nivel: "Nível 2 – Iniciativas Pontuais",
    descricao: "Algumas ações existem, porém desconectadas e sem continuidade. Necessário plano integrado."
  };
  if (pontos <= 45) return {
    nivel: "Nível 3 – Estrutura em Construção",
    descricao: "Política e processos definidos, mas sem métricas sólidas e cultura fixa. Avançar gestão."
  };
  return {
    nivel: "Nível 4 – Alta Maturidade",
    descricao: "Saúde mental integrada na estratégia, com processos, métricas e cultura consolidados."
  };
};

export function DiagnosticoNR1() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    empresa: '',
    telefone: '',
    respostas: {}
  });
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState<{
    pontos: number;
    nivel: string;
    descricao: string;
  } | null>(null);

  const enviarWebhook = async (dados: FormData, resultado: any) => {
    const webhookUrl = 'https://n8n.dashvision.com.br/webhook/26e0a4f6-0f5f-487d-a03f-9969a98f8b5f';
    
    // URL absoluta do PDF usando o domínio atual
    const pdfUrl = `${window.location.protocol}//${window.location.host}/assets/DiagnosticoNR1-PassoAPasso.pdf`;
    
    const emailContent = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2 style="color: #2563eb;">Novo Diagnóstico NR1 recebido</h2>
  
  <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
    <h3 style="color: #1e40af;">Dados do Participante:</h3>
    <p><strong>Nome:</strong> ${dados.nome}</p>
    <p><strong>Email:</strong> ${dados.email}</p>
    <p><strong>Empresa:</strong> ${dados.empresa}</p>
    <p><strong>Telefone:</strong> ${dados.telefone}</p>
  </div>

  <div style="margin: 20px 0;">
    <h3 style="color: #1e40af;">Respostas do Questionário:</h3>
    ${QUESTOES.map(questao => `
      <div style="margin: 10px 0; padding: 10px; background-color: #f8fafc; border-radius: 4px;">
        <p><strong>${questao.titulo}</strong></p>
        <p style="margin-left: 15px;">
          Resposta: ${dados.respostas[questao.id]} - ${questao.opcoes[dados.respostas[questao.id] as keyof typeof questao.opcoes]}
        </p>
      </div>
    `).join('')}
  </div>

  <div style="margin: 20px 0; padding: 15px; background-color: #f0f9ff; border-radius: 8px;">
    <h3 style="color: #1e40af;">Resultado da Avaliação:</h3>
    <p><strong>Nível:</strong> ${resultado.nivel}</p>
    <p><strong>Pontuação:</strong> ${resultado.pontos} pontos</p>
    <p style="margin-top: 10px;">${resultado.descricao}</p>
  </div>

  <div style="margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px; text-align: center;">
    <p style="margin-bottom: 15px; color: #1e40af;">
      Para ajudar na implementação das melhorias, acesse nosso guia completo:
    </p>
    <a href="${pdfUrl}" 
       target="_blank" 
       style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 25px; 
              text-decoration: none; border-radius: 6px; font-weight: bold;">
      Abrir passo a passo de implementação da NR-1
    </a>
  </div>

  <p style="color: #64748b; margin-top: 20px;">
    Data/Hora: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
  </p>
</div>`;

    // Criar string com respostas ordenadas
    const respostasOrdenadas = QUESTOES
      .map(questao => `${questao.id}-${dados.respostas[questao.id]}`)
      .join(' ');

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: dados.nome,
          telefone: dados.telefone,
          email: dados.email,
          respostas: respostasOrdenadas,
          resultado_pontos: resultado.pontos,
          resultado_nivel: resultado.nivel,
          resultado_mensagem: resultado.descricao,
          pdfUrl: pdfUrl,
          emailContent: emailContent
        })
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      console.error('Erro ao enviar webhook:', error);
      alert('Houve um erro ao enviar os dados. Por favor, tente novamente.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar campos do formulário
    if (!formData.nome.trim() || !formData.email.trim() || 
        !formData.empresa.trim() || !formData.telefone.trim()) {
      alert('Por favor, preencha todos os campos do formulário.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Verificar formato do email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, insira um e-mail válido.');
      document.getElementById('email')?.focus();
      return;
    }

    // Verificar respostas em branco
    const questoesSemResposta = QUESTOES.filter(questao => !formData.respostas[questao.id]);
    
    if (questoesSemResposta.length > 0) {
      const primeiraQuestaoSemResposta = questoesSemResposta[0];
      const element = document.querySelector(`[name="questao-${primeiraQuestaoSemResposta.id}"]`);
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      alert(`Por favor, responda a questão "${primeiraQuestaoSemResposta.titulo}"`);
      return;
    }

    const pontos = calcularPontuacao(formData.respostas);
    const resultadoFinal = determinarNivel(pontos);
    const resultado = { ...resultadoFinal, pontos };
    
    setResultado(resultado);
    setShowModal(true);
    await enviarWebhook(formData, resultado);
  };

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length === 11) {
      return numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
    return numeros.replace(/^(\d{2})(\d{4})(\d{4})$/, '($1) $2-$3');
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatarTelefone(e.target.value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      empresa: '',
      telefone: '',
      respostas: {}
    });
    setResultado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGerarPDF = () => {
    const pdfUrl = `/assets/DiagnosticoNR1-PassoAPasso.pdf`;
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Seção Superior com background comum */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado Esquerdo - Imagem */}
            <div className="lg:w-[350px] flex-shrink-0 self-center">
              <img
                src="/assets/imagemNR-01.png"
                alt="Diagnóstico NR1"
                className="w-full rounded-lg shadow-md object-contain"
                style={{ height: '400px' }}
              />
            </div>

            {/* Lado Direito - Formulário de Dados */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-8">
                DIAGNÓSTICO – NR 1
              </h1>

              <div className="space-y-6">
                <div>
                  <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    id="nome"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    E-mail *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="empresa" className="block text-sm font-medium text-gray-700 mb-1">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    id="empresa"
                    required
                    value={formData.empresa}
                    onChange={(e) => setFormData(prev => ({ ...prev, empresa: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefone *
                  </label>
                  <input
                    type="tel"
                    id="telefone"
                    required
                    maxLength={15}
                    value={formData.telefone}
                    onChange={handleTelefoneChange}
                    placeholder="(00) 00000-0000"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção de Questionário */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6"> {/* Reduzido de p-8 para p-6 */}
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center"> {/* Reduzido mb-8 para mb-4 */}
              Escolha a opção que melhor representa o momento atual em sua empresa
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4"> {/* Reduzido space-y-6 para space-y-4 */}
              <div className="space-y-4"> {/* Reduzido space-y-6 para space-y-4 */}
                {QUESTOES.map((questao) => (
                  <div key={questao.id} className="bg-gray-50 p-3 rounded-lg"> {/* Reduzido p-4 para p-3 */}
                    <p className="font-semibold text-gray-800 mb-2">{questao.titulo}</p> {/* Reduzido mb-4 para mb-2 */}
                    <div className="space-y-2"> {/* Reduzido space-y-3 para space-y-2 */}
                      {Object.entries(questao.opcoes).map(([letra, texto]) => (
                        <label key={letra} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="radio"
                            name={`questao-${questao.id}`}
                            value={letra}
                            checked={formData.respostas[questao.id] === letra}
                            onChange={(e) => setFormData(prev => ({
                              ...prev,
                              respostas: {
                                ...prev.respostas,
                                [questao.id]: e.target.value
                              }
                            }))}
                            className="mt-1 h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <span className="text-gray-700">
                            <strong>{letra}:</strong> {texto}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver resultado e o passo a passo de implementação da NR-1
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Resultado Atualizado */}
      {showModal && resultado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-xl w-full relative">
            <button 
              onClick={() => setShowModal(false)} 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">Resultado da Avaliação</h2>
            <div className="space-y-4 mb-8">
              <p className="text-xl font-semibold text-blue-600">{resultado.nivel}</p>
              <p className="text-gray-600">{resultado.descricao}</p>
              <p className="text-lg">Pontuação Total: <span className="font-bold">{resultado.pontos}</span></p>
              <p className="text-sm text-gray-500 italic">✉️ Enviamos um e-mail com o diagnóstico completo e recomendações</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleGerarPDF}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <ExternalLink className="h-5 w-5" />
                Abrir PDF
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Finalizar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
