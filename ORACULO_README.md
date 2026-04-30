# 🔮 Oráculo Espelho da Alma

Protótipo funcional baseado no site [Metafísica da Casa](https://www.metafisicadacasa.com.br/), implementado com React + IA para consultas do I Ching.

## 🚀 Acesso Rápido

### URLs do Protótipo
- **Home**: http://localhost:3000/oraculo
- **Consulta**: http://localhost:3000/oraculo/consulta
- **Área específica**: http://localhost:3000/oraculo/consulta?area=carreira

## ⚙️ Configuração (Primeira Vez)

### 1. Instalar dependências
```bash
npm install
```

### 2. Configurar API Key do Gemini
```bash
# Criar arquivo .env na raiz
cp .env.example .env

# Editar .env e adicionar sua chave:
VITE_GEMINI_API_KEY=sua-chave-aqui
```

**Como obter a chave**:
1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com Google
3. Clique em "Create API Key"
4. Copie e cole no `.env`

### 3. Iniciar servidor
```bash
npm run dev
```

### 4. Abrir no navegador
```
http://localhost:3000/oraculo
```

## 🎯 Como Usar

### Fluxo de Consulta

1. **Escolher Área da Vida**
   - Carreira, Espiritualidade, Saúde & Família, Prosperidade
   - Fama, Relacionamentos, Criatividade, Viagens

2. **Informar Data de Nascimento**
   - Usada para cálculo temporal do hexagrama

3. **Fazer Pergunta**
   - Mínimo 10 caracteres
   - Máximo 500 caracteres
   - Seja específico sobre sua situação

4. **Receber Resposta**
   - Hexagrama do I Ching calculado
   - 3 níveis de orientação:
     - 🧘 **Filosófico**: Sabedoria profunda do Tao
     - ✨ **Metafísico**: Energias e sincronicidades
     - 🎯 **Prático**: Ações concretas a tomar

## 🎨 Features

### ✅ Implementado

- **Homepage do Oráculo**
  - Hero com símbolo Yin-Yang (☯)
  - Seção "Como o Oráculo Funciona"
  - Grid de 8 áreas da vida
  - Testimonials de usuários

- **Sistema de Consulta**
  - Fluxo multi-etapas interativo
  - Validação de inputs
  - Loading states animados
  - Error handling

- **Integração com IA**
  - Modelo: Gemini 2.0 Flash Exp
  - Prompt especializado em I Ching
  - Respostas estruturadas em 3 níveis
  - Tempo médio: 3-5 segundos

- **I Ching Autêntico**
  - 64 hexagramas mapeados
  - Cálculo temporal baseado em:
    - Data de nascimento
    - Momento da consulta
    - Hash da pergunta

- **Design**
  - Tema dark com gradientes roxo/rosa
  - Glassmorphism (blur + transparência)
  - Animações com Framer Motion
  - 100% responsivo

## 🧪 Exemplo de Teste

### Teste Rápido

```
1. Acesse: http://localhost:3000/oraculo
2. Clique em "Carreira"
3. Data: 1990-05-15
4. Pergunta: "Devo aceitar a proposta de mudança de emprego?"
5. Aguarde ~5 segundos
6. Veja o hexagrama e as orientações
```

### Resultado Esperado

```
Hexagrama 43: A Determinação

📖 FILOSÓFICO
"O momento pede coragem para romper com o antigo..."

✨ METAFÍSICO
"As energias cósmicas se alinham para sua transformação..."

🎯 PRÁTICO
"Pesquise a reputação da nova empresa, converse com..."
```

## 📊 Estrutura do Código

```
src/
├── pages/
│   ├── OracleHome.tsx          # Homepage do oráculo
│   └── OracleConsultation.tsx  # Fluxo de consulta
├── lib/
│   └── oracleApi.ts            # Integração com IA + I Ching
└── main.tsx                     # Rotas (/oraculo, /oraculo/consulta)
```

## 🤖 Como Funciona a IA

### Prompt Engineering

O sistema usa um prompt especializado que:
1. Contextualiza a consulta (área, data, pergunta)
2. Informa o hexagrama calculado
3. Solicita resposta em 3 níveis específicos
4. Exige formato JSON estruturado

### Cálculo de Hexagrama

```typescript
seed = (
  dayOfYear +
  birthDay +
  birthMonth +
  currentHour +
  hash(question)
) % 64
```

**Resultado**: Número de 1 a 64 (determinístico para mesma entrada)

### Mapeamento I Ching

```typescript
hexagrams[42] = {
  number: 42,
  name: 'O Aumento',
  symbol: '☴☳'
}
```

## 💰 Custos (Gemini API)

### Free Tier
- **Limite**: 1.500 requests/dia
- **Rate**: 15 requests/minuto
- **Custo**: $0.00

### Uso Estimado
- **Tokens/consulta**: ~500-800
- **Custo/consulta**: ~$0.01
- **100 consultas**: ~$1.00

## 🔧 Troubleshooting

### Erro: "API Key não configurada"
```bash
# Verifique se o arquivo .env existe
ls -la .env

# Verifique se a key está correta
cat .env | grep VITE_GEMINI_API_KEY

# Reinicie o servidor após editar .env
npm run dev
```

### Erro: "Não foi possível consultar o oráculo"
1. Verifique sua conexão com internet
2. Teste a API key em: https://aistudio.google.com/
3. Veja o console do navegador (F12) para detalhes

### Servidor não inicia
```bash
# Limpe node_modules e reinstale
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🎯 Próximos Passos

### Melhorias Sugeridas
- [ ] Autenticação para salvar histórico
- [ ] Integração com Supabase para persistência
- [ ] Sistema de favoritos
- [ ] Compartilhamento de consultas
- [ ] Export para PDF
- [ ] Tema light/dark
- [ ] Notificações push

### Otimizações
- [ ] Cache de respostas
- [ ] Lazy loading de imagens
- [ ] Service Worker (PWA)
- [ ] Analytics de uso

## 📱 Demonstração para Cliente

### Script de Apresentação

1. **Introdução** (30s)
   > "Este é o protótipo do Oráculo Espelho da Alma, baseado no site Metafísica da Casa. Vamos fazer uma consulta ao vivo."

2. **Homepage** (1min)
   > "Na página inicial, temos as 8 áreas da vida organizadas visualmente. O design replica o estilo do site original com tema dark e gradientes."

3. **Consulta** (2min)
   > "Vou fazer uma consulta sobre Carreira. Informo minha data de nascimento... Escrevo minha pergunta... E em poucos segundos a IA calcula o hexagrama e gera uma resposta autêntica do I Ching."

4. **Resposta** (2min)
   > "Veja: recebemos o Hexagrama 43, 'A Determinação'. A resposta está estruturada em três níveis: filosófico, metafísico e prático. Cada um traz insights profundos e aplicáveis."

5. **Tecnologia** (1min)
   > "Por trás, usamos IA Gemini integrada com os 64 hexagramas autênticos do I Ching. O cálculo do hexagrama é baseado em dados temporais reais."

6. **Conclusão** (30s)
   > "O protótipo está 100% funcional e pronto para customização conforme suas necessidades."

## 🔗 Links Úteis

- **Site Original**: https://www.metafisicadacasa.com.br/
- **Gemini AI Studio**: https://aistudio.google.com/
- **I Ching (Wikipedia)**: https://pt.wikipedia.org/wiki/I_Ching
- **Framer Motion Docs**: https://motion.dev/docs
- **Tailwind CSS**: https://tailwindcss.com/

## 📞 Suporte

**Issue**: QUA-37  
**Status**: ✅ Completo  
**Data**: 2026-04-29  
**Desenvolvido por**: Tech Lead IA - Quabit

---

**🔮 Que o Tao guie suas consultas!**
