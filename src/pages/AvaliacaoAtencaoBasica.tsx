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

interface QuestaoCheckbox extends QuestaoBase {
  tipo: 'checkbox';
  opcoes: { [key: string]: string };
}

interface QuestaoDropdownMultiplo extends QuestaoBase {
  tipo: 'dropdown_multiplo';
  itens: string[];
  opcoes: { [key: string]: string };
}

type Questao = QuestaoRadio | QuestaoCheckbox | QuestaoDropdownMultiplo;

interface FormData {
  nome: string;
  email: string;
  municipio: string;
  estado: string;
  cargo: string;
  telefone: string;
  respostas: { [key: string]: string | string[] };
}

// Constantes de configuração baseadas no PDF dos Secretários de Saúde
const TIPO_FORMULARIO = "Postos de Saúde";
const PRIORIDADE_PILARES = [1, 2, 3]; 
const NOMES_PILARES = [
  "Serviços Médicos", 
  "Protocolos de Atendimento Médico", 
  "Educação Médica Continuada"
];

// Template configurável para email
const EMAIL_TEMPLATE = `
Nome: %nome, sua avaliação foi concluída!

Resultado por pilar:
- Serviços Médicos: %pontos_pilar1 pontos
- Protocolos de Atendimento Médico: %pontos_pilar2 pontos  
- Educação Médica Continuada: %pontos_pilar3 pontos

Área de maior necessidade: %pilar_menor
Plano de ação recomendado: %pdfRecomendado

Município: %municipio - %uf
Telefone: %telefone

Atenciosamente,
Equipe DashVision Healthcare Solutions
`;

// Questões baseadas EXATAMENTE no PDF dos Postos de Saúde
const QUESTOES: Questao[] = [
  // PILAR 1 - Serviços Médicos
  {
    id: 1,
    titulo: "1. Nível de satisfação com os serviços médicos atuais (clínico geral):",
    tipo: 'radio',
    pilar: 1,
    opcoes: {
      '2': 'Satisfeito',
      '1': 'Parcialmente satisfeito',
      '0': 'Insatisfeito'
    },
    pontos: {
      '2': 2,
      '1': 1,
      '0': 0
    }
  },
  {
    id: 2,
    titulo: "2. Nível de satisfação com os serviços médicos atuais (especialistas):",
    tipo: 'radio',
    pilar: 1,
    opcoes: {
      '2': 'Satisfeito',
      '1': 'Parcialmente satisfeito',
      '0': 'Insatisfeito'
    },
    pontos: {
      '2': 2,
      '1': 1,
      '0': 0
    }
  },
  {
    id: 3,
    titulo: "3. Principais problemas enfrentados no atendimento médico:",
    tipo: 'dropdown_multiplo',
    pilar: 1,
    itens: [
      "Furo ou atraso nas consultas",
      "Dificuldade em encontrar médico disponível",
      "Mão de obra desqualificada",
      "Comunicação ineficiente entre médico e prefeitura"
    ],
    opcoes: {
      "3": "Não ocorre",
      "2": "Raramente",
      "1": "Frequentemente",
      "0": "Crítico e recorrente"
    },
    pontos: { "3": 3, "2": 2, "1": 1, "0": 0 }
  },
  {
    id: 4,
    titulo: "4. Dores relatadas pelos pacientes:",
    tipo: 'dropdown_multiplo',
    pilar: 1,
    itens: [
      "Demora no atendimento",
      "Atendimento pouco humanizado",
      "Falta de explicação clara sobre diagnóstico ou tratamento",
      "Erros no atendimento"
    ],
    opcoes: {
      "3": "Não ocorre",
      "2": "Raramente",
      "1": "Frequentemente",
      "0": "Crítico e recorrente"
    },
    pontos: { "3": 3, "2": 2, "1": 1, "0": 0 }
  },
  {
    id: 5,
    titulo: "5. Quais serviços o município deseja criar ou reorganizar?",
    subtitulo: "Não pontua, pode marcar quantos quiser",
    tipo: 'checkbox',
    pilar: 0, // Não pontua
    opcoes: {
      'ortopedia': 'Ortopedia',
      'pediatria': 'Pediatria',
      'ginecologia': 'Ginecologia',
      'psiquiatria': 'Psiquiatria',
      'pequenos_procedimentos': 'Pequenos procedimentos',
      'pronto_atendimento': 'Criação de pronto atendimento municipal',
      'horario_noturno': 'Horário noturno estendido'
    },
    pontos: {} // Todos zerados pois não pontua
  },
  // PILAR 2 - Protocolos de Atendimento Médico
  {
    id: 6,
    titulo: "6. Existem protocolos médicos descritos para os principais fluxos dos postos de saúde?",
    tipo: 'radio',
    pilar: 2,
    opcoes: {
      '2': 'Sim',
      '0': 'Não'
    },
    pontos: {
      '2': 2,
      '0': 0
    }
  },
  {
    id: 7,
    titulo: "7. Os protocolos são atualizados com frequência?",
    tipo: 'radio',
    pilar: 2,
    opcoes: {
      '2': 'Sim, com revisão periódica definida',
      '1': 'Parcialmente (alguns estão desatualizados)',
      '0': 'Não'
    },
    pontos: {
      '2': 2,
      '1': 1,
      '0': 0
    }
  },
  {
    id: 8,
    titulo: "8. Os protocolos têm base científica reconhecida?",
    tipo: 'radio',
    pilar: 2,
    opcoes: {
      '2': 'Sim',
      '0': 'Não'
    },
    pontos: {
      '2': 2,
      '0': 0
    }
  },
  {
    id: 9,
    titulo: "9. Existem indicadores monitorados e gerenciados sobre a adesão dos médicos aos protocolos?",
    tipo: 'radio',
    pilar: 2,
    opcoes: {
      '2': 'Sim',
      '0': 'Não'
    },
    pontos: {
      '2': 2,
      '0': 0
    }
  },
  // PILAR 3 - Educação Médica Continuada
  {
    id: 10,
    titulo: "10. Existem treinamentos regulares (ex.: trimestrais) para a equipe médica dos postos?",
    tipo: 'radio',
    pilar: 3,
    opcoes: {
      '2': 'Sim',
      '0': 'Não'
    },
    pontos: {
      '2': 2,
      '0': 0
    }
  },
  {
    id: 11,
    titulo: "11. A capacitação da equipe está alinhada com os protocolos do Ministério da Saúde?",
    tipo: 'radio',
    pilar: 3,
    opcoes: {
      '2': 'Sim',
      '0': 'Não'
    },
    pontos: {
      '2': 2,
      '0': 0
    }
  },
  {
    id: 12,
    titulo: "12. Existe programa ou ferramenta de educação médica continuada?",
    tipo: 'radio',
    pilar: 3,
    opcoes: {
      '2': 'Sim',
      '0': 'Não'
    },
    pontos: {
      '2': 2,
      '0': 0
    }
  },
  {
    id: 13,
    titulo: "13. Há dificuldade em engajar os médicos na melhoria dos indicadores monitorados pelo Ministério da Saúde?",
    tipo: 'radio',
    pilar: 3,
    opcoes: {
      '2': 'Não, participam ativamente',
      '1': 'Parcialmente',
      '0': 'Sim, há grande dificuldade'
    },
    pontos: {
      '2': 2,
      '1': 1,
      '0': 0
    }
  }
];

const determinarPilarMenorNota = (pontuacaoPilares: { [key: number]: number }) => {
  // Filtrar pilares válidos (excluir pilar 0 que não pontua)
  const pilaresValidos = Object.fromEntries(
    Object.entries(pontuacaoPilares).filter(([pilar]) => Number(pilar) !== 0)
  );
  
  let menorNota = Math.min(...Object.values(pilaresValidos));
  
  // Em caso de empate, usar a prioridade configurada
  for (const pilar of PRIORIDADE_PILARES) {
    if (pilaresValidos[pilar] === menorNota) {
      const pdfNames = {
        1: "Estratégias para Serviços de Atenção Básica.pdf",
        2: "Protocolos Clínicos para Postos de Saúde.pdf", 
        3: "Educação Permanente para Equipes de Saúde.pdf"
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
    pdf: "Estratégias para Serviços de Atenção Básica.pdf"
  };
};

const determinarNivel = (pontos: number) => {
  if (pontos <= 8) return {
    nivel: "Nível 1 - Reestruturação Urgente",
    descricao: "Os postos de saúde necessitam de intervenção imediata para garantir o funcionamento básico dos serviços."
  };
  if (pontos <= 16) return {
    nivel: "Nível 2 - Melhorias Prioritárias", 
    descricao: "Existem deficiências importantes que comprometem a qualidade dos serviços médicos."
  };
  if (pontos <= 20) return {
    nivel: "Nível 3 - Fortalecimento Necessário",
    descricao: "A estrutura básica funciona, mas há oportunidades significativas de melhoria."
  };
  return {
    nivel: "Nível 4 - Posto de Saúde Consolidado",
    descricao: "Excelente estrutura de atendimento médico, com foco em inovação e melhoria contínua."
  };
};

export function AvaliacaoAtencaoBasica() {
  const [formData, setFormData] = useState<FormData>({
    nome: '',
    email: '',
    municipio: '',
    estado: '',
    cargo: '',
    telefone: '',
    respostas: {}
  });

  const [resultado, setResultado] = useState<{
    nivel: string;
    descricao: string;
    pontuacaoPilares: { [key: number]: number };
    pontuacaoTotal: number;
  } | null>(null);

  const [showModal, setShowModal] = useState(false);

  const calcularPontuacao = () => {
    const pontuacaoPilares: { [key: number]: number } = { 1: 0, 2: 0, 3: 0 };
    
    QUESTOES.forEach(questao => {
      if (questao.pilar === 0) return; // Pular questões que não pontuam
      
      if (questao.tipo === 'radio') {
        const resposta = formData.respostas[questao.id.toString()] as string;
        if (resposta && questao.pontos[resposta] !== undefined) {
          pontuacaoPilares[questao.pilar] += questao.pontos[resposta];
        }
      } else if (questao.tipo === 'checkbox') {
        const respostas = formData.respostas[questao.id.toString()] as string[] || [];
        respostas.forEach(resposta => {
          if (questao.pontos[resposta] !== undefined) {
            pontuacaoPilares[questao.pilar] += questao.pontos[resposta];
          }
        });
      } else if (questao.tipo === 'dropdown_multiplo') {
        // Para questões dropdown_multiplo, somar pontos de todos os itens
        questao.itens?.forEach((_, index) => {
          const chaveResposta = `${questao.id}_${index}`;
          const resposta = formData.respostas[chaveResposta] as string;
          if (resposta && questao.pontos[resposta] !== undefined) {
            pontuacaoPilares[questao.pilar] += questao.pontos[resposta];
          }
        });
      }
    });

    const pontuacaoTotal = Object.values(pontuacaoPilares).reduce((acc, val) => acc + val, 0);
    const nivel = determinarNivel(pontuacaoTotal);

    return {
      ...nivel,
      pontuacaoPilares,
      pontuacaoTotal
    };
  };

  const enviarWebhook = async (dados: FormData, resultado: any, pontuacaoPilares: any, pilarMenor: any) => {
    const webhookUrl = 'https://n8n.dashvision.com.br/webhook/melhorias-hospitais';
    
    // Substituir variáveis no template
    const emailPersonalizado = EMAIL_TEMPLATE
      .replace(/%nome/g, dados.nome)
      .replace(/%municipio/g, dados.municipio)
      .replace(/%regiao/g, '')
      .replace(/%uf/g, dados.estado)
      .replace(/%telefone/g, dados.telefone)
      .replace(/%tipo_formulario/g, TIPO_FORMULARIO)
      .replace(/%pontos_pilar1/g, pontuacaoPilares[1].toString())
      .replace(/%pontos_pilar2/g, pontuacaoPilares[2].toString())
      .replace(/%pontos_pilar3/g, pontuacaoPilares[3].toString())
      .replace(/%pilar_menor/g, pilarMenor.nome)
      .replace(/%nota_menor/g, pilarMenor.pontos.toString())
      .replace(/%pdfRecomendado/g, pilarMenor.pdf);
    
    const pdfUrl = `${window.location.protocol}//${window.location.host}/assets/${pilarMenor.pdf}`;
    
    const emailContent = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <h2 style="color: #2563eb;">Nova Avaliação de Atenção Básica recebida</h2>
  
  <div style="margin: 20px 0; padding: 15px; background-color: #f8fafc; border-radius: 8px;">
    <h3 style="color: #1e40af;">Dados do Participante:</h3>
    <p><strong>Nome:</strong> ${dados.nome}</p>
    <p><strong>Email:</strong> ${dados.email}</p>
    <p><strong>Município:</strong> ${dados.municipio}</p>
    <p><strong>Estado:</strong> ${dados.estado}</p>
    <p><strong>Cargo:</strong> ${dados.cargo}</p>
    <p><strong>Telefone:</strong> ${dados.telefone}</p>
    <p><strong>Tipo:</strong> ${TIPO_FORMULARIO}</p>
  </div>

  <div style="margin: 20px 0; padding: 15px; background-color: #f0f9ff; border-radius: 8px;">
    <h3 style="color: #1e40af;">Resultado da Avaliação:</h3>
    <p><strong>Pontuação Total:</strong> ${resultado.pontuacaoTotal} pontos</p>
    <p><strong>Nível:</strong> ${resultado.nivel}</p>
    <p><strong>Pontuação por Pilar:</strong></p>
    <ul>
      <li>Serviços Médicos: ${pontuacaoPilares[1]} pontos</li>
      <li>Protocolos de Atendimento: ${pontuacaoPilares[2]} pontos</li>
      <li>Educação Médica Continuada: ${pontuacaoPilares[3]} pontos</li>
    </ul>
    <p><strong>Área de maior necessidade:</strong> ${pilarMenor.nome} (${pilarMenor.pontos} pontos)</p>
    <p><strong>PDF recomendado:</strong> ${pilarMenor.pdf}</p>
    <p style="margin-top: 10px;">${resultado.descricao}</p>
  </div>

  <div style="margin: 20px 0; padding: 20px; background-color: #f0f7ff; border-radius: 8px;">
    <h3 style="color: #1e40af;">Mensagem Personalizada:</h3>
    <div style="white-space: pre-line;">${emailPersonalizado}</div>
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
        } else if (questao.tipo === 'checkbox') {
          // Para checkbox, formatar como array
          const respostas = dados.respostas[questao.id.toString()] as string[] || [];
          return `${questao.id}-[${respostas.join(',')}]`;
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
      
      let chave: string;
      if (itemIndex !== undefined) {
        chave = `${questaoId}_${itemIndex}`;
      } else {
        chave = questaoId.toString();
      }
      
      let respostaValor = dados.respostas[chave];
      
      // Para checkbox, pegar o array de respostas
      if (questao.tipo === 'checkbox' && Array.isArray(respostaValor)) {
        const pontos = respostaValor.reduce((total, resp) => {
          return total + (questao.pontos[resp] || 0);
        }, 0);
        return { resposta: respostaValor.join(', '), pontos };
      }
      
      const pontos = questao.pontos[respostaValor as keyof typeof questao.pontos] || 0;
      
      // Converter resposta numérica para texto legível
      let respostaTexto = '';
      if (questao.opcoes && questao.opcoes[respostaValor as string]) {
        respostaTexto = questao.opcoes[respostaValor as string];
      } else {
        respostaTexto = respostaValor as string || '';
      }
      
      return { resposta: respostaTexto, pontos };
    };

    // Dados formatados para o Google Sheets seguindo o cabeçalho
    const webhookData = {
      // Subgrupo DADOS - apenas campos que vão para a planilha
      dados: {
        // Dados básicos (Colunas A-G)
        nome: dados.nome,
        telefone: dados.telefone,
        email: dados.email,
        municipio: dados.municipio,
        regiao: '', // Campo vazio pois não temos região
        uf: dados.estado, // Usar estado como UF
        dataHora: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        
        // Questões 1-13 (seguindo o padrão do cabeçalho)
        coberturaProgramaSaudeFamilia: obterResposta(1).resposta,
        pontosQ1: obterResposta(1).pontos,
        
        existemProtocolosAssistenciaisPadronizados: obterResposta(2).resposta,
        pontosQ2: obterResposta(2).pontos,
        
        frequenciaAtualizacaoProtocolos: obterResposta(3, 0).resposta || obterResposta(3).resposta,
        pontosQ3: obterResposta(3, 0).pontos || obterResposta(3).pontos,
        
        indicadoresDeMonitoramento: obterResposta(4, 0).resposta || obterResposta(4).resposta,
        pontosQ4: obterResposta(4, 0).pontos || obterResposta(4).pontos,
        
        qualidadeDoSaneamentoBasico: obterResposta(5).resposta,
        pontosQ5: obterResposta(5).pontos,
        
        percentualCoberturaProgramaAgentesComunitarios: obterResposta(6).resposta,
        pontosQ6: obterResposta(6).pontos,
        
        satisfacaoFuncionariosComTreinamentos: obterResposta(7).resposta,
        pontosQ7: obterResposta(7).pontos,
        
        frequenciaTreinamentosEquipesSaude: obterResposta(8).resposta,
        pontosQ8: obterResposta(8).pontos,
        
        percentualCoberturaProgramaNutricao: obterResposta(9).resposta,
        pontosQ9: obterResposta(9).pontos,
        
        percentualCoberturaProgramaVacinacao: obterResposta(10).resposta,
        pontosQ10: obterResposta(10).pontos,
        
        qualidadeTelemedicinaTelemedicina: obterResposta(11).resposta,
        pontosQ11: obterResposta(11).pontos,
        
        percentualCoberturaProgramaSaudeMental: obterResposta(12).resposta,
        pontosQ12: obterResposta(12).pontos,
        
        existeProgramaEducacaoMedicaContinuada: obterResposta(13).resposta,
        pontosQ13: obterResposta(13).pontos,
        
        // Resultados finais
        pilar1ServicosMedicos: pontuacaoPilares[1],
        pilar2ProtocolosDeAtendimento: pontuacaoPilares[2],
        pilar3EducacaoMedicaContinuada: pontuacaoPilares[3],
        pontuacaoGeral: resultado.pontuacaoTotal,
        nivel: resultado.nivel,
        recomendacao: resultado.descricao,
        pdfRecomendado: pilarMenor.pdf,
        
        // Campos extras movidos para dentro de dados
        tipo_formulario: TIPO_FORMULARIO,
        pilar_menor: pilarMenor.nome,
        nota_menor: pilarMenor.pontos
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
      } else {
        alert('Erro interno. Verifique o console para mais detalhes.');
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validar campos obrigatórios
    if (!formData.nome.trim() || !formData.email.trim() || 
        !formData.municipio.trim() || !formData.estado.trim() || 
        !formData.cargo.trim() || !formData.telefone.trim()) {
      alert('Por favor, preencha todos os campos do formulário.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Validar email
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
      } else if (questao.tipo === 'checkbox') {
        // Para checkbox, verificar se pelo menos uma opção foi selecionada
        const respostas = formData.respostas[questao.id.toString()] as string[] || [];
        return respostas.length === 0;
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
        element = document.querySelector(`[name="questao_${primeiraQuestaoSemResposta.id}"]`);
      }
      
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      alert(`Por favor, responda a questão "${primeiraQuestaoSemResposta.titulo}"`);
      return;
    }

    // Calcular pontuações usando a função existente
    const resultadoCalculado = calcularPontuacao();
    const pilarMenor = determinarPilarMenorNota(resultadoCalculado.pontuacaoPilares);
    
    setResultado(resultadoCalculado);
    setShowModal(true);
    await enviarWebhook(formData, resultadoCalculado, resultadoCalculado.pontuacaoPilares, pilarMenor);
  };

  const resetForm = () => {
    setFormData({
      nome: '',
      email: '',
      municipio: '',
      estado: '',
      cargo: '',
      telefone: '',
      respostas: {}
    });
    setResultado(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
      if (value.length <= 2) {
        value = value.replace(/(\d{2})/, '($1)');
      } else if (value.length <= 7) {
        value = value.replace(/(\d{2})(\d{5})/, '($1) $2');
      } else {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      }
    }
    
    setFormData(prev => ({ ...prev, telefone: value }));
  };

  const handleResposta = (questaoId: number, valor: string) => {
    const questao = QUESTOES.find(q => q.id === questaoId);
    
    if (questao?.tipo === 'checkbox') {
      const respostasAtuais = (formData.respostas[questaoId.toString()] as string[]) || [];
      let novasRespostas: string[];
      
      if (respostasAtuais.includes(valor)) {
        novasRespostas = respostasAtuais.filter(r => r !== valor);
      } else {
        novasRespostas = [...respostasAtuais, valor];
      }
      
      setFormData(prev => ({
        ...prev,
        respostas: {
          ...prev.respostas,
          [questaoId.toString()]: novasRespostas
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        respostas: {
          ...prev.respostas,
          [questaoId.toString()]: valor
        }
      }));
    }
  };

  // Função para preencher dados de teste
  const preencherDadosTeste = () => {
    const dadosTeste = {
      nome: 'Dr. Ana Paula Silva',
      email: 'ana.silva@saude.municipio.br',
      municipio: 'Rio de Janeiro',
      estado: 'RJ', 
      cargo: 'Coordenadora dos Postos de Saúde',
      telefone: '(21) 99123-4567',
      respostas: {
        // PILAR 1 - Serviços Médicos
        '1': '1',    // Satisfação clínico geral - Parcialmente satisfeito
        '2': '0',    // Satisfação especialistas - Insatisfeito
        
        // Questão 3 - dropdown_multiplo (4 itens)
        '3_0': '1',  // Furo ou atraso nas consultas - Frequentemente
        '3_1': '0',  // Dificuldade encontrar médico - Crítico e recorrente
        '3_2': '2',  // Mão de obra desqualificada - Raramente
        '3_3': '1',  // Comunicação ineficiente - Frequentemente
        
        // Questão 4 - dropdown_multiplo (4 itens)
        '4_0': '1',  // Demora no atendimento - Frequentemente
        '4_1': '2',  // Atendimento pouco humanizado - Raramente
        '4_2': '0',  // Falta de explicação clara - Crítico e recorrente
        '4_3': '3',  // Erros no atendimento - Não ocorre
        
        // Questão 5 - checkbox (não pontua)
        '5': ['ortopedia', 'pediatria', 'pronto_atendimento'],
        
        // PILAR 2 - Protocolos de Atendimento Médico
        '6': '2',    // Existem protocolos descritos - Sim
        '7': '1',    // Protocolos atualizados - Parcialmente
        '8': '0',    // Base científica - Não
        '9': '0',    // Indicadores monitorados - Não
        
        // PILAR 3 - Educação Médica Continuada
        '10': '0',   // Treinamentos regulares - Não
        '11': '2',   // Alinhado com Ministério - Sim
        '12': '0',   // Programa educação continuada - Não
        '13': '0'    // Dificuldade engajar médicos - Sim, há grande dificuldade
      }
    };
    
    setFormData(dadosTeste);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-12">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Lado Esquerdo - Imagem */}
            <div className="w-[220px] sm:w-[260px] md:w-[300px] lg:w-[350px] flex-shrink-0 self-center aspect-[2/3] rounded-lg shadow-md overflow-hidden">
              <img
                src="/assets/havaliacaoPostoSaude.png"
                alt="Avaliação Posto de Saúde"
                className="w-full h-full object-contain"
                loading="lazy"
                decoding="async"
              />
            </div>

            {/* Lado Direito - Formulário de Dados */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-800 mb-6">
                AVALIAÇÃO DE POSTOS DE SAÚDE
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
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>

                <div>
                  <label htmlFor="municipio" className="block text-sm font-medium text-gray-700 mb-1">
                    Município *
                  </label>
                  <input
                    type="text"
                    id="municipio"
                    required
                    value={formData.municipio}
                    onChange={(e) => setFormData(prev => ({ ...prev, municipio: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="estado" className="block text-sm font-medium text-gray-700 mb-1">
                      Estado *
                    </label>
                    <select
                      id="estado"
                      required
                      value={formData.estado}
                      onChange={(e) => setFormData(prev => ({ ...prev, estado: e.target.value }))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    >
                      <option value="">Selecione o estado</option>
                      <option value="AC">Acre</option>
                      <option value="AL">Alagoas</option>
                      <option value="AP">Amapá</option>
                      <option value="AM">Amazonas</option>
                      <option value="BA">Bahia</option>
                      <option value="CE">Ceará</option>
                      <option value="DF">Distrito Federal</option>
                      <option value="ES">Espírito Santo</option>
                      <option value="GO">Goiás</option>
                      <option value="MA">Maranhão</option>
                      <option value="MT">Mato Grosso</option>
                      <option value="MS">Mato Grosso do Sul</option>
                      <option value="MG">Minas Gerais</option>
                      <option value="PA">Pará</option>
                      <option value="PB">Paraíba</option>
                      <option value="PR">Paraná</option>
                      <option value="PE">Pernambuco</option>
                      <option value="PI">Piauí</option>
                      <option value="RJ">Rio de Janeiro</option>
                      <option value="RN">Rio Grande do Norte</option>
                      <option value="RS">Rio Grande do Sul</option>
                      <option value="RO">Rondônia</option>
                      <option value="RR">Roraima</option>
                      <option value="SC">Santa Catarina</option>
                      <option value="SP">São Paulo</option>
                      <option value="SE">Sergipe</option>
                      <option value="TO">Tocantins</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cargo" className="block text-sm font-medium text-gray-700 mb-1">
                      Cargo *
                    </label>
                    <input
                      type="text"
                      id="cargo"
                      required
                      value={formData.cargo}
                      onChange={(e) => setFormData(prev => ({ ...prev, cargo: e.target.value }))}
                      placeholder="Ex: Secretário(a) Municipal de Saúde"
                      className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                    />
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
                    value={formData.telefone}
                    onChange={handleTelefoneChange}
                    placeholder="(11) 99999-9999"
                    maxLength={15}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                  />
                </div>
              </div>
            </div>

            <div className="ml-8">
              <button
                type="button"
                onClick={preencherDadosTeste}
                className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm"
              >
                Preencher Teste
              </button>
            </div>
          </div>

          {/* Seção de Questionário */}
          <div className="bg-white rounded-lg shadow-lg p-6 mt-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-4 text-center">
              Avalie o nível atual de cada área em seus postos de saúde
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Títulos dos Pilares e Questões */}
              <div className="space-y-6">
                {/* PILAR 1 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-4 bg-gray-100 py-2 rounded">
                    PILAR 1 - Serviços Médicos
                  </h3>
                  {QUESTOES.filter(q => q.pilar === 1).map((questao) => (
                    <div key={questao.id} className="bg-gray-50 p-4 rounded-lg border mb-3">
                      <h4 className="font-semibold text-gray-800 mb-2">{questao.titulo}</h4>
                      {questao.subtitulo && (
                        <p className="text-sm text-gray-600 mb-3">{questao.subtitulo}</p>
                      )}
                      
                      {questao.tipo === 'radio' ? (
                        <div className="space-y-2">
                          {Object.entries(questao.opcoes).map(([valor, texto]) => (
                            <label key={valor} className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="radio"
                                name={`questao_${questao.id}`}
                                value={valor}
                                checked={formData.respostas[questao.id.toString()] === valor}
                                onChange={() => handleResposta(questao.id, valor)}
                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                              />
                              <span className="text-gray-700 leading-relaxed">{texto}</span>
                            </label>
                          ))}
                        </div>
                      ) : questao.tipo === 'dropdown_multiplo' ? (
                        <div className="space-y-3">
                          {questao.itens.map((item, index) => (
                            <div key={index} className="flex items-center justify-between bg-white p-3 rounded border">
                              <span className="flex-1 text-gray-700">• {item}</span>
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
                                className="ml-4 px-3 py-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm min-w-[200px]"
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
                      ) : questao.tipo === 'checkbox' ? (
                        <div className="space-y-2">
                          {Object.entries(questao.opcoes).map(([valor, texto]) => (
                            <label key={valor} className="flex items-start space-x-3 cursor-pointer">
                              <input
                                type="checkbox"
                                name={`questao_${questao.id}`}
                                value={valor}
                                checked={((formData.respostas[questao.id.toString()] as string[]) || []).includes(valor)}
                                onChange={() => handleResposta(questao.id, valor)}
                                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                              />
                              <span className="text-gray-700 leading-relaxed">{texto}</span>
                            </label>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>

                {/* Questão 5 - não pontua */}
                {QUESTOES.filter(q => q.pilar === 0).map((questao) => (
                  <div key={questao.id} className="bg-gray-50 p-4 rounded-lg border mb-6">
                    <h4 className="font-semibold text-gray-800 mb-2">{questao.titulo}</h4>
                    {questao.subtitulo && (
                      <p className="text-sm text-gray-600 mb-3">{questao.subtitulo}</p>
                    )}
                    
                    <div className="space-y-2">
                      {Object.entries(questao.opcoes).map(([valor, texto]) => (
                        <label key={valor} className="flex items-start space-x-3 cursor-pointer">
                          <input
                            type="checkbox"
                            name={`questao_${questao.id}`}
                            value={valor}
                            checked={((formData.respostas[questao.id.toString()] as string[]) || []).includes(valor)}
                            onChange={() => handleResposta(questao.id, valor)}
                            className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <span className="text-gray-700 leading-relaxed">{texto}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}

                {/* PILAR 2 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-4 bg-blue-100 py-2 rounded">
                    PILAR 2 - Protocolos de Atendimento Médico
                  </h3>
                  {QUESTOES.filter(q => q.pilar === 2).map((questao) => (
                    <div key={questao.id} className="bg-blue-50 p-4 rounded-lg border mb-3">
                      <h4 className="font-semibold text-gray-800 mb-2">{questao.titulo}</h4>
                      {questao.subtitulo && (
                        <p className="text-sm text-gray-600 mb-3">{questao.subtitulo}</p>
                      )}
                      
                      <div className="space-y-2">
                        {Object.entries(questao.opcoes).map(([valor, texto]) => (
                          <label key={valor} className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`questao_${questao.id}`}
                              value={valor}
                              checked={formData.respostas[questao.id.toString()] === valor}
                              onChange={() => handleResposta(questao.id, valor)}
                              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-gray-700 leading-relaxed">{texto}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* PILAR 3 */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 text-center mb-4 bg-gray-100 py-2 rounded">
                    PILAR 3 - Educação Médica Continuada
                  </h3>
                  {QUESTOES.filter(q => q.pilar === 3).map((questao) => (
                    <div key={questao.id} className="bg-gray-50 p-4 rounded-lg border mb-3">
                      <h4 className="font-semibold text-gray-800 mb-2">{questao.titulo}</h4>
                      {questao.subtitulo && (
                        <p className="text-sm text-gray-600 mb-3">{questao.subtitulo}</p>
                      )}
                      
                      <div className="space-y-2">
                        {Object.entries(questao.opcoes).map(([valor, texto]) => (
                          <label key={valor} className="flex items-start space-x-3 cursor-pointer">
                            <input
                              type="radio"
                              name={`questao_${questao.id}`}
                              value={valor}
                              checked={formData.respostas[questao.id.toString()] === valor}
                              onChange={() => handleResposta(questao.id, valor)}
                              className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                            />
                            <span className="text-gray-700 leading-relaxed">{texto}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>            <div className="mt-8 text-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium shadow-md"
              >
                Enviar Avaliação
              </button>
            </div>
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
                  Um e-mail foi enviado para <strong>{formData.email}</strong> com sua avaliação completa e recomendações personalizadas para melhorias nos postos de saúde.
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

export default AvaliacaoAtencaoBasica;
