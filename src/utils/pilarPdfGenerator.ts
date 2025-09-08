import { jsPDF } from 'jspdf';

// Função para converter HTML em PDF usando jsPDF
export const generatePilarPDF = (pilarNumber: number) => {
  const doc = new jsPDF('p', 'mm', 'a4');
  
  // Configurações básicas
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 20;
  let yPosition = margin;
  
  // Função auxiliar para adicionar texto com quebra de linha
  const addText = (text: string, fontSize: number, isBold: boolean = false, color: string = '#000000') => {
    doc.setFontSize(fontSize);
    doc.setFont('helvetica', isBold ? 'bold' : 'normal');
    doc.setTextColor(color);
    
    const textLines = doc.splitTextToSize(text, pageWidth - 2 * margin);
    textLines.forEach((line: string) => {
      if (yPosition > pageHeight - margin) {
        doc.addPage();
        yPosition = margin;
      }
      doc.text(line, margin, yPosition);
      yPosition += fontSize * 0.5;
    });
    yPosition += 5; // Espaço extra entre seções
  };

  // Função auxiliar para adicionar cabeçalho colorido
  const addHeader = (title: string, subtitle: string, color: [number, number, number]) => {
    // Fundo colorido
    doc.setFillColor(color[0], color[1], color[2]);
    doc.rect(0, 0, pageWidth, 40, 'F');
    
    // Texto branco
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text(title, pageWidth / 2, 20, { align: 'center' });
    
    doc.setFontSize(12);
    doc.setFont('helvetica', 'normal');
    doc.text(subtitle, pageWidth / 2, 30, { align: 'center' });
    
    yPosition = 50;
    doc.setTextColor(0, 0, 0); // Voltar para preto
  };

  switch (pilarNumber) {
    case 1:
      addHeader('PILAR 1 - SERVIÇOS MÉDICOS', 'Guia Completo de Melhoria e Otimização', [102, 126, 234]);
      
      addText('DIAGNÓSTICO DOS PRINCIPAIS PROBLEMAS', 16, true);
      
      addText('1. Satisfação com Serviços de Plantão', 14, true);
      addText('Problema Identificado: Baixos níveis de satisfação podem indicar falhas na gestão de escalas, qualidade do atendimento ou comunicação.', 12);
      addText('• Insatisfação geralmente relacionada a sobrecarga de trabalho', 11);
      addText('• Falta de apoio administrativo adequado', 11);
      addText('• Recursos insuficientes para demanda', 11);
      
      addText('2. Problemas Operacionais Críticos', 14, true);
      addText('• Furo ou atraso na escala: Impacta diretamente a continuidade do cuidado', 11);
      addText('• Dificuldade em encontrar médicos: Reduz capacidade de resposta', 11);
      addText('• Mão de obra desqualificada: Compromete qualidade assistencial', 11);
      addText('• Comunicação ineficiente: Gera retrabalho e erros', 11);
      
      addText('3. Experiência do Paciente', 14, true);
      addText('• Demora no atendimento: Principal causa de insatisfação', 11);
      addText('• Atendimento pouco humanizado: Impacta percepção de qualidade', 11);
      addText('• Falta de explicação clara: Reduz confiança e adesão', 11);
      
      addText('SOLUÇÕES ESTRATÉGICAS', 16, true);
      
      addText('Gestão de Escalas e Recursos Humanos', 14, true);
      addText('✓ Implementar sistema digital de gestão de escalas com notificações automáticas', 11);
      addText('✓ Criar banco de plantonistas de reserva para cobrir ausências', 11);
      addText('✓ Estabelecer processo de comunicação padronizado para mudanças de escala', 11);
      addText('✓ Implementar sistema de bonificação por disponibilidade', 11);
      
      addText('Qualificação e Capacitação', 14, true);
      addText('✓ Programa de integração obrigatório para novos médicos', 11);
      addText('✓ Treinamentos mensais em protocolos específicos da instituição', 11);
      addText('✓ Sistema de mentoria com médicos seniores', 11);
      addText('✓ Avaliação contínua de competências técnicas', 11);
      
      addText('INDICADORES DE ACOMPANHAMENTO', 16, true);
      addText('KPIs Essenciais:', 14, true);
      addText('• Taxa de cobertura de escalas: > 98%', 11);
      addText('• Tempo médio de resposta emergencial: < 10 minutos', 11);
      addText('• Índice de satisfação dos médicos: > 80%', 11);
      addText('• NPS dos pacientes: > 50', 11);
      addText('• Taxa de rotatividade médica: < 15% ao ano', 11);
      
      break;

    case 2:
      addHeader('PILAR 2 - PROTOCOLOS DE ATENDIMENTO', 'Estruturação e Padronização da Assistência Médica', [17, 153, 142]);
      
      addText('DIAGNÓSTICO DA SITUAÇÃO ATUAL', 16, true);
      
      addText('1. Existência de Protocolos Médicos', 14, true);
      addText('Situação Crítica: Ausência ou deficiência de protocolos estruturados compromete a padronização do atendimento.', 12);
      addText('• Variabilidade excessiva na conduta médica', 11);
      addText('• Dificuldade na tomada de decisões em emergências', 11);
      addText('• Falta de guidelines claros para situações específicas', 11);
      
      addText('2. Atualização e Base Científica', 14, true);
      addText('• Protocolos desatualizados: Não refletem evidências científicas recentes', 11);
      addText('• Falta de revisão periódica: Risco de práticas obsoletas', 11);
      addText('• Ausência de comitê científico: Não há responsáveis pela atualização', 11);
      
      addText('3. Monitoramento e Adesão', 14, true);
      addText('• Ausência de indicadores: Não há como medir adesão aos protocolos', 11);
      addText('• Falta de auditoria clínica: Não há verificação da implementação', 11);
      addText('• Não há feedback: Médicos não recebem retorno sobre performance', 11);
      
      addText('SOLUÇÕES ESTRATÉGICAS', 16, true);
      
      addText('Desenvolvimento de Protocolos Clínicos', 14, true);
      addText('✓ Formar comitê multidisciplinar para desenvolvimento de protocolos', 11);
      addText('✓ Mapear todos os fluxos assistenciais prioritários', 11);
      addText('✓ Desenvolver protocolos baseados em evidências científicas atuais', 11);
      addText('✓ Criar biblioteca digital de protocolos acessível 24/7', 11);
      
      addText('Protocolos Essenciais a Desenvolver:', 14, true);
      addText('• Emergências Cardiovasculares: IAM, AVC, PCR, Arritmias', 11);
      addText('• Emergências Respiratórias: Asma, DPOC, Pneumonia, Embolia', 11);
      addText('• Emergências Neurológicas: AVC, TCE, Convulsões, Coma', 11);
      addText('• Emergências Abdominais: Abdome agudo, Hemorragias, Obstruções', 11);
      addText('• Sepse e Infecções: Identificação precoce, Bundle treatment', 11);
      
      addText('INDICADORES DE PERFORMANCE', 16, true);
      addText('• Taxa de adesão aos protocolos: > 90%', 11);
      addText('• Tempo médio para início do tratamento adequado: < 15 minutos', 11);
      addText('• Variabilidade na conduta médica: < 10%', 11);
      addText('• Redução no número de exames por paciente: 15-20%', 11);
      
      break;

    case 3:
      addHeader('PILAR 3 - EDUCAÇÃO MÉDICA CONTINUADA', 'Desenvolvimento e Capacitação Profissional Contínua', [255, 107, 107]);
      
      addText('DIAGNÓSTICO DAS NECESSIDADES EDUCACIONAIS', 16, true);
      
      addText('1. Ausência de Treinamentos Regulares', 14, true);
      addText('Impacto Crítico: Falta de atualização profissional compromete a qualidade assistencial e segurança do paciente.', 12);
      addText('• Conhecimento desatualizado em relação às evidências científicas', 11);
      addText('• Variabilidade de competências entre os profissionais', 11);
      addText('• Redução da confiança da equipe em situações complexas', 11);
      
      addText('2. Desalinhamento com Protocolos Institucionais', 14, true);
      addText('• Falta de padronização: Cada médico segue sua própria prática', 11);
      addText('• Resistência a mudanças: Dificuldade em adotar novos protocolos', 11);
      addText('• Comunicação deficiente: Protocolos não são adequadamente disseminados', 11);
      
      addText('3. Deficiências em Competências Específicas', 14, true);
      addText('Foco: Intubação e Procedimentos Críticos', 12, true);
      addText('• Dificuldades técnicas em procedimentos de emergência', 11);
      addText('• Falta de prática regular e simulação', 11);
      addText('• Ansiedade e insegurança em situações críticas', 11);
      
      addText('PROGRAMA ABRANGENTE DE EDUCAÇÃO CONTINUADA', 16, true);
      
      addText('Estrutura do Programa de Treinamento', 14, true);
      addText('✓ Implementar cronograma trimestral obrigatório de capacitação', 11);
      addText('✓ Criar plataforma digital de ensino (LMS)', 11);
      addText('✓ Estabelecer sistema de créditos educacionais internos', 11);
      addText('✓ Desenvolver avaliações pré e pós-treinamento', 11);
      
      addText('Módulos de Treinamento Essenciais', 14, true);
      addText('BÁSICO - Fundamentos da Medicina de Emergência:', 12, true);
      addText('• Suporte Básico de Vida (BLS)', 11);
      addText('• Princípios de triagem e priorização', 11);
      addText('• Protocolos básicos de emergência', 11);
      
      addText('INTERMEDIÁRIO - Competências Clínicas Avançadas:', 12, true);
      addText('• Suporte Avançado de Vida (ACLS)', 11);
      addText('• Procedimentos invasivos e intubação', 11);
      addText('• Interpretação de exames complementares', 11);
      
      addText('Programa Específico: Competências em Intubação', 14, true);
      addText('• Treinamento Anatômico: Revisão detalhada da anatomia das vias aéreas', 11);
      addText('• Técnicas Avançadas: Intubação difícil, vias aéreas alternativas', 11);
      addText('• Simulação Intensiva: Prática em manequins de alta fidelidade', 11);
      addText('• Mentorship: Acompanhamento por anestesiologista senior', 11);
      
      addText('INDICADORES DE EDUCAÇÃO E DESENVOLVIMENTO', 16, true);
      addText('• Taxa de participação em treinamentos: > 95%', 11);
      addText('• Pontuação média em avaliações: > 85%', 11);
      addText('• Taxa de sucesso em intubação: > 95%', 11);
      addText('• Redução de eventos adversos: 25%', 11);
      
      break;
  }

  // Rodapé
  const footerY = pageHeight - 15;
  doc.setFontSize(10);
  doc.setTextColor(128, 128, 128);
  doc.text('DashVision Healthcare Solutions - Transformando a gestão hospitalar', pageWidth / 2, footerY, { align: 'center' });

  return doc;
};

// Função para gerar e baixar o PDF
export const downloadPilarPDF = (pilarNumber: number) => {
  const doc = generatePilarPDF(pilarNumber);
  const fileName = `Pilar${pilarNumber}-GuiaDeMelhoria.pdf`;
  doc.save(fileName);
};

// Função para gerar todos os PDFs
export const downloadAllPilarPDFs = () => {
  for (let i = 1; i <= 3; i++) {
    setTimeout(() => {
      downloadPilarPDF(i);
    }, i * 1000); // Delay de 1 segundo entre downloads
  }
};
