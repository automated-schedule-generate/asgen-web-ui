'use client';

/**
 * ESTE É UM COMPONENTE DE EXEMPLO
 * Não deve ser utilizado em produção.
 * Refletindo a estrutura modular do projeto.
 */
export function ExampleFormComponent() {
  return (
    <form className="p-4 border rounded shadow-sm">
      <h2 className="text-xl font-bold mb-4 text-orange-500">
        [EXEMPLO] Formulário de Teste
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nome (Exemplo):</label>
        <input
          id="name"
          type="text"
          className="p-2 border rounded"
          placeholder="Digite algo..."
        />
        <button
          type="button"
          className="mt-4 bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Ação de Exemplo
        </button>
      </div>
    </form>
  );
}
