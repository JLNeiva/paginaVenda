import { useState } from 'react';
import { X } from 'lucide-react';

interface QuestaoBase {
  id: number;
  titulo: string;
  subtitulo?: string;
  pilar: number;
  pontos: { [key: string]: number };
}

interface QuestaoRadio extends QuestaoBase {
  tipo: 'radio';
  opcoes: { [key: string]: string };
}

interface QuestaoDropdown extends QuestaoBase {
  tipo: 'dropdown';
  opcoes: { [key: string]: string };
}

interface QuestaoDropdownMultiplo extends QuestaoBase {
  tipo: 'dropdown_multiplo';
  itens: string[];
  opcoes: { [key: string]: string };
}

type Questao = QuestaoRadio | QuestaoDropdown | QuestaoDropdownMultiplo;

interface FormData {
  nome: string;
  email: string;
  cargo: string;
  hospital: string;
  cidade: string;
  uf: string;
  telefone: string;
  respostas: { [key: string]: string };
}

// Constantes de configuração
const TIPO_FORMULARIO = "Gestor Hospitalar";
const PRIORIDADE_PILARES = [1, 2, 3]; // Ordem de prioridade em caso de empate
const NOMES_PILARES = ["Serviços Médicos", "Protocolos de Atendimento Médico", "Educação Médica Continuada"];

// Template configurável para email (você pode editar esta área)
const EMAIL_TEMPLATE = `Olá, %nome!
Parabéns por concluir o diagnóstico!

Abaixo, seguem os resultados por pilar e a prioridade de atuação:
<strong>
 • Serviços Médicos: %pontos_pilar1 pontos
 • Protocolos de Atendimento: %pontos_pilar2 pontos
 • Educação Médica Continuada: %pontos_pilar3 pontos
</strong>
Pontuação geral do seu Hospital: <strong>%resultadoPontos (%resultadoNivel)</strong>

<strong>Prioridade 1:</strong> %pilar_menor (%nota_menor pontos)

<strong>Preparamos uma devolutiva objetiva com diretrizes práticas para evoluir esse pilar prioritário — o arquivo segue em anexo para você e sua equipe.</strong>

Hospital: %hospital
Cidade: %cidade - %uf

Conte com a <strong>Rapimed</strong> para <strong>acelerar a eficiência da sua instituição</strong>.
Somos o parceiro certo para transformar recomendações em resultados e levar o hospital a um novo patamar de desempenho.

<strong>Nos chame no contato a seguir para conversarmos e desenharmos os próximos passos:</strong>

 <strong style="color: #166534;"> 📞 51 99524-8614.</strong>

<strong>Também podemos agendar através deste e-mail, basta respondê-lo sinalizando a sua disponibilidade.</strong>

Um abraço,
<strong>Equipe Rapimed</strong>
`;

const QUESTOES: Questao[] = [
  // PILAR 1 - Serviços Médicos
  {
    id: 1,
    titulo: "PILAR 1 - Serviços Médicos",
    subtitulo: "1. Nível de satisfação com o serviço médico de plantão atual:",
    tipo: "radio",
    pilar: 1,
    opcoes: {
      "2": "Satisfeito",
      "1": "Parcialmente satisfeito",
      "0": "Insatisfeito"
    },
    pontos: { "2": 2, "1": 1, "0": 0 }
  },
  {
    id: 2,
    titulo: "2. Principais problemas enfrentados no plantão",

    tipo: "dropdown_multiplo",
    pilar: 1,
    itens: [
      "Furo ou atraso na escala",
      "Dificuldade em encontrar médico disponível",
      "Mão de obra desqualificada",
      "Comunicação ineficiente entre corpo clínico e direção"
    ],
    opcoes: {
      "3": "Não ocorre",
      "2": "Ocorre raramente",
      "1": "Ocorre frequentemente",
      "0": "É crítico e recorrente"
    },
    pontos: { "3": 3, "2": 2, "1": 1, "0": 0 }
  },
  {
    id: 3,
    titulo: "3. Principais dores relatadas pelos pacientes",
    tipo: "dropdown_multiplo",
    pilar: 1,
    itens: [
      "Demora no atendimento",
      "Atendimento pouco humanizado",
      "Falta de explicação clara sobre diagnóstico ou tratamento"
    ],
    opcoes: {
      "3": "Não ocorre",
      "2": "Ocorre raramente",
      "1": "Ocorre frequentemente",
      "0": "É crítico e recorrente"
    },
    pontos: { "3": 3, "2": 2, "1": 1, "0": 0 }
  },
  {
    id: 4,
    titulo: "4. Quais serviços médicos o hospital deseja criar ou reorganizar?",
    tipo: "dropdown_multiplo",
    pilar: 1,
    itens: [
      "UTI",
      "Pediatria",
      "Emergência",
      "Obstetrícia",
      "Psiquiatria",
      "Anestesiologia"
    ],
    opcoes: {
      "0": "Não importante",
      "1": "Pouco importante",
      "2": "Importante",
      "3": "Muito importante"
    },
    pontos: { "0": 0, "1": 1, "2": 2, "3": 3 }
  },

  // PILAR 2 - Protocolos de Atendimento Médico
  {
    id: 5,
    titulo: "PILAR 2 - Protocolos de Atendimento Médico",
    subtitulo: "1. Existem protocolos médicos descritos para os principais fluxos de emergência?",
    tipo: "radio",
    pilar: 2,
    opcoes: {
      "2": "Sim",
      "0": "Não"
    },
    pontos: { "2": 2, "0": 0 }
  },
  {
    id: 6,
    titulo: "2. Os protocolos são atualizados com frequência e base científica?",
    tipo: "radio",
    pilar: 2,
    opcoes: {
      "2": "Sim, atualizados regularmente com base científica",
      "1": "Parcialmente (alguns desatualizados ou pouco embasamento)",
      "0": "Não há atualização ou não têm base científica"
    },
    pontos: { "2": 2, "1": 1, "0": 0 }
  },
  {
    id: 7,
    titulo: "3. Há indicadores que monitoram a adesão dos médicos aos protocolos?",
    tipo: "radio",
    pilar: 2,
    opcoes: {
      "2": "Sim",
      "0": "Não"
    },
    pontos: { "2": 2, "0": 0 }
  },
  {
    id: 8,
    titulo: "4. Você está satisfeito com a quantidade de exames solicitados no plantão de seu hospital atualmente?",
    tipo: "radio",
    pilar: 2,
    opcoes: {
      "0": "Insatisfeito",
      "1": "Pouco satisfeito",
      "2": "Satisfeito",
      "3": "Muito satisfeito"
    },
    pontos: { "0": 0, "1": 1, "2": 2, "3": 3 }
  },

  // PILAR 3 - Educação Médica Continuada
  {
    id: 9,
    titulo: "PILAR 3 - Educação Médica Continuada",
    subtitulo: "1. Existem treinamentos regulares (trimestrais) para a equipe médica?",
    tipo: "radio",
    pilar: 3,
    opcoes: {
      "2": "Sim",
      "0": "Não"
    },
    pontos: { "2": 2, "0": 0 }
  },
  {
    id: 10,
    titulo: "2. A capacitação da equipe está alinhada com os protocolos institucionais?",
    tipo: "radio",
    pilar: 3,
    opcoes: {
      "2": "Sim",
      "0": "Não"
    },
    pontos: { "2": 2, "0": 0 }
  },
  {
    id: 11,
    titulo: "3. Existe programa ou ferramenta de educação médica continuada?",
    tipo: "radio",
    pilar: 3,
    opcoes: {
      "2": "Sim",
      "0": "Não"
    },
    pontos: { "2": 2, "0": 0 }
  },
  {
    id: 12,
    titulo: "4. Médicos do seu hospital apresentam dificuldade com via aérea difícil (intubação, cricotireoidostomia)?",
    tipo: "radio",
    pilar: 3,
    opcoes: {
      "2": "Não, estão plenamente capacitados",
      "1": "Alguns apresentam dificuldade",
      "0": "Sim, a maioria tem dificuldade"
    },
    pontos: { "2": 2, "1": 1, "0": 0 }
  }
];

const calcularPontuacaoPorPilar = (respostas: { [key: string]: string }) => {
  const pontuacaoPilares = { 1: 0, 2: 0, 3: 0 };
  QUESTOES.forEach((questao) => {
    let pontuacaoQuestao = 0;
    if (questao.tipo === 'dropdown_multiplo') {
      pontuacaoQuestao = questao.itens?.reduce((subtotal, _item, index) => {
        const chaveResposta = `${questao.id}_${index}`;
        const resposta = respostas[chaveResposta];
        if (resposta && questao.pontos && questao.pontos[resposta as keyof typeof questao.pontos] !== undefined) {
          return subtotal + (questao.pontos[resposta as keyof typeof questao.pontos] || 0);
        }
        return subtotal;
      }, 0) || 0;
    } else {
      const resposta = respostas[questao.id.toString()];
      if (resposta && questao.pontos && questao.pontos[resposta as keyof typeof questao.pontos] !== undefined) {
        pontuacaoQuestao = questao.pontos[resposta as keyof typeof questao.pontos] || 0;
      }
    }
    pontuacaoPilares[questao.pilar as keyof typeof pontuacaoPilares] += pontuacaoQuestao;
  });
  // Normalizar para escala de 0 a 10
  const maximos: { 1: number; 2: number; 3: number } = { 1: 0, 2: 0, 3: 0 };
  QUESTOES.forEach((questao) => {
    const pilarKey = questao.pilar as keyof typeof maximos;
    if (questao.tipo === 'dropdown_multiplo') {
      maximos[pilarKey] += (questao.itens?.length || 0) * Math.max(...Object.values(questao.pontos));
    } else {
      maximos[pilarKey] += Math.max(...Object.values(questao.pontos));
    }
  });
  const normalizados: { 1: number; 2: number; 3: number } = { 1: 0, 2: 0, 3: 0 };
  Object.keys(pontuacaoPilares).forEach((pilarStr) => {
    const pilar = Number(pilarStr) as keyof typeof pontuacaoPilares;
    normalizados[pilar] = maximos[pilar] > 0 ? Number(((pontuacaoPilares[pilar] / maximos[pilar]) * 10).toFixed(1)) : 0;
  });
  // String de validação para n8n (igual à outra página)
  const stringValidacao = `N1 = (${pontuacaoPilares[1]} / ${maximos[1]}=${normalizados[1]}) N2 = (${pontuacaoPilares[2]} / ${maximos[2]}=${normalizados[2]}) N3 = (${pontuacaoPilares[3]} / ${maximos[3]}=${normalizados[3]}) | NotaFinal = ${((normalizados[1] + normalizados[2] + normalizados[3]) / 3).toFixed(1)}`;
  return { ...normalizados, stringValidacao };
 // return normalizados;
};

const calcularPontuacao = (respostas: { [key: string]: string }) => {
  const pontuacaoPilares = calcularPontuacaoPorPilar(respostas);
  // Pontuação total é a média dos pilares normalizados
  const total = (pontuacaoPilares[1] + pontuacaoPilares[2] + pontuacaoPilares[3]) / 3;
  return Number(total.toFixed(2));
};

const determinarPilarMenorNota = (pontuacaoPilares: { [key: number]: number }) => {
  let menorNota = Math.min(...Object.values(pontuacaoPilares));

  // Em caso de empate, usar a prioridade configurada
  for (const pilar of PRIORIDADE_PILARES) {
    if (pontuacaoPilares[pilar] === menorNota) {
      const pdfNames = {
        1: "Devolutiva_Serviços_Médicos.pdf",
        2: "Devolutiva_Protocolos_Médicos.pdf", 
        3: "Devolutiva_Educação_Continuada.pdf"
      };

      return {
        pilar: pilar,
        nome: NOMES_PILARES[pilar - 1],
        pontos: menorNota,
        pdf: pdfNames[pilar as keyof typeof pdfNames]
      };
    }
  }

  return {
    pilar: 1,
    nome: NOMES_PILARES[0],
    pontos: menorNota,
    pdf: "Devolutiva_Serviços_Médicos.pdf"
  };
};

const determinarNivel = (pontos: number) => {
  if (pontos <= 2.5) return {
    nivel: "Nível 1 - Atenção Urgente",
    descricao: "Necessário implementar urgentemente melhorias estruturais básicas para garantir qualidade e segurança do atendimento."
  };
  if (pontos <= 5) return {
    nivel: "Nível 2 - Desenvolvimento Necessário",
    descricao: "Estrutura inicial presente, mas requer desenvolvimento significativo em múltiplas áreas para melhor desempenho."
  };
  if (pontos <= 7.5) return {
    nivel: "Nível 3 - Bom Desempenho",
    descricao: "Boa base estabelecida com oportunidades claras de otimização e padronização de processos."
  };
  return {
    nivel: "Nível 4 - Excelência",
    descricao: "Excelente estrutura de qualidade com processos maduros e cultura de melhoria contínua consolidada."
  };
};

export default function MelhoriasHospitais() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    cargo: '',
    hospital: '',
    cidade: '',
    uf: '',
    telefone: '',
    respostas: {}
  });
  const [showModal, setShowModal] = useState(false);
  const [resultado, setResultado] = useState<{
    pontos: number;
    nivel: string;
    descricao: string;
  } | null>(null);

  const enviarWebhook = async (dados: FormData, resultado: any, pontuacaoPilares: any, pilarMenor: any) => {
    const webhookUrl = 'https://n8n.dashvision.com.br/webhook/melhorias-hospitais';

    const logoUrl = "https://drive.google.com/uc?export=view&id=1SqLnVdjDD6QPCJ0iFfbB61fF4rLHl9xu";
    //`${window.location.protocol}//${window.location.host}/assets/logo.jpeg`;
    // Substituir variáveis no template
    const emailPersonalizado = EMAIL_TEMPLATE
      .replace(/%logoUrl/g, logoUrl)
      .replace(/%nome/g, dados.nome)
      .replace(/%cargo/g, dados.cargo)
      .replace(/%hospital/g, dados.hospital)
      .replace(/%cidade/g, dados.cidade)
      .replace(/%uf/g, dados.uf)
      .replace(/%telefone/g, dados.telefone)
      .replace(/%tipo_formulario/g, TIPO_FORMULARIO)
      .replace(/%pontos_pilar1/g, pontuacaoPilares[1].toString())
      .replace(/%pontos_pilar2/g, pontuacaoPilares[2].toString())
      .replace(/%pontos_pilar3/g, pontuacaoPilares[3].toString())
      .replace(/%pilar_menor/g, pilarMenor.nome)
      .replace(/%nota_menor/g, pilarMenor.pontos.toString())
      .replace(/%resultadoNivel/g, resultado.nivel.toString())
      .replace(/%resultadoPontos/g, resultado.pontos.toString());

    const pdfUrl = `${window.location.protocol}//${window.location.host}/assets/MelhoriasHospitais-PassoAPasso.pdf`;

    const emailContent = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
   
  <div style="margin: 8px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px; line-height: 1.2;">
    <h3 style="color: #1e40af;">Dados do Participante:</h3>
    <p><strong>Nome:</strong> ${dados.nome}</p>
    <p><strong>Email:</strong> ${dados.email}</p>
  <p><strong>Cargo Atual:</strong> ${dados.cargo}</p>
  <p><strong>Hospital:</strong> ${dados.hospital}</p>
    <p><strong>Cidade:</strong> ${dados.cidade} - ${dados.uf}</p>
    <p><strong>Telefone:</strong> ${dados.telefone}</p>
  </div>

  <div style="margin: 8px 0; padding: 15px; background-color: #f0f7ff; border-radius: 8px;">
    <div style="white-space: pre-line;">${emailPersonalizado}</div>
  </div>

  <!-- Logo no final -->
<div style="text-align: left; margin-top: 20px;">
  <img src="${logoUrl}" alt="Logo" style="max-width: 200px; height: auto;">
</div>

  <p style="color: #64748b; margin-top: 20px;">
    Data/Hora: ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}
  </p>
</div>`;

    const respostasOrdenadas = QUESTOES
      .map(questao => {
        if (questao.tipo === 'dropdown_multiplo') {
          // Para questões com sub-itens, formatar como 2.1-3 2.2-2 etc.
          const subRespostas = questao.itens?.map((_, index) => {
            const chaveResposta = `${questao.id}_${index}`;
            const resposta = dados.respostas[chaveResposta];
            return `${questao.id}.${index + 1}-${resposta || 'undefined'}`;
          }).join(' ') || '';
          return subRespostas;
        } else {
          // Para questões simples, manter formato original
          return `${questao.id}-${dados.respostas[questao.id] || 'undefined'}`;
        }
      })
      .join(' ');

    // Função para obter resposta e pontos de uma questão
    const obterResposta = (questaoId: number, itemIndex?: number) => {
      const questao = QUESTOES.find(q => q.id === questaoId);
      if (!questao) return { resposta: '', pontos: 0 };

      const chave = itemIndex !== undefined ? `${questaoId}_${itemIndex}` : questaoId.toString();
      const respostaValor = dados.respostas[chave] || '';
      const pontos = questao.pontos[respostaValor as keyof typeof questao.pontos] || 0;

      // Converter resposta numérica para texto legível
      let respostaTexto = '';
      if (questao.opcoes && questao.opcoes[respostaValor]) {
        respostaTexto = questao.opcoes[respostaValor];
      } else {
        respostaTexto = respostaValor;
      }

      return { resposta: respostaTexto, pontos };
    };

    // Dados formatados para o Google Sheets seguindo exatamente o cabeçalho
    const webhookData = {
      // Subgrupo DADOS - apenas campos que vão para a planilha
      dados: {
        // Dados básicos (Colunas A-G)
        nome: dados.nome,
        telefone: dados.telefone,
        email: dados.email,
        cargo: dados.cargo,
        hospital: dados.hospital,
        cidade: dados.cidade,
        uf: dados.uf,
        dataHora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),

        // PILAR 1 - Questão 1 (Colunas H-I)
        nivelSatisfacaoServicoMedicoPlantaoAtual: obterResposta(1).resposta,
        pontosQ1: obterResposta(1).pontos,

        // PILAR 1 - Questão 2 (Colunas J-Q)
        furoOuAtrasoNaEscala: obterResposta(2, 0).resposta,
        pontosQ21: obterResposta(2, 0).pontos,
        dificuldadeEmEncontrarMedicoDisponivel: obterResposta(2, 1).resposta,
        pontosQ22: obterResposta(2, 1).pontos,
        maoDeObraDesqualificada: obterResposta(2, 2).resposta,
        pontosQ23: obterResposta(2, 2).pontos,
        comunicacaoIneficenteEntreCorpoClinicoEDirecao: obterResposta(2, 3).resposta,
        pontosQ24: obterResposta(2, 3).pontos,

        // PILAR 1 - Questão 3 (Colunas R-X)
        demoraNoAtendimento: obterResposta(3, 0).resposta,
        pontosQ31: obterResposta(3, 0).pontos,
        atendimentoPoucoHumanizado: obterResposta(3, 1).resposta,
        pontosQ32: obterResposta(3, 1).pontos,
        faltaDeExplicacaoClaraSobreDiagnosticoOuTratamento: obterResposta(3, 2).resposta,
        pontosQ33: obterResposta(3, 2).pontos,

        // PILAR 1 - Questão 4 (Colunas Y-AJ)
        uti: obterResposta(4, 0).resposta,
        pontosQ41: obterResposta(4, 0).pontos,
        pediatria: obterResposta(4, 1).resposta,
        pontosQ42: obterResposta(4, 1).pontos,
        emergencia: obterResposta(4, 2).resposta,
        pontosQ43: obterResposta(4, 2).pontos,
        obstetricia: obterResposta(4, 3).resposta,
        pontosQ44: obterResposta(4, 3).pontos,
        psiquiatria: obterResposta(4, 4).resposta,
        pontosQ45: obterResposta(4, 4).pontos,
        anestesiologia: obterResposta(4, 5).resposta,
        pontosQ46: obterResposta(4, 5).pontos,

        // PILAR 2 - Questões 5-8 (Colunas AK-AR)
        existemProtocolosMedicosDescritosParaOsPrincipaisFluxosDeEmergencia: obterResposta(5).resposta,
        pontosQ5: obterResposta(5).pontos,
        osProtocolosSaoAtualizadosComFrequenciaEBaseCientifica: obterResposta(6).resposta,
        pontosQ6: obterResposta(6).pontos,
        haIndicadoresQueMonitoramAadesaoDosMedicosAosProtocolos: obterResposta(7).resposta,
        pontosQ7: obterResposta(7).pontos,
        voceEstaSatisfeitoComAQuantidadeDeExamesSolicitadosNoPlantao: obterResposta(8).resposta,
        pontosQ8: obterResposta(8).pontos,

        // PILAR 3 - Questões 9-12 (Colunas AS-AZ)
        existemTreinamentosRegularesTrimestraisParaAEquipeMedica: obterResposta(9).resposta,
        pontosQ9: obterResposta(9).pontos,
        aCapacitacaoDaEquipeEstaAlinhadaComOsProtocolosInstitucionais: obterResposta(10).resposta,
        pontosQ10: obterResposta(10).pontos,
        existeProgramaOuFerramentaDeEducacaoMedicaContinuada: obterResposta(11).resposta,
        pontosQ11: obterResposta(11).pontos,
        medicosIaEmergenciaOuUtiApresentamDificuldadeParaRealizarIntubacao: obterResposta(12).resposta,
        pontosQ12: obterResposta(12).pontos,

        // Resultados finais (Colunas BA-BH)
        pilar1ServicosMedicos: pontuacaoPilares[1],
        pilar2ProtocolosDeAtendimento: pontuacaoPilares[2],
        pilar3EducacaoMedicaContinuada: pontuacaoPilares[3],
        pontuacaoGeral: resultado.pontos,
        nivel: resultado.nivel,
        recomendacao: resultado.descricao,
        pdfRecomendado: pilarMenor.pdf,
        tipo_formulario: TIPO_FORMULARIO,
        pilar_menor: pilarMenor.nome,
        nota_menor: pilarMenor.pontos,
        stringValidacao: pontuacaoPilares['stringValidacao']
      },

      // Campos extras fora do subgrupo dados (não vão para planilha)
      respostas: respostasOrdenadas,
      pdfUrl: pdfUrl,
      emailContent: emailContent,
      email_personalizado: emailPersonalizado
    };

    console.log('URL do webhook:', webhookUrl);
    console.log('Dados sendo enviados:', webhookData);

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(webhookData)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Erro HTTP:', response.status, response.statusText);
        console.error('Resposta do servidor:', errorText);
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }

      const responseData = await response.json();
      console.log('Webhook enviado com sucesso:', responseData);

    } catch (error) {
      console.error('Erro completo ao enviar webhook:', error);

      // Mostrar erro mais detalhado no console para debugging
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        console.error('Erro de rede - verifique a conexão e a URL do webhook');
        alert('Erro de conexão. Verifique sua internet e tente novamente.');
      } else if (error instanceof Error && error.message.includes('HTTP error')) {
        console.error('Erro do servidor:', error.message);
        alert(`Erro do servidor: ${error.message}`);
      } else {
        console.error('Erro desconhecido:', error);
        alert('Houve um erro ao enviar os dados. Verifique o console para mais detalhes.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.nome.trim() || !formData.email.trim() ||
      !formData.hospital.trim() || !formData.cidade.trim() || !formData.uf.trim() || !formData.telefone.trim()) {
      alert('Por favor, preencha todos os campos do formulário.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert('Por favor, insira um e-mail válido.');
      document.getElementById('email')?.focus();
      return;
    }

    // Validar questões
    const questoesSemResposta = QUESTOES.filter(questao => {
      if (questao.tipo === 'dropdown_multiplo') {
        // Para questões múltiplas, verificar se todos os itens foram respondidos
        return questao.itens.some((_, index) => !formData.respostas[`${questao.id}_${index}`]);
      } else {
        // Para questões simples
        return !formData.respostas[questao.id.toString()];
      }
    });

    if (questoesSemResposta.length > 0) {
      const primeiraQuestaoSemResposta = questoesSemResposta[0];
      let element: Element | null = null;

      if (primeiraQuestaoSemResposta.tipo === 'dropdown_multiplo') {
        element = document.querySelector(`[name="questao-${primeiraQuestaoSemResposta.id}_0"]`);
      } else {
        element = document.querySelector(`[name="questao-${primeiraQuestaoSemResposta.id}"]`);
      }

      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }

      alert(`Por favor, responda a questão "${primeiraQuestaoSemResposta.titulo}"`);
      return;
    }

    // Calcular pontuações
    const pontuacaoPilaresRaw = calcularPontuacaoPorPilar(formData.respostas);
    // Extrair apenas os pilares numéricos para evitar NaN
    const pontuacaoPilares = {
      1: pontuacaoPilaresRaw[1],
      2: pontuacaoPilaresRaw[2],
      3: pontuacaoPilaresRaw[3]
    };
    const pontos = calcularPontuacao(formData.respostas);
    const resultadoFinal = determinarNivel(pontos);
    const pilarMenor = determinarPilarMenorNota(pontuacaoPilares);
    const resultado = { ...resultadoFinal, pontos };

    setResultado(resultado);
    setShowModal(true);
    await enviarWebhook(formData, resultado, pontuacaoPilaresRaw, pilarMenor);
  };

  const formatarTelefone = (valor: string) => {
    const numeros = valor.replace(/\D/g, '');
    if (numeros.length <= 10) {
      // Telefone fixo: (99) 9999-9999
      return numeros.replace(/^(\d{0,2})(\d{0,4})(\d{0,4})$/, (_, ddd, primeira, segunda) => {
        let resultado = '';
        if (ddd) resultado += `(${ddd}`;
        if (ddd.length === 2) resultado += ') ';
        if (primeira) resultado += primeira;
        if (segunda) resultado += `-${segunda}`;
        return resultado;
      });
    } else {
      // Celular: (99) 99999-9999
      return numeros.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    }
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatarTelefone(e.target.value);
    setFormData(prev => ({ ...prev, telefone: formatted }));
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      cargo: '',
      hospital: '',
      cidade: '',
      uf: '',
      telefone: '',
      respostas: {}
    });
    setResultado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Função para preencher dados de teste
  const preencherDadosTeste = () => {
    const dadosTeste = {
      nome: 'Dr. João Silva Santos',
      email: 'jlianeiva@gmail.com',
      cargo: 'Diretor Clínico',
      hospital: 'Hospital São Francisco',
      cidade: 'São Paulo',
      uf: 'SP',
      telefone: '(11) 99888-7766',
      respostas: {
        '1': '1',        // Parcialmente satisfeito
        '2_0': '2',      // Furo ou atraso na escala - Ocorre raramente
        '2_1': '1',      // Dificuldade em encontrar médico - Ocorre frequentemente  
        '2_2': '0',      // Mão de obra desqualificada - É crítico
        '2_3': '2',      // Comunicação ineficiente - Ocorre raramente
        '3_0': '1',      // Demora no atendimento - Ocorre frequentemente
        '3_1': '2',      // Atendimento pouco humanizado - Ocorre raramente
        '3_2': '0',      // Falta de explicação clara - É crítico
        '4_0': '3',      // UTI - Muito importante
        '4_1': '2',      // Pediatria - Importante
        '4_2': '3',      // Emergência - Muito importante
        '4_3': '1',      // Obstetrícia - Pouco importante
        '4_4': '0',      // Psiquiatria - Não importante
        '4_5': '2',      // Anestesiologia - Importante
        '5': '2',        // Protocolos existem - Sim
        '6': '1',        // Protocolos atualizados - Parcialmente
        '7': '0',        // Indicadores de adesão - Não
        '8': '1',        // Satisfação com exames - Pouco satisfeito
        '9': '2',        // Treinamentos regulares - Sim
        '10': '0',       // Capacitação alinhada - Não
        '11': '2',       // Programa de educação - Sim
        '12': '1'        // Dificuldade intubação - Alguns apresentam
      }
    };

    setFormData(dadosTeste);
    alert('Dados de teste preenchidos! 🧪');
    console.log('Dados de teste preenchidos:', dadosTeste);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Seção Superior com background comum */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado Esquerdo - Imagem */}
            <div className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[350px] flex-shrink-0 self-center aspect-[2/3] rounded-lg shadow-md overflow-hidden">
              <img
                src="/assets/havaliacaoHospitalar.jpeg"
                alt="Melhorias Hospitalares"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Lado Direito - Formulário de Dados */}
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Diagnóstico Rapimed -  Hospitalar
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
                  <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                    Cargo Atual *
                  </label>
                  <input
                    type="text"
                    id="cargo"
                    required
                    value={formData.cargo}
                    onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                    placeholder="Ex: Diretor Clínico, Coordenador, etc."
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="hospital" className="block text-sm font-medium text-gray-700 mb-1">
                    Hospital *
                  </label>
                  <input
                    type="text"
                    id="hospital"
                    required
                    value={formData.hospital}
                    onChange={(e) => setFormData(prev => ({ ...prev, hospital: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label htmlFor="cidade" className="block text-sm font-medium text-gray-700 mb-1">
                      Cidade *
                    </label>
                    <input
                      type="text"
                      id="cidade"
                      required
                      value={formData.cidade}
                      onChange={(e) => setFormData(prev => ({ ...prev, cidade: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="uf" className="block text-sm font-medium text-gray-700 mb-1">
                      UF *
                    </label>
                    <select
                      id="uf"
                      required
                      value={formData.uf}
                      onChange={(e) => setFormData(prev => ({ ...prev, uf: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="">UF</option>
                      <option value="AC">AC</option>
                      <option value="AL">AL</option>
                      <option value="AP">AP</option>
                      <option value="AM">AM</option>
                      <option value="BA">BA</option>
                      <option value="CE">CE</option>
                      <option value="DF">DF</option>
                      <option value="ES">ES</option>
                      <option value="GO">GO</option>
                      <option value="MA">MA</option>
                      <option value="MT">MT</option>
                      <option value="MS">MS</option>
                      <option value="MG">MG</option>
                      <option value="PA">PA</option>
                      <option value="PB">PB</option>
                      <option value="PR">PR</option>
                      <option value="PE">PE</option>
                      <option value="PI">PI</option>
                      <option value="RJ">RJ</option>
                      <option value="RN">RN</option>
                      <option value="RS">RS</option>
                      <option value="RO">RO</option>
                      <option value="RR">RR</option>
                      <option value="SC">SC</option>
                      <option value="SP">SP</option>
                      <option value="SE">SE</option>
                      <option value="TO">TO</option>
                    </select>
                  </div>
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
                    placeholder="(99) 99999-9999"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Botão de Teste - Apenas para desenvolvimento 
        <div className="max-w-4xl mx-auto mb-6">
          <button
            type="button"
            onClick={preencherDadosTeste}
            className="w-full bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
          >
            🧪 PREENCHER DADOS DE TESTE (DESENVOLVIMENTO)
          </button>
        </div>*/}

        {/* Seção de Questionário */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Avalie o nível atual de cada área em sua instituição
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-4">
                {QUESTOES.map((questao) => {
                  // Definir cor de fundo por pilar
                  const getCorPilar = (pilar: number) => {
                    switch (pilar) {
                      case 1: return "bg-gray-50";
                      case 2: return "bg-blue-50";
                      case 3: return "bg-gray-50";
                      default: return "bg-gray-50";
                    }
                  };

                  return (
                    <div key={questao.id} className={`${getCorPilar(questao.pilar)} p-3 rounded-lg border`}>
                      <h3 className="font-semibold text-gray-800 mb-2">{questao.titulo}</h3>
                      {questao.subtitulo && (
                        <p className="text-sm text-gray-600 mb-3">{questao.subtitulo}</p>
                      )}

                      {questao.tipo === 'radio' ? (
                        <div className="space-y-2">
                          {Object.entries(questao.opcoes).map(([valor, texto]) => (
                            <label key={valor} className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name={`questao-${questao.id}`}
                                value={valor}
                                checked={formData.respostas[questao.id.toString()] === valor}
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
                                {texto}
                              </span>
                            </label>
                          ))}
                        </div>
                      ) : questao.tipo === 'dropdown' ? (
                        <select
                          name={`questao-${questao.id}`}
                          value={formData.respostas[questao.id.toString()] || ''}
                          onChange={(e) => setFormData(prev => ({
                            ...prev,
                            respostas: {
                              ...prev.respostas,
                              [questao.id]: e.target.value
                            }
                          }))}
                          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                        >
                          <option value="">Escolha uma opção...</option>
                          {Object.entries(questao.opcoes).map(([valor, texto]) => (
                            <option key={valor} value={valor}>
                              {texto}
                            </option>
                          ))}
                        </select>
                      ) : questao.tipo === 'dropdown_multiplo' ? (
                        <div className="space-y-3">
                          {questao.itens.map((item, index) => (
                            <div key={index} className="bg-white p-3 rounded border flex flex-col sm:flex-row sm:items-center sm:justify-between">
                              <span className="text-gray-700 mb-2 sm:mb-0 sm:mr-4">• {item}</span>
                              <select
                                name={`questao-${questao.id}_${index}`}
                                value={formData.respostas[`${questao.id}_${index}`] || ''}
                                onChange={(e) => setFormData(prev => ({
                                  ...prev,
                                  respostas: {
                                    ...prev.respostas,
                                    [`${questao.id}_${index}`]: e.target.value
                                  }
                                }))}
                                className="w-full sm:w-[220px] px-4 py-3 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                              >
                                <option value="">Escolha uma opção...</option>
                                {Object.entries(questao.opcoes).map(([valor, texto]) => (
                                  <option key={valor} value={valor}>
                                    {texto}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  );
                })}
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Ver resultado e plano de melhorias
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Modal de Resultado */}
      {showModal && resultado && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="text-center">
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mb-2">Avaliação Enviada!</h2>
                <p className="text-gray-600">
                  Um e-mail foi enviado para <strong>{formData.email}</strong> com sua avaliação completa e recomendações personalizadas.
                </p>
              </div>

              <button
                onClick={() => {
                  setShowModal(false);
                  resetForm();
                }}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}