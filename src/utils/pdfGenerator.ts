import { jsPDF } from 'jspdf';

export const generatePDF = (formData: any, resultado: any, questoes: any[]) => {
  const doc = new jsPDF();
  
  // Configurações do documento
  doc.setFont("helvetica");
  doc.setFontSize(16);
  
  // Cabeçalho
  doc.text("Relatório de Diagnóstico NR1", 105, 20, { align: "center" });
  
  // Data e hora
  const dataHora = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' });
  doc.setFontSize(12);
  doc.text(`Data/Hora: ${dataHora}`, 20, 40);

  // Dados do formulário
  doc.text(`Nome: ${formData.nome}`, 20, 50);
  doc.text(`Email: ${formData.email}`, 20, 60);
  doc.text(`Empresa: ${formData.empresa}`, 20, 70);
  doc.text(`Telefone: ${formData.telefone}`, 20, 80);

  // ... resto do código de geração do PDF ...

  return doc;
};
