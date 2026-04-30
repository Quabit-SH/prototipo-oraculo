import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Sparkles,
  Heart,
  DollarSign,
  Award,
  Users,
  Palette,
  Plane
} from 'lucide-react';

const areas = [
  {
    id: 'carreira',
    name: 'Carreira',
    icon: Briefcase,
    description: 'Orientação para crescimento profissional',
    color: 'from-blue-500 to-blue-700'
  },
  {
    id: 'espiritualidade',
    name: 'Espiritualidade',
    icon: Sparkles,
    description: 'Conexão com o divino interior',
    color: 'from-purple-500 to-purple-700'
  },
  {
    id: 'saude_familia',
    name: 'Saúde & Família',
    icon: Heart,
    description: 'Bem-estar e vínculos familiares',
    color: 'from-green-500 to-green-700'
  },
  {
    id: 'prosperidade',
    name: 'Prosperidade',
    icon: DollarSign,
    description: 'Abundância e recursos materiais',
    color: 'from-emerald-500 to-emerald-700'
  },
  {
    id: 'fama',
    name: 'Fama',
    icon: Award,
    description: 'Reconhecimento e reputação',
    color: 'from-red-500 to-red-700'
  },
  {
    id: 'relacionamentos',
    name: 'Relacionamentos',
    icon: Users,
    description: 'Conexões amorosas e parcerias',
    color: 'from-pink-500 to-pink-700'
  },
  {
    id: 'criatividade',
    name: 'Criatividade',
    icon: Palette,
    description: 'Expressão artística e inovação',
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 'viagens',
    name: 'Viagens',
    icon: Plane,
    description: 'Novos horizontes e experiências',
    color: 'from-cyan-500 to-cyan-700'
  }
];

const testimonials = [
  {
    initial: 'M',
    text: 'A resposta foi profunda e certeira. Me ajudou a tomar uma decisão importante sobre minha carreira.',
    name: 'Marina S.'
  },
  {
    initial: 'R',
    text: 'Nunca tinha consultado o I Ching antes. Fiquei impressionado com a precisão das orientações.',
    name: 'Roberto L.'
  },
  {
    initial: 'J',
    text: 'As três camadas da resposta (filosófica, metafísica e prática) me deram uma visão completa.',
    name: 'Juliana M.'
  },
  {
    initial: 'C',
    text: 'Consulto semanalmente. Virou parte da minha rotina de reflexão e autoconhecimento.',
    name: 'Carlos P.'
  }
];

export default function OracleHome() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center">
            <span className="text-white text-xl">☯</span>
          </div>
          <h1 className="text-white text-xl font-semibold">Oráculo Espelho da Alma</h1>
        </div>
        <Link
          to="/oraculo/consulta"
          className="bg-gradient-to-r from-purple-500 to-pink-600 text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/50 transition-all"
        >
          Iniciar consulta
        </Link>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-purple-400 via-pink-500 to-purple-600 flex items-center justify-center shadow-2xl shadow-purple-500/50">
            <span className="text-white text-6xl">☯</span>
          </div>
          <h2 className="text-5xl font-bold text-white mb-6">
            Consultas Baseadas no I Ching
          </h2>
          <p className="text-xl text-purple-200 mb-8 max-w-2xl mx-auto">
            Receba orientações profundas combinando a sabedoria milenar do I Ching
            com cálculos temporais personalizados para sua jornada.
          </p>
          <a
            href="#como-funciona"
            className="text-purple-300 hover:text-purple-100 underline"
          >
            Saiba como funciona ↓
          </a>
        </motion.div>
      </section>

      {/* Como Funciona */}
      <section id="como-funciona" className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-white text-center mb-16">
          Como o Oráculo Funciona
        </h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              1
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Foco</h4>
            <p className="text-purple-200">
              Escolha uma das 8 áreas da vida e concentre-se em sua pergunta ou situação atual.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-pink-500 flex items-center justify-center text-white text-2xl font-bold">
              2
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Tempo</h4>
            <p className="text-purple-200">
              Informamos sua data de nascimento e o momento da consulta para cálculos temporais únicos.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 text-center"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-purple-500 flex items-center justify-center text-white text-2xl font-bold">
              3
            </div>
            <h4 className="text-xl font-semibold text-white mb-3">Orientação</h4>
            <p className="text-purple-200">
              Receba uma resposta em três níveis: filosófico, metafísico e prático para guiar seu caminho.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 8 Áreas da Vida */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-white text-center mb-16">
          Oito Áreas da Vida
        </h3>
        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {areas.map((area, index) => (
            <motion.div
              key={area.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Link
                to={`/oraculo/consulta?area=${area.id}`}
                className="block bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center hover:bg-white/20 transition-all hover:scale-105 group"
              >
                <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${area.color} flex items-center justify-center group-hover:shadow-lg transition-all`}>
                  <area.icon className="w-8 h-8 text-white" />
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">
                  {area.name}
                </h4>
                <p className="text-sm text-purple-200">
                  {area.description}
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container mx-auto px-4 py-20">
        <h3 className="text-3xl font-bold text-white text-center mb-16">
          Ecos da Experiência
        </h3>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                  {testimonial.initial}
                </div>
                <div>
                  <p className="text-purple-100 mb-3 italic">
                    "{testimonial.text}"
                  </p>
                  <p className="text-purple-300 text-sm">
                    — {testimonial.name}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-purple-300">
        <p>© 2026 Oráculo Espelho da Alma. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
