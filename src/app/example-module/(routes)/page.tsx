'use client';

import { ExampleCardComponent } from '../components/example-card.component';
import { useExampleHook } from '../hooks/use-example.hook';

/**
 * PÁGINA DE EXEMPLO
 * Localizada em src/app/_example-module/(routes)/page.tsx
 * Nota: O prefixo '_' na pasta pai evita que o Next.js crie uma rota real.
 */
export default function ExamplePage() {
  const { data, loading } = useExampleHook();

  return (
    <main className="p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-extrabold text-red-600 underline">
          ESTA É UMA PÁGINA DE EXEMPLO (FAKE)
        </h1>
        <p className="text-gray-500 mt-2">
          Este módulo serve apenas como referência de estrutura para o projeto.
        </p>
      </header>

      <section className="grid gap-4">
        {loading ? (
          <p>Carregando mock...</p>
        ) : (
          data.map((item) => (
            <ExampleCardComponent
              key={item.id}
              title={item.name}
              description="Este é um dado fake vindo do service de exemplo."
            />
          ))
        )}
      </section>
    </main>
  );
}
