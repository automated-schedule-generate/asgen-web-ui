/**
 * ESTE É UM SERVIÇO DE EXEMPLO
 * Simula a integração com uma API.
 */

import type { ExampleTypeSchema } from '../_schemas/example.schema';
import type { IExample } from '../_types/example.type';

export const exampleService = {
  async getExamples(): Promise<IExample[]> {
    // Simulação de delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      { id: 1, name: 'Exemplo A', createdAt: new Date() },
      { id: 2, name: 'Exemplo B', createdAt: new Date() },
    ];
  },

  async createExample(data: ExampleTypeSchema) {
    console.log('[EXEMPLO] Criando dado:', data);
    return { success: true };
  },
};
