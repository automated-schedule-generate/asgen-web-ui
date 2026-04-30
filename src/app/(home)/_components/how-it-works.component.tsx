import { BookOpen, CheckCircle, Cpu, Settings } from 'lucide-react';
import React from 'react';

const steps = [
  {
    step: '01',
    title: 'Configuração',
    desc: 'Insira dados de professores, salas e turmas.',
    icon: <Settings size={24} />,
  },
  {
    step: '02',
    title: 'Processamento',
    desc: 'O algoritmo genético inicia as permutações.',
    icon: <Cpu size={24} />,
  },
  {
    step: '03',
    title: 'Validação',
    desc: 'O sistema valida restrições e evita conflitos.',
    icon: <CheckCircle size={24} />,
  },
  {
    step: '04',
    title: 'Exportação',
    desc: 'Gere PDFs e integrações com seu ERP.',
    icon: <BookOpen size={24} />,
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-24 max-w-7xl mx-auto px-6 text-center"
    >
      <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight italic">
        Como funciona o ASGEN
      </h2>
      <p className="text-slate-500 mb-16">
        Os 4 passos fundamentais para a geração automática da sua grade horária
      </p>

      <div className="grid md:grid-cols-4 gap-8">
        {steps.map((item, idx) => (
          <div key={idx} className="relative group">
            <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all group-hover:bg-[#03017D] group-hover:border-[#03017D]">
              <span className="text-5xl font-black text-slate-200 group-hover:text-white/20 absolute top-4 left-4 transition-colors">
                {item.step}
              </span>
              <div className="relative z-10 space-y-4">
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto group-hover:bg-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500 group-hover:text-blue-100 transition-colors">
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
