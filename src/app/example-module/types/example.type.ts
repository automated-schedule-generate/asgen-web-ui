/**
 * ESTAS SÃO TIPAGENS DE EXEMPLO
 */

export interface IExample {
  id: number;
  name: string;
  description?: string;
  createdAt?: Date;
}

export type TExampleStatus = 'pending' | 'completed' | 'canceled';
