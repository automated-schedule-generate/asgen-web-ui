import { CheckCircle } from 'lucide-react';
import React from 'react';

export function About() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <div className="relative">
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="Gestão Escolar"
              className="w-full h-auto"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-2xl shadow-xl flex items-center space-x-4">
            <div className="bg-blue-100 p-3 rounded-xl text-blue-600">
              <CheckCircle size={24} />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-400 uppercase tracking-tighter">
                Status
              </p>
              <p className="text-xl font-bold text-slate-800 tracking-tight">
                Otimizado
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <span className="text-blue-600 font-bold tracking-widest uppercase text-sm">
            SOBRE O PROJETO
          </span>
          <h2 className="text-4xl font-bold text-slate-900 leading-tight">
            O que é o <span className="text-blue-600">ASGEN?</span>
          </h2>
          <div className="space-y-4">
            <p className="text-lg text-slate-600 leading-relaxed font-semibold">
              Projeto acadêmico: organização de grades de horários
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              O ASGEN é um sistema inteligente desenvolvido como projeto
              acadêmico no IFPE Campus Igarassu, especializado na geração
              automática e inteligente de grades de horários acadêmicos. Por
              meio de <strong>algoritmos genéticos</strong>, o sistema resolve
              restrições como a disponibilidade e carga horária dos professores,
              gerando horários otimizados automaticamente, com possibilidade de
              ajustes manuais sempre que necessário.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
