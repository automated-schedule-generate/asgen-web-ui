'use client';

import { Controller } from 'react-hook-form';
import type { IExample } from '../_types/example.type';
import { exampleService } from '../_services/example.service';
import {
  type ExampleTypeSchema,
  exampleSchema,
} from '../_schemas/example.schema';
import { useFormWithZod } from '@/hooks/use-form-with-zod.hook';

/**
 * ESTE É UM COMPONENTE DE EXEMPLO
 * Não deve ser utilizado em produção.
 * Refletindo a estrutura modular do projeto.
 */
export function ExampleFormComponent() {
  const { control, handleSubmit } = useFormWithZod(exampleSchema);

  async function submit(data: ExampleTypeSchema) {
    await exampleService.createExample(data as IExample);
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className="p-4 border rounded shadow-sm"
    >
      <h2 className="text-xl font-bold mb-4 text-orange-500">
        [EXEMPLO] Formulário de Teste
      </h2>
      <div className="flex flex-col gap-2">
        <label htmlFor="name">Nome (Exemplo):</label>
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                {...field}
                type="text"
                className="p-2 border rounded"
                placeholder="Digite algo..."
              />
              {fieldState?.error && (
                <small className="text-red-500">
                  {fieldState.error?.message}
                </small>
              )}
            </>
          )}
        />
        <button
          type="submit"
          className="mt-4 bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
        >
          Ação de Exemplo
        </button>
      </div>
    </form>
  );
}
