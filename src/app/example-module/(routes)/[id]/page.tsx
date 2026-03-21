/**
 * PÁGINA DINÂMICA (EXEMPLO)
 */
export default function ExampleDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-8">
      <div className="p-6 border-2 border-dashed border-gray-300">
        <h1 className="text-2xl font-bold">Destaques do Exemplo</h1>
        <p className="mt-4">
          ID acessado: <span className="font-mono bg-gray-100 p-1">{params.id}</span>
        </p>
        <p className="mt-2 text-sm text-gray-500 italic">
          (Referência para rotas dinâmicas: [id]/page.tsx)
        </p>
      </div>
    </div>
  );
}
