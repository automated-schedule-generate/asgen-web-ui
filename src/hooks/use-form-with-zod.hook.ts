'use client';

import { useForm, type UseFormProps } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useFormWithZod<T extends z.ZodObject>(
  schema: T,
  props?: UseFormProps<z.infer<T>>,
) {
  return useForm<z.infer<T>>({
    mode: 'onChange',
    resolver: zodResolver(schema) as any,
    ...props,
    defaultValues: {
      ...generateDefaultValues(schema),
      ...(props?.defaultValues ?? {}),
    } as any,
  });
}

function generateDefaultValues<T extends z.ZodObject>(
  schema: T,
  defaultValues: Record<string, string | number | object | null> = {},
): Record<string, string | number | object | null> {
  let obj = null;
  if (schema.toJSONSchema) {
    obj = schema.toJSONSchema()?.properties;
  } else if ('properties' in schema) {
    obj = schema.properties;
  }
  const entries = Object.entries(obj ?? {});
  for (const [key, value] of entries) {
    if (typeof value === 'boolean') {
      continue;
    }
    //type?: "object" | "array" | "string" | "number" | "boolean" | "null" | "integer"

    let defaultValue: string | number | [] | object | null = '';
    switch (value?.type) {
      case 'number':
        defaultValue = 0;
        break;
      case 'integer':
        defaultValue = 0;
        break;
      case 'array':
        defaultValue = [];
        break;
      case 'object':
        if (!value?.properties) {
          break;
        }
        defaultValue = {};
        generateDefaultValues(value, defaultValue as any);
        break;
      case 'null':
        defaultValue = null;
    }

    defaultValues[key] = defaultValue;
  }

  return defaultValues;
}
