import { MutableRefObject } from 'react';

export type MethodInfo = {
  method: 'useOptimistic' | 'useState';
  description: string;
  taskList: string[];
  formRef: MutableRefObject<any>;
};
