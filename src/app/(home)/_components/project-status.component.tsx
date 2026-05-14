import { CheckCircle, School, TrendingUp } from 'lucide-react';
import React from 'react';

const statusItems = [
  {
    icon: <CheckCircle className="text-blue-600" size={32} />,
    title: 'Validação Técnica',
    desc: 'Sistema em fase de testes e aprimoramento contínuo da plataforma.',
  },
  {
    icon: <TrendingUp className="text-indigo-600" size={32} />,
    title: 'Desenvolvimento Ativo',
    desc: 'Implementação e refinamento de algoritmos genéticos evolutivos.',
  },
  {
    icon: <School className="text-cyan-600" size={32} />,
    title: 'Pesquisa Acadêmica',
    desc: 'Projeto desenvolvido com rigor metodológico avançado no IFPE.',
  },
];

export function ProjectStatus() {
  return (
    <section className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <span className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-4 block">
          Status Atual
        </span>
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight">
          Projeto Acadêmico em Desenvolvimento
        </h2>
        <p className="text-slate-500 mb-16 max-w-2xl mx-auto">
          O ASGEN encontra-se em fase de desenvolvimento e validação
          institucional.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {statusItems.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <div className="w-16 h-16 bg-blue-50 flex items-center justify-center rounded-2xl mx-auto mb-6">
                {item.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
