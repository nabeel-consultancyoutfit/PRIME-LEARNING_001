import { AnyObjectSchema, Schema } from 'yup';

export type FieldType = 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'multiselect' | 'textarea' | 'checkbox';

export interface SelectOption {
  label: string;
  value: string | number;
}

export interface DynamicFieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: SelectOption[];
  required?: boolean;
  validation?: Schema<any>;
  gridSize?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  placeholder?: string;
  defaultValue?: any;
  disabled?: boolean;
  helperText?: string;
  // Optional UI hints used by some field configurations
  multiline?: boolean;
  rows?: number;
  min?: number;
  max?: number;
  step?: number;
}

export interface DynamicFormProps<TValues extends Record<string, any> = Record<string, any>> {
  fields: DynamicFieldConfig[];
  onSubmit: (data: TValues) => void | Promise<void>;
  initialValues?: Partial<TValues>;
  // `yupResolver` from `@hookform/resolvers/yup` expects an object schema
  // (or `Lazy`) rather than a generic `Schema`.
  validationSchema?: AnyObjectSchema;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onCancel?: () => void;
}
