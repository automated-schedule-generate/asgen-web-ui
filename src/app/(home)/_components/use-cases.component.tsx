import { BookOpen, Cpu, School } from 'lucide-react';
import React from 'react';

const useCases = [
  {
    icon: <School size={32} />,
    title: 'Universidades',
    desc: 'Organizar turmas teóricas e práticas considerando laboratórios específicos e disponibilidade de equipamentos.',
    tags: ['Gestão', 'Multicampi', 'Aulas Práticas'],
  },
  {
    icon: <Cpu size={32} />,
    title: 'Escolas Técnicas',
    desc: 'Adapte rapidamente aulas práticas, formato híbrido e necessidades altamente técnicas de infraestrutura laboratorial.',
    tags: ['Laboratórios', 'Híbrido', 'Rotação'],
  },
  {
    icon: <BookOpen size={32} />,
    title: 'Cursos Livres',
    desc: 'Crie horários dinâmicos para cursos de extensão e programas especiais com alta flexibilidade de turmas.',
    tags: ['Flexibilidade', 'Mudanças Rápidas'],
  },
];

export function UseCases() {
  return (
    <section className="py-24 bg-gradient-to-b from-[#03017D] to-[#020159] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-cyan-400 font-bold tracking-[0.2em] uppercase text-xs mb-4 block">
            Casos de Uso
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Perfeito para Qualquer Instituição
          </h2>
          <p className="text-blue-200/70 max-w-2xl mx-auto text-lg">
            O ASGEN adapta-se a diferentes cenários educacionais, resolvendo
            complexidades específicas de cada ambiente com precisão.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {useCases.map((item, idx) => (
            <div
              key={idx}
              className="group relative bg-white/5 border border-white/10 p-10 rounded-[2.5rem] hover:bg-white/10 transition-all duration-500 shadow-2xl flex flex-col items-center text-center overflow-hidden"
            >
              {/* Background Glow Effect */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-colors duration-500" />

              <div className="relative bg-gradient-to-br from-blue-500/40 to-cyan-500/40 w-20 h-20 rounded-3xl flex items-center justify-center text-white mb-8 group-hover:scale-110 transition-transform duration-500 shadow-lg">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold mb-4 group-hover:text-cyan-300 transition-colors">
                {item.title}
              </h3>

              <p className="text-blue-100/70 text-base leading-relaxed mb-8 max-w-[280px]">
                {item.desc}
              </p>

              <div className="flex flex-wrap gap-2 justify-center mt-auto">
                {item.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] uppercase tracking-wider font-bold text-cyan-200 bg-cyan-900/30 border border-cyan-500/20 px-4 py-1.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
