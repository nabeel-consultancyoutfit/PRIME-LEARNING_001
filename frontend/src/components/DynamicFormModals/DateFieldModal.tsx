import React, { useState, useEffect } from 'react';
import {
  TextField,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { FormModal } from './FormModal';

interface DateFieldModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string) => void | Promise<void>;
  title: string;
  label: string;
  initialValue?: string;
}

export const DateFieldModal: React.FC<DateFieldModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  label,
  initialValue = '',
}) => {
  const [value, setValue] = useState(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  const handleSubmit = async () => {
    if (!value) {
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
    <FormModal open={open} onClose={onClose} title={title}>
      <Box sx={{ pt: 2 }}>
        <TextField
          autoFocus
          fullWidth
          label={label}
          type="date"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
          InputLabelProps={{ shrink: true }}
        />
        <DialogActions sx={{ mt: 3 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !value}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </FormModal>
  );
};
