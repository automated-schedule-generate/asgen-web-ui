import { ExampleFormComponent } from '../../components/example-form.component';

/**
 * PÁGINA DE CRIAÇÃO (EXEMPLO)
 */
export default function ExampleCreatePage() {
  return (
    <div className="p-8 max-w-lg mx-auto">
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <p className="text-yellow-700">
          <strong>Aviso:</strong> Esta página faz parte da estrutura de exemplo.
        </p>
      </div>
      <ExampleFormComponent />
    </div>
  );
}
