/**
 * ESTE É UM SERVIÇO DE EXEMPLO
 * Simula a integração com uma API.
 */

import { IExample } from '../types/example.type';

export const exampleService = {
  getExamples: async (): Promise<IExample[]> => {
    // Simulação de delay de API
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [
      { id: 1, name: 'Exemplo A', createdAt: new Date() },
      { id: 2, name: 'Exemplo B', createdAt: new Date() },
    ];
  },

  createExample: async (data: IExample) => {
    console.log('[EXEMPLO] Criando dado:', data);
    return { success: true };
  },
};
