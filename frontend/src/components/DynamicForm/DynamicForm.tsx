import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Grid,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Button,
  CircularProgress,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import { DynamicFormProps, DynamicFieldConfig } from './DynamicForm.interface';

export const DynamicForm = <TValues extends Record<string, any> = Record<string, any>>({
  fields,
  onSubmit,
  initialValues = {},
  validationSchema,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  loading = false,
  onCancel,
}: DynamicFormProps<TValues>) => {
  // NOTE: the component is generic in the `.interface.ts`.
  // We keep runtime behavior the same and cast types where `field.name` is dynamic.
  const defaultValues = React.useMemo(() => {
    const values: Record<string, any> = {};
    fields.forEach((field) => {
      values[field.name] = (initialValues as Record<string, any>)[field.name] ?? field.defaultValue ?? '';
    });
    return values;
  }, [fields, initialValues]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TValues>({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues: defaultValues as any,
  });

  const renderField = (field: DynamicFieldConfig) => {
    const commonProps = {
      fullWidth: true,
      disabled: loading || field.disabled,
      error: !!(errors as any)[field.name],
      helperText: ((errors as any)[field.name]?.message as string) || field.helperText,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: fieldProps }) => (
              <TextField
                {...fieldProps}
                {...commonProps}
                type={field.type}
                label={field.label}
                placeholder={field.placeholder}
              />
            )}
          />
        );

      case 'number':
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: fieldProps }) => (
              <TextField
                {...fieldProps}
                {...commonProps}
                type="number"
                label={field.label}
                placeholder={field.placeholder}
                inputProps={{
                  min: field.min,
                  max: field.max,
                  step: field.step,
                }}
              />
            )}
          />
        );

      case 'date':
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: fieldProps }) => (
              <TextField
                {...fieldProps}
                {...commonProps}
                type="date"
                label={field.label}
                InputLabelProps={{ shrink: true }}
              />
            )}
          />
        );

      case 'select':
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: fieldProps }) => (
              <FormControl
                fullWidth
                error={!!(errors as any)[field.name]}
                disabled={loading || field.disabled}
              >
                <InputLabel>{field.label}</InputLabel>
                <Select {...fieldProps} label={field.label}>
                  <MenuItem value="">
                    <em>Select an option</em>
                  </MenuItem>
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {(errors as any)[field.name] && (
                  <FormHelperText>{(errors as any)[field.name]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'multiselect':
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: fieldProps }) => (
              <FormControl
                fullWidth
                error={!!(errors as any)[field.name]}
                disabled={loading || field.disabled}
              >
                <InputLabel>{field.label}</InputLabel>
                <Select
                  {...fieldProps}
                  multiple
                  label={field.label}
                  value={fieldProps.value || []}
                >
                  {field.options?.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                {(errors as any)[field.name] && (
                  <FormHelperText>{(errors as any)[field.name]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: fieldProps }) => (
              <TextField
                {...fieldProps}
                {...commonProps}
                label={field.label}
                placeholder={field.placeholder}
                multiline={field.multiline ?? true}
                rows={field.rows ?? 4}
              />
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.name as any}
            control={control}
            render={({ field: fieldProps }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    {...fieldProps}
                    checked={fieldProps.value || false}
                    disabled={loading || field.disabled}
                  />
                }
                label={field.label}
              />
            )}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        {fields.map((field) => (
          <Grid item xs={12} sm={field.gridSize || 12} key={field.name}>
            {renderField(field)}
          </Grid>
        ))}
        <Grid item xs={12} sx={{ mt: 2 }}>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} /> : undefined}
            >
              {submitLabel}
            </Button>
            {onCancel && (
              <Button variant="outlined" onClick={onCancel} disabled={loading}>
                {cancelLabel}
              </Button>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
