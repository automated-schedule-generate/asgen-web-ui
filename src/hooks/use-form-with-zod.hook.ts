'use client';

import {
  DefaultValues,
  Resolver,
  useForm,
  type UseFormProps,
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export function useFormWithZod<T extends z.ZodObject>(
  schema: T,
  props?: UseFormProps<z.infer<T>>,
) {
  return useForm<z.infer<T>>({
    mode: 'onChange',
    resolver: zodResolver(schema) as Resolver<
      z.core.output<T>,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      any,
      z.infer<T>
    >,
    ...props,
    defaultValues: {
      ...generateDefaultValues(schema),
      ...(props?.defaultValues ?? {}),
    } as DefaultValues<z.core.output<T>>,
  });
}

function generateDefaultValues<T extends z.ZodObject>(
  schema: T,
  defaultValues: Record<string, string | number | object | null> = {},
): Record<string, string | number | object | null> {
  let obj = null;
  if ('toJSONSchema' in schema) {
    obj = schema.toJSONSchema({ unrepresentable: 'any' })?.properties ?? {};
  } else if ('properties' in schema) {
    //@ts-expect-error properties is not defined
    obj = schema?.properties;
  }
  const entries = Object.entries(obj ?? {});
  for (const [key, value] of entries) {
    if (typeof value === 'boolean') {
      continue;
    }
    //type?: "object" | "array" | "string" | "number" | "boolean" | "null" | "integer"

    let defaultValue: string | number | [] | object | null = '';
    //@ts-expect-error type is not defined
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
        //@ts-expect-error properties is not defined
        if (!value?.properties) {
          break;
        }
        defaultValue = {};
        //@ts-expect-error type is not defined
        generateDefaultValues(value, defaultValue as object);
        break;
      case 'null':
        defaultValue = null;
    }

    defaultValues[key] = defaultValue;
  }

  return defaultValues;
}
