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

export const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  onSubmit,
  initialValues = {},
  validationSchema,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel',
  loading = false,
  onCancel,
}) => {
  const defaultValues = React.useMemo(() => {
    const values: Record<string, any> = {};
    fields.forEach((field) => {
      values[field.name] = initialValues[field.name] ?? field.defaultValue ?? '';
    });
    return values;
  }, [fields, initialValues]);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: validationSchema ? yupResolver(validationSchema) : undefined,
    defaultValues,
  });

  const renderField = (field: DynamicFieldConfig) => {
    const commonProps = {
      fullWidth: true,
      disabled: loading || field.disabled,
      error: !!errors[field.name],
      helperText: (errors[field.name]?.message as string) || field.helperText,
    };

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
        return (
          <Controller
            name={field.name}
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
            name={field.name}
            control={control}
            render={({ field: fieldProps }) => (
              <TextField
                {...fieldProps}
                {...commonProps}
                type="number"
                label={field.label}
                placeholder={field.placeholder}
              />
            )}
          />
        );

      case 'date':
        return (
          <Controller
            name={field.name}
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
            name={field.name}
            control={control}
            render={({ field: fieldProps }) => (
              <FormControl fullWidth error={!!errors[field.name]} disabled={loading || field.disabled}>
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
                {errors[field.name] && (
                  <FormHelperText>{errors[field.name]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'multiselect':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: fieldProps }) => (
              <FormControl fullWidth error={!!errors[field.name]} disabled={loading || field.disabled}>
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
                {errors[field.name] && (
                  <FormHelperText>{errors[field.name]?.message as string}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        );

      case 'textarea':
        return (
          <Controller
            name={field.name}
            control={control}
            render={({ field: fieldProps }) => (
              <TextField
                {...fieldProps}
                {...commonProps}
                label={field.label}
                placeholder={field.placeholder}
                multiline
                rows={4}
              />
            )}
          />
        );

      case 'checkbox':
        return (
          <Controller
            name={field.name}
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
