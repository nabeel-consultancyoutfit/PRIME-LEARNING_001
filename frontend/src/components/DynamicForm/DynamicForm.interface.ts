import { Schema } from 'yup';

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
}

export interface DynamicFormProps {
  fields: DynamicFieldConfig[];
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  initialValues?: Record<string, any>;
  validationSchema?: Schema<any>;
  submitLabel?: string;
  cancelLabel?: string;
  loading?: boolean;
  onCancel?: () => void;
}
