/**
 * ESTAS SÃO TIPAGENS DE EXEMPLO
 */

import type { ExampleTypeSchema } from '../_schemas/example.schema';

export interface IExample extends ExampleTypeSchema {
  id: number;
  createdAt?: Date;
}

export type TExampleStatus = 'pending' | 'completed' | 'canceled';
