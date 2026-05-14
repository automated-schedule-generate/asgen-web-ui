import { Clock, Settings, Zap } from 'lucide-react';
import React from 'react';

const features = [
  {
    icon: <Clock className="text-blue-500" size={32} />,
    title: 'Economia de Tempo',
    desc: 'Diminui significativamente o tempo gasto na criação manual de horários.',
  },
  {
    icon: <Zap className="text-indigo-500" size={32} />,
    title: 'Redução de Conflitos',
    desc: 'Reduz conflitos de horários entre disciplinas, professores e turmas.',
  },
  {
    icon: <Settings className="text-cyan-500" size={32} />,
    title: 'Gestão Simples',
    desc: 'Interface simples para cadastro e visualização dos horários.',
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="py-24 bg-slate-100/50 border-y border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
          Vantagens
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Por que usar o ASGEN?
        </h2>
        <p className="text-slate-500 mb-16 italic">
          Transforme o processo de criação de horários com tecnologia
          inteligente
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center text-center transition-all hover:shadow-md hover:-translate-y-1 group"
            >
              <div className="mb-6 bg-slate-50 p-4 rounded-full group-hover:scale-110 transition-transform">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 leading-relaxed text-sm max-w-[240px]">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
