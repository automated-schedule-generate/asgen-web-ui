'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { RegisterForm } from '@/app/(auth)/users/_components/register-form.component';
import { AuthForm } from '@/app/(auth)/auth/_components/auth-form.component';
import {
  School,
  Cpu,
  CheckCircle,
  Clock,
  Settings,
  Play,
  TrendingUp,
  Users,
  BookOpen,
  ArrowRight,
  ChevronRight,
  Layers,
  Zap,
} from 'lucide-react';

// Simulação simplificada do Toast
const Toast = ({
  message,
  visible,
  onClose,
}: {
  message: string;
  visible: boolean;
  onClose: () => void;
}) => {
  if (!visible) return null;
  return (
    <div className="fixed bottom-5 right-5 z-50 bg-cyan-500 text-black font-bold px-6 py-3 rounded-lg shadow-2xl animate-bounce flex items-center space-x-2">
      <Zap size={20} />
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 hover:opacity-70 text-black">
        ✕
      </button>
    </div>
  );
};

export default function App() {
  const [showToast, setShowToast] = useState(false);
  const [openRegisterDialog, setOpenRegisterDialog] = useState(false);
  const [openAuthDialog, setOpenAuthDialog] = useState(false);

  const triggerAction = () => {
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-cyan-200">
      <Toast
        message="🚀 A redirecionar..."
        visible={showToast}
        onClose={() => setShowToast(false)}
      />

      {/* --- SECÇÃO HERO --- */}
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
              Elimine conflitos de horários com algoritmos genérico.
              <span className="block mt-2 text-amber-400 font-semibold underline decoration-amber-400/30 underline-offset-4">
                +98% de aproveitamento de recursos institucionais.
              </span>
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <button
                onClick={() => setOpenRegisterDialog(true)}
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

      {/* --- SECÇÃO SOBRE --- */}
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
                É um sistema inteligente desenvolvido como projeto acadêmico,
                voltado à automatização do processo de criação de horários em
                instituições de ensino. O sistema utiliza algoritmos genéricos
                para lidar com múltiplas restrições e reduzir conflitos comuns
                na montagem manual de horários.
              </p>
            </div>
          </div>
        </div>
      </section>

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
            {[
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
            ].map((item, idx) => (
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

      {/* --- COMO FUNCIONA --- */}
      <section
        id="how-it-works"
        className="py-24 max-w-7xl mx-auto px-6 text-center"
      >
        <h2 className="text-4xl font-bold text-slate-900 mb-4 tracking-tight italic">
          Como funciona o ASGEN
        </h2>
        <p className="text-slate-500 mb-16">
          Os 4 passos fundamentais para a geração automática da sua grade
          horária
        </p>

        <div className="grid md:grid-cols-4 gap-8">
          {[
            {
              step: '01',
              title: 'Configuração',
              desc: 'Insira dados de professores, salas e turmas.',
            },
            {
              step: '02',
              title: 'Processamento',
              desc: 'O algoritmo genérico inicia as permutações.',
            },
            {
              step: '03',
              title: 'Validação',
              desc: 'O sistema valida restrições e evita conflitos.',
            },
            {
              step: '04',
              title: 'Exportação',
              desc: 'Gere PDFs e integrações com seu ERP.',
            },
          ].map((item, idx) => (
            <div key={idx} className="relative group">
              <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm transition-all group-hover:bg-[#03017D] group-hover:border-[#03017D]">
                <span className="text-5xl font-black text-slate-200 group-hover:text-white/20 absolute top-4 left-4 transition-colors">
                  {item.step}
                </span>
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto group-hover:bg-white transition-colors">
                    {idx === 0 && <Settings size={24} />}
                    {idx === 1 && <Cpu size={24} />}
                    {idx === 2 && <CheckCircle size={24} />}
                    {idx === 3 && <BookOpen size={24} />}
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

      {/* --- CASOS DE USO --- */}
      <section className="py-24 bg-[#03017D] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-blue-300 font-bold tracking-widest uppercase text-sm mb-4 block">
              Casos de Uso
            </span>
            <h2 className="text-4xl font-bold mb-4 tracking-tight">
              Perfeito para Qualquer Instituição
            </h2>
            <p className="text-blue-200 max-w-2xl mx-auto">
              O ASGEN pode ser utilizado em instituições de ensino superior,
              escolas técnicas e outros ambientes educacionais que demandem
              organização eficiente de horários acadêmicos.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
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
            ].map((item, idx) => (
              <div
                key={idx}
                className="bg-white/10 border border-white/20 p-8 rounded-2xl hover:bg-white/20 transition-all shadow-xl"
              >
                <div className="bg-blue-500/30 w-16 h-16 rounded-2xl flex items-center justify-center text-blue-200 mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-blue-100/70 text-sm leading-relaxed mb-6">
                  {item.desc}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs text-blue-200 bg-blue-900/50 px-3 py-1 rounded-full"
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

      {/* --- STATUS DO PROJETO --- */}
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
            {[
              {
                icon: <CheckCircle className="text-blue-600" size={32} />,
                title: 'Validação Técnica',
                desc: 'Sistema em fase de testes e aprimoramento contínuo da plataforma.',
              },
              {
                icon: <TrendingUp className="text-indigo-600" size={32} />,
                title: 'Desenvolvimento Ativo',
                desc: 'Implementação e refinamento de algoritmos evolutivos genéricos.',
              },
              {
                icon: <School className="text-cyan-600" size={32} />,
                title: 'Pesquisa Acadêmica',
                desc: 'Projeto desenvolvido com rigor metodológico avançado no IFPE.',
              },
            ].map((item, idx) => (
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

      {/* --- RODAPÉ --- */}
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
              genéricos. Projeto em desenvolvimento.
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

      <RegisterForm
        open={openRegisterDialog}
        onClose={() => setOpenRegisterDialog(false)}
        openAuthDialog={() => {
          setOpenRegisterDialog(false);
          setOpenAuthDialog(true);
        }}
      />
      <AuthForm
        open={openAuthDialog}
        onClose={() => setOpenAuthDialog(false)}
        openRegisterDialog={() => {
          setOpenAuthDialog(false);
          setOpenRegisterDialog(true);
        }}
      />
    </div>
  );
}
