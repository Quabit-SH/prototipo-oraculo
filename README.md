# 🔮 Protótipo Oráculo Espelho da Alma

Protótipo funcional baseado no site [Metafísica da Casa](https://www.metafisicadacasa.com.br/), implementado com React + TypeScript + Gemini AI para consultas autênticas do I Ching.

## 🚀 Setup Rápido (Teste Local)

### 1. Clonar o repositório
```bash
git clone https://github.com/Quabit-SH/prototipo-oraculo.git
cd prototipo-oraculo
```

### 2. Instalar dependências
```bash
npm install
```

### 3. Configurar API Key do Gemini
```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar .env e adicionar sua chave
# VITE_GEMINI_API_KEY=sua-chave-aqui
```

**Como obter a chave gratuita**:
1. Acesse: https://aistudio.google.com/app/apikey
2. Faça login com Google
3. Clique em "Create API Key"
4. Copie e cole no arquivo `.env`

### 4. Iniciar servidor de desenvolvimento
```bash
npm run dev
```

### 5. Abrir no navegador
```
http://localhost:3000/oraculo
```

## 🎯 URLs do Protótipo

- **Homepage**: `http://localhost:3000/oraculo`
- **Consulta**: `http://localhost:3000/oraculo/consulta`
- **Área específica**: `http://localhost:3000/oraculo/consulta?area=carreira`

## 🧪 Teste Rápido

1. Acesse: http://localhost:3000/oraculo
2. Clique em "Carreira" ou "Iniciar consulta"
3. Digite data: `1990-05-15`
4. Escreva pergunta: `"Devo aceitar a nova proposta de trabalho?"`
5. Aguarde ~5 segundos
6. Veja o hexagrama calculado e as 3 camadas de orientação

## ✨ Features

### ✅ Implementado

- **Homepage Premium**
  - Hero section com símbolo Yin-Yang ☯
  - Seção "Como o Oráculo Funciona"
  - Grid interativo com 8 áreas da vida
  - Testimonials profissionais
  - Design glassmorphism com tema dark

- **Sistema de Consulta com IA**
  - Fluxo multi-etapas interativo
  - Integração real com Gemini AI
  - 64 hexagramas autênticos do I Ching
  - Cálculo temporal determinístico
  - Resposta estruturada em 3 níveis:
    - 🧘 **Filosófico**: Sabedoria profunda do Tao
    - ✨ **Metafísico**: Energias e sincronicidades
    - 🎯 **Prático**: Ações concretas a tomar

- **Design & UX**
  - Animações com Framer Motion
  - 100% responsivo (mobile/desktop)
  - Loading states profissionais
  - Error handling robusto

## 📦 Stack Técnica

- **Frontend**: React 19 + TypeScript
- **Styling**: Tailwind CSS 4.1
- **Animações**: Framer Motion 12.23
- **IA**: Google Gemini 2.0 Flash Exp
- **Routing**: React Router DOM 7.14
- **Icons**: Lucide React

## 📊 Estrutura do Projeto

```
src/
├── pages/
│   ├── OracleHome.tsx          # Homepage do oráculo (261 linhas)
│   └── OracleConsultation.tsx  # Fluxo de consulta (401 linhas)
├── lib/
│   └── oracleApi.ts            # IA + I Ching (224 linhas)
└── main.tsx                     # Rotas
```

## 🔧 Comandos Disponíveis

```bash
# Desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview da build
npm run preview

# Lint
npm run lint
```

## 📝 Documentação Completa

Para documentação técnica detalhada, consulte:
- [ORACULO_README.md](./ORACULO_README.md) - Guia completo de uso
- [QUA-37_IMPLEMENTACAO_ORACULO.md](./QUA-37_IMPLEMENTACAO_ORACULO.md) - Detalhes técnicos

## 💰 Custos (Gemini API)

### Free Tier
- **Limite**: 1.500 requests/dia
- **Rate**: 15 requests/minuto
- **Custo**: Gratuito

### Uso Estimado
- **Tokens/consulta**: ~500-800
- **Tempo de resposta**: 3-5 segundos

## 🎨 Áreas da Vida

1. **Carreira** - Trabalho, escolhas profissionais, direção de vida
2. **Espiritualidade** - Sentido, valores, consciência, propósito
3. **Saúde & Família** - Vitalidade, equilíbrio, vínculos de origem
4. **Prosperidade** - Recursos, sustento, trocas materiais
5. **Fama & Sucesso** - Visibilidade, reputação, expressão pessoal
6. **Relacionamentos** - Parcerias afetivas, vínculos significativos
7. **Criatividade & Filhos** - Criação, projetos, prazer, legado
8. **Viagens** - Movimento, amigos, novas experiências

## 🔮 Como Funciona o I Ching

### Cálculo de Hexagrama

O sistema calcula o hexagrama baseado em:
- Dia do ano atual
- Data de nascimento do consulente
- Hora da consulta
- Hash da pergunta

```typescript
seed = (
  dayOfYear + 
  birthDay + 
  birthMonth + 
  currentHour + 
  hash(question)
) % 64
```

**Resultado**: Número determinístico de 1 a 64 (mesma entrada = mesmo hexagrama)

### Integração com IA

A IA Gemini recebe:
1. Área da vida escolhida
2. Hexagrama calculado
3. Pergunta do usuário

E retorna resposta estruturada em 3 níveis de profundidade.

## 🚨 Troubleshooting

### Erro: "API Key não configurada"
```bash
# Verifique se o arquivo .env existe
ls -la .env

# Verifique o conteúdo
cat .env | grep VITE_GEMINI_API_KEY

# Reinicie o servidor após editar
npm run dev
```

### Erro: "Não foi possível consultar o oráculo"
1. Verifique conexão com internet
2. Teste a API key em: https://aistudio.google.com/
3. Abra o console do navegador (F12) para detalhes

### Servidor não inicia
```bash
# Limpe e reinstale
rm -rf node_modules package-lock.json
npm install
npm run dev
```

## 🎯 Próximos Passos Sugeridos

- [ ] Autenticação para salvar histórico
- [ ] Integração com Supabase
- [ ] Sistema de favoritos
- [ ] Compartilhamento de consultas
- [ ] Export para PDF
- [ ] Tema light/dark toggle
- [ ] PWA (Progressive Web App)

## 📞 Suporte

**Repositório**: https://github.com/Quabit-SH/prototipo-oraculo  
**Issue Original**: QUA-37  
**Status**: ✅ Completo  
**Data**: 2026-04-29  
**Desenvolvido por**: Quabit Software House

## 🔗 Links Úteis

- **Site Original**: https://www.metafisicadacasa.com.br/
- **Gemini AI Studio**: https://aistudio.google.com/
- **I Ching (Wikipedia)**: https://pt.wikipedia.org/wiki/I_Ching

---

**🔮 Protótipo 100% funcional e pronto para demonstração!**
