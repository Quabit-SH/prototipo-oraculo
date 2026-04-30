import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Sparkles, AlertCircle } from 'lucide-react';
import { consultOracle, type OracleResponse } from '../lib/oracleApi';

type Step = 'area' | 'birthdate' | 'question' | 'consulting' | 'result';

interface Area {
  id: string;
  name: string;
  description: string;
}

const areas: Area[] = [
  { id: 'carreira', name: 'Carreira', description: 'Orientação profissional' },
  { id: 'espiritualidade', name: 'Espiritualidade', description: 'Conexão espiritual' },
  { id: 'saude_familia', name: 'Saúde & Família', description: 'Bem-estar familiar' },
  { id: 'prosperidade', name: 'Prosperidade', description: 'Abundância material' },
  { id: 'fama', name: 'Fama', description: 'Reconhecimento social' },
  { id: 'relacionamentos', name: 'Relacionamentos', description: 'Vínculos afetivos' },
  { id: 'criatividade', name: 'Criatividade', description: 'Expressão artística' },
  { id: 'viagens', name: 'Viagens', description: 'Novos horizontes' }
];

export default function OracleConsultation() {
  const [searchParams] = useSearchParams();
  const [step, setStep] = useState<Step>('area');
  const [selectedArea, setSelectedArea] = useState<string>('');
  const [birthdate, setBirthdate] = useState<string>('');
  const [question, setQuestion] = useState<string>('');
  const [isConsulting, setIsConsulting] = useState(false);
  const [response, setResponse] = useState<OracleResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const areaParam = searchParams.get('area');
    if (areaParam && areas.some(a => a.id === areaParam)) {
      setSelectedArea(areaParam);
      setStep('birthdate');
    }
  }, [searchParams]);

  const handleAreaSelect = (areaId: string) => {
    setSelectedArea(areaId);
    setStep('birthdate');
  };

  const handleBirthdateSubmit = () => {
    if (birthdate) {
      setStep('question');
    }
  };

  const handleQuestionSubmit = async () => {
    if (question.trim()) {
      setStep('consulting');
      setIsConsulting(true);
      setError('');

      try {
        const oracleResponse = await consultOracle({
          area: selectedArea,
          birthdate,
          question
        });

        setResponse(oracleResponse);
        setStep('result');
      } catch (err) {
        console.error('Erro ao consultar oráculo:', err);
        setError('Não foi possível consultar o oráculo. Tente novamente.');
        setStep('question');
      } finally {
        setIsConsulting(false);
      }
    }
  };

  const handleNewConsultation = () => {
    setStep('area');
    setSelectedArea('');
    setBirthdate('');
    setQuestion('');
    setResponse(null);
    setError('');
  };

  const selectedAreaData = areas.find(a => a.id === selectedArea);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <Link
          to="/oraculo"
          className="inline-flex items-center gap-2 text-purple-300 hover:text-purple-100 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Voltar
        </Link>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <AnimatePresence mode="wait">
          {/* Step 1: Área */}
          {step === 'area' && (
            <motion.div
              key="area"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <span className="text-white text-4xl">☯</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Escolha uma área da vida
              </h1>
              <p className="text-purple-200 mb-8">
                Selecione o aspecto da sua vida sobre o qual deseja orientação
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                {areas.map((area) => (
                  <button
                    key={area.id}
                    onClick={() => handleAreaSelect(area.id)}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-left hover:bg-white/20 transition-all hover:scale-105"
                  >
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {area.name}
                    </h3>
                    <p className="text-purple-200 text-sm">
                      {area.description}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Data de Nascimento */}
          {step === 'birthdate' && (
            <motion.div
              key="birthdate"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <span className="text-white text-4xl">☯</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Área: {selectedAreaData?.name}
              </h1>
              <p className="text-purple-200 mb-8">
                Informe sua data de nascimento para cálculos temporais personalizados
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 max-w-md mx-auto">
                <label className="block text-left mb-2 text-purple-200 font-medium">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  value={birthdate}
                  onChange={(e) => setBirthdate(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-purple-300/30 focus:border-purple-400 focus:outline-none mb-6"
                  max={new Date().toISOString().split('T')[0]}
                />
                <button
                  onClick={handleBirthdateSubmit}
                  disabled={!birthdate}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Pergunta */}
          {step === 'question' && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                <span className="text-white text-4xl">☯</span>
              </div>
              <h1 className="text-3xl font-bold text-white mb-4">
                Sua pergunta
              </h1>
              <p className="text-purple-200 mb-8">
                Formule sua pergunta ou descreva a situação sobre a qual busca orientação
              </p>

              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8">
                {error && (
                  <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-red-300 flex-shrink-0 mt-0.5" />
                    <p className="text-red-200 text-sm">{error}</p>
                  </div>
                )}
                <label className="block text-left mb-2 text-purple-200 font-medium">
                  Descreva sua situação ou pergunta
                </label>
                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ex: Estou em dúvida sobre aceitar uma nova proposta de trabalho..."
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-purple-300/30 focus:border-purple-400 focus:outline-none mb-6 min-h-32 resize-none placeholder:text-purple-300/50"
                  maxLength={500}
                />
                <div className="flex justify-between items-center mb-6">
                  <span className="text-sm text-purple-300">
                    {question.length}/500 caracteres
                  </span>
                </div>
                <button
                  onClick={handleQuestionSubmit}
                  disabled={!question.trim() || question.length < 10}
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  Consultar Oráculo
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Consultando */}
          {step === 'consulting' && (
            <motion.div
              key="consulting"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center"
              >
                <span className="text-white text-5xl">☯</span>
              </motion.div>
              <h2 className="text-2xl font-bold text-white mb-4">
                Consultando o Oráculo...
              </h2>
              <p className="text-purple-200">
                As energias do I Ching estão sendo calculadas para sua situação
              </p>
            </motion.div>
          )}

          {/* Step 5: Resultado */}
          {step === 'result' && response && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="text-center mb-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Hexagrama {response.hexagram}
                </h1>
                <p className="text-xl text-purple-200">
                  {response.hexagramName}
                </p>
              </div>

              <div className="space-y-6">
                {/* Filosófico */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold text-purple-300 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center text-white text-sm">1</span>
                    Nível Filosófico
                  </h3>
                  <p className="text-purple-100 leading-relaxed">
                    {response.philosophical}
                  </p>
                </motion.div>

                {/* Metafísico */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold text-pink-300 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm">2</span>
                    Nível Metafísico
                  </h3>
                  <p className="text-purple-100 leading-relaxed">
                    {response.metaphysical}
                  </p>
                </motion.div>

                {/* Prático */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
                >
                  <h3 className="text-xl font-semibold text-emerald-300 mb-3 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-white text-sm">3</span>
                    Nível Prático
                  </h3>
                  <p className="text-purple-100 leading-relaxed">
                    {response.practical}
                  </p>
                </motion.div>
              </div>

              <div className="text-center mt-8">
                <button
                  onClick={handleNewConsultation}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-8 py-3 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all font-semibold"
                >
                  Nova Consulta
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
