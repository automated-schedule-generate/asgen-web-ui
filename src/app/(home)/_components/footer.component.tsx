import Image from 'next/image';
import React from 'react';

export function Footer() {
  return (
    <footer className="bg-[#03017D] text-white py-16">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Logo e Descrição */}
        <div className="space-y-6">
          <div className="flex items-center">
            <Image
              src="/images/asgen-horizontal-light.svg"
              alt="ASGEN Logo"
              width={160}
              height={45}
              className="w-auto h-10"
            />
          </div>
          <p className="text-slate-400 text-sm leading-relaxed">
            Geração inteligente de horários acadêmicos usando algoritmos
            genéticos. Projeto em desenvolvimento.
          </p>
        </div>

        {/* Produto */}
        <div className="space-y-6">
          <h5 className="font-bold text-lg">Produto</h5>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <a href="#" className="hover:text-cyan-400">
                Funcionalidades
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Documentação
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Status do Projeto
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Segurança
              </a>
            </li>
          </ul>
        </div>

        {/* Instituição */}
        <div className="space-y-6">
          <h5 className="font-bold text-lg">Instituição</h5>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <span className="hover:text-cyan-400">
                IFPE - Campus Igarassu
              </span>
            </li>
            <li>
              <span className="hover:text-cyan-400">Pernambuco, Brasil</span>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Casos de Uso
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Âmbitos Acadêmicos
              </a>
            </li>
          </ul>
        </div>

        {/* Suporte */}
        <div className="space-y-6">
          <h5 className="font-bold text-lg">Suporte</h5>
          <ul className="space-y-3 text-slate-400 text-sm">
            <li>
              <a href="#" className="hover:text-cyan-400">
                Guias
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Algoritmo
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                Perguntas frequentes
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-cyan-400">
                E-mail
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-16 mt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs text-center space-y-4 md:space-y-0">
        <p>
          © 2026 ASGEN - Projeto acadêmico em desenvolvimento. IFPE Campus
          Igarassu.
        </p>
        <div className="flex space-x-6">
          <a href="#" className="hover:text-slate-300">
            Política de Privacidade
          </a>
          <a href="#" className="hover:text-slate-300">
            Termos de Uso
          </a>
          <a href="#" className="hover:text-slate-300">
            Segurança
          </a>
        </div>
      </div>
    </footer>
  );
}
