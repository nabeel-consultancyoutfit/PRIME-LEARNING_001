import React, { useState, useEffect } from 'react';
import {
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { FormModal } from './FormModal';

interface ParagraphTextModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void | Promise<void>;
  title: string;
  label: string;
  initialValue?: string;
  required?: boolean;
  placeholder?: string;
  rows?: number;
}

export const ParagraphTextModal: React.FC<ParagraphTextModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  label,
  initialValue = '',
  required = false,
  placeholder,
  rows = 6,
}) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  const handleSubmit = async () => {
    if (required && !value.trim()) {
      return;
    }
    setLoading(true);
    try {
      await onSubmit(value);
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormModal open={open} onClose={onClose} title={title} maxWidth="md">
      <Box sx={{ pt: 2 }}>
        <TextField
          autoFocus
          fullWidth
          label={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          disabled={loading}
          required={required}
          multiline
          rows={rows}
        />
        <DialogActions sx={{ mt: 3 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || (required && !value.trim())}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </FormModal>
  );
};
