import { Clock, Cpu, Play, School, Zap } from 'lucide-react';
import React from 'react';

interface HeroProps {
  onRegisterClick: () => void;
}

export function Hero({ onRegisterClick }: HeroProps) {
  return (
    <section
      className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-[#03017D] via-[#0D0A94] to-[#020159]"
      style={{ clipPath: 'polygon(0 0, 100% 0, 100% 90%, 0 100%)' }}
    >
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center z-10 py-20">
        <div className="space-y-8">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-tight tracking-tight">
            GERAÇÃO DE HORÁRIOS <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
              INTELIGENTE
            </span>
          </h1>

          <p className="text-xl text-blue-100/70 max-w-lg leading-relaxed">
            Elimine conflitos de horários com algoritmos genéticos.
            <span className="block mt-2 text-amber-400 font-semibold underline decoration-amber-400/30 underline-offset-4">
              +98% de aproveitamento de recursos institucionais.
            </span>
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <button
              onClick={onRegisterClick}
              className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-lg px-8 py-4 rounded-xl shadow-[0_10px_40px_-10px_rgba(6,182,212,0.5)] transition-all hover:scale-105 inline-block text-center"
            >
              CRIAR CONTA AGORA
            </button>
            <button className="flex items-center space-x-2 border-2 border-cyan-500/40 hover:border-cyan-500 text-white font-bold px-8 py-4 rounded-xl transition-all hover:bg-cyan-500/10">
              <Play size={20} className="fill-current" />
              <span>ASSISTIR DEMO</span>
            </button>
          </div>

          <div className="flex flex-wrap gap-8 pt-8 border-t border-white/10">
            <div className="flex items-center space-x-3 text-white">
              <School className="text-cyan-400" size={32} />
              <div>
                <div className="font-bold text-xl">IFPE</div>
                <div className="text-xs text-blue-200/60 uppercase tracking-widest">
                  Campus Igarassu
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <Clock className="text-cyan-400" size={32} />
              <div>
                <div className="font-bold text-xl">-95%</div>
                <div className="text-xs text-blue-200/60 uppercase tracking-widest">
                  Tempo Gasto
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-3 text-white">
              <Cpu className="text-cyan-400" size={32} />
              <div>
                <div className="font-bold text-xl">Projeto</div>
                <div className="text-xs text-blue-200/60 uppercase tracking-widest">
                  Acadêmico
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative hidden md:flex justify-center items-center">
          <div className="absolute -top-10 -left-5 w-40 h-40 bg-sky-500/20 rounded-full animate-pulse blur-3xl"></div>
          <div className="absolute bottom-0 -right-5 w-36 h-36 bg-cyan-500/20 rounded-full animate-pulse blur-3xl"></div>

          <div className="relative z-10 w-full max-w-lg bg-indigo-900/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 shadow-2xl rotate-3">
            <div className="bg-indigo-950 rounded-2xl p-6 border border-white/5">
              <div className="flex items-center justify-between mb-8">
                <div className="h-4 w-32 bg-white/10 rounded-full"></div>
                <div className="flex space-x-2">
                  <div className="h-2 w-2 rounded-full bg-red-400"></div>
                  <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
              </div>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex space-x-4 animate-pulse">
                    <div className="h-12 w-12 bg-white/5 rounded-lg"></div>
                    <div className="flex-1 space-y-2 py-1">
                      <div className="h-2 bg-white/10 rounded-full w-3/4"></div>
                      <div className="h-2 bg-white/5 rounded-full"></div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-10 h-32 w-full bg-gradient-to-t from-cyan-500/20 to-transparent rounded-xl border border-cyan-500/30 flex items-center justify-center">
                <Zap className="text-cyan-400 animate-bounce" size={40} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
