# Configuração Google Sheets no n8n - ESTRUTURA REORGANIZADA

## 🎯 NOVA ESTRUTURA DOS DADOS

O formulário agora envia os dados organizados em dois níveis:

### 📊 **Subgrupo `dados`** (vai para a planilha)
Contém todos os 47 campos que devem ser inseridos na planilha Google Sheets.

### 📧 **Campos externos** (não vão para planilha)
Contém dados auxiliares como PDF, email e compatibilidade.

---

## 🗂️ MAPEAMENTO PARA GOOGLE SHEETS

### No n8n, use: `{{$json.dados.CAMPO}}`

### Dados Básicos (Colunas A-G)
- `{{$json.dados.nome}}` → Coluna A
- `{{$json.dados.telefone}}` → Coluna B  
- `{{$json.dados.email}}` → Coluna C
- `{{$json.dados.hospital}}` → Coluna D
- `{{$json.dados.cidade}}` → Coluna E
- `{{$json.dados.uf}}` → Coluna F
- `{{$json.dados.dataHora}}` → Coluna G

### PILAR 1 - Questão 1 (Colunas H-I)
- `{{$json.dados.nivelSatisfacaoServicoMedicoPlantaoAtual}}` → Coluna H
- `{{$json.dados.pontosQ1}}` → Coluna I

### PILAR 1 - Questão 2 (Colunas J-Q)
- `{{$json.dados.furoOuAtrasoNaEscala}}` → Coluna J
- `{{$json.dados.pontosQ21}}` → Coluna K
- `{{$json.dados.dificuldadeEmEncontrarMedicoDisponivel}}` → Coluna L
- `{{$json.dados.pontosQ22}}` → Coluna M
- `{{$json.dados.maoDeObraDesqualificada}}` → Coluna N
- `{{$json.dados.pontosQ23}}` → Coluna O
- `{{$json.dados.comunicacaoIneficenteEntreCorpoClinicoEDirecao}}` → Coluna P
- `{{$json.dados.pontosQ24}}` → Coluna Q

### PILAR 1 - Questão 3 (Colunas R-X)
- `{{$json.dados.demoraNoAtendimento}}` → Coluna R
- `{{$json.dados.pontosQ31}}` → Coluna S
- `{{$json.dados.atendimentoPoucoHumanizado}}` → Coluna T
- `{{$json.dados.pontosQ32}}` → Coluna U
- `{{$json.dados.faltaDeExplicacaoClaraSobreDiagnosticoOuTratamento}}` → Coluna V
- `{{$json.dados.pontosQ33}}` → Coluna W

### PILAR 1 - Questão 4 (Colunas X-AI)
- `{{$json.dados.uti}}` → Coluna X
- `{{$json.dados.pontosQ41}}` → Coluna Y
- `{{$json.dados.pediatria}}` → Coluna Z
- `{{$json.dados.pontosQ42}}` → Coluna AA
- `{{$json.dados.emergencia}}` → Coluna AB
- `{{$json.dados.pontosQ43}}` → Coluna AC
- `{{$json.dados.obstetricia}}` → Coluna AD
- `{{$json.dados.pontosQ44}}` → Coluna AE
- `{{$json.dados.psiquiatria}}` → Coluna AF
- `{{$json.dados.pontosQ45}}` → Coluna AG
- `{{$json.dados.anestesiologia}}` → Coluna AH
- `{{$json.dados.pontosQ46}}` → Coluna AI

### PILAR 2 - Questões 5-8 (Colunas AJ-AQ)
- `{{$json.dados.existemProtocolosMedicosDescritosParaOsPrincipaisFluxosDeEmergencia}}` → Coluna AJ
- `{{$json.dados.pontosQ5}}` → Coluna AK
- `{{$json.dados.osProtocolosSaoAtualizadosComFrequenciaEBaseCientifica}}` → Coluna AL
- `{{$json.dados.pontosQ6}}` → Coluna AM
- `{{$json.dados.haIndicadoresQueMonitoramAadesaoDosMedicosAosProtocolos}}` → Coluna AN
- `{{$json.dados.pontosQ7}}` → Coluna AO
- `{{$json.dados.voceEstaSatisfeitoComAQuantidadeDeExamesSolicitadosNoPlantao}}` → Coluna AP
- `{{$json.dados.pontosQ8}}` → Coluna AQ

### PILAR 3 - Questões 9-12 (Colunas AR-AY)
- `{{$json.dados.existemTreinamentosRegularesTrimestraisParaAEquipeMedica}}` → Coluna AR
- `{{$json.dados.pontosQ9}}` → Coluna AS
- `{{$json.dados.aCapacitacaoDaEquipeEstaAlinhadaComOsProtocolosInstitucionais}}` → Coluna AT
- `{{$json.dados.pontosQ10}}` → Coluna AU
- `{{$json.dados.existeProgramaOuFerramentaDeEducacaoMedicaContinuada}}` → Coluna AV
- `{{$json.dados.pontosQ11}}` → Coluna AW
- `{{$json.dados.medicosIaEmergenciaOuUtiApresentamDificuldadeParaRealizarIntubacao}}` → Coluna AX
- `{{$json.dados.pontosQ12}}` → Coluna AY

### Resultados Finais (Colunas AZ-BI)
- `{{$json.dados.pilar1ServicosMedicos}}` → Coluna AZ
- `{{$json.dados.pilar2ProtocolosDeAtendimento}}` → Coluna BA
- `{{$json.dados.pilar3EducacaoMedicaContinuada}}` → Coluna BB
- `{{$json.dados.pontuacaoGeral}}` → Coluna BC
- `{{$json.dados.nivel}}` → Coluna BD
- `{{$json.dados.recomendacao}}` → Coluna BE
- `{{$json.dados.pdfRecomendado}}` → Coluna BF
- `{{$json.dados.tipo_formulario}}` → Coluna BG
- `{{$json.dados.pilar_menor}}` → Coluna BH
- `{{$json.dados.nota_menor}}` → Coluna BI

---

## ⚙️ CONFIGURAÇÃO NO N8N

### 🎯 **OPÇÃO RECOMENDADA: Google Sheets (Append)**

1. **Adicione nó "Google Sheets"** após o "Edit Fields"
2. **Configuração:**
   - **Operation:** Append
   - **Document ID:** ID da sua planilha
   - **Sheet:** Nome da aba
   - **Data Mode:** Define Below

3. **Configure campos automaticamente:**
   ```javascript
   // O n8n pode mapear todos os campos de uma vez usando:
   {{$json.dados}}
   
   // Ou mapear campo por campo:
   Coluna A: {{$json.dados.nome}}
   Coluna B: {{$json.dados.telefone}}
   Coluna C: {{$json.dados.email}}
   // ... continue para todos os 50 campos
   ```

### 📧 **Campos Externos Disponíveis** (para outros usos)
- `{{$json.respostas}}` (formato legado)
- `{{$json.pdfUrl}}`
- `{{$json.emailContent}}`
- `{{$json.email_personalizado}}`

---

## 🔄 **FACILIDADE DE USO**

✅ **Antes:** 56 campos misturados no body principal
✅ **Agora:** 50 campos organizados em `dados` + 4 campos auxiliares externos

🎯 **Para inserir na planilha:** Use apenas `{{$json.dados}}` (contém os 50 campos)
📧 **Para email/PDF:** Use os campos externos do nível principal

---

## 📋 **TESTE RÁPIDO**

1. Preencha o formulário de teste
2. Envie a avaliação  
3. No n8n, verifique que recebe:
   ```json
   {
     "dados": {
       "nome": "Hospital Teste",
       "telefone": "(11) 99999-9999",
       "email": "teste@hospital.com",
       "tipo_formulario": "Gestor Hospitalar",
       "pilar_menor": "Serviços Médicos",
       "nota_menor": 8,
       // ... todos os 50 campos da planilha
     },
     "respostas": "1-2 2.1-3 2.2-2...",
     "pdfUrl": "...",
     "emailContent": "...",
     "email_personalizado": "..."
   }
   ```
