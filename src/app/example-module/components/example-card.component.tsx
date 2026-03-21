/**
 * ESTE É UM COMPONENTE DE EXEMPLO
 * Não deve ser utilizado em produção.
 */
export function ExampleCardComponent({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 border rounded-lg bg-gray-50">
      <span className="text-xs font-mono uppercase text-gray-400">
        [Exemplo Card]
      </span>
      <h3 className="text-lg font-semibold mt-1">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
