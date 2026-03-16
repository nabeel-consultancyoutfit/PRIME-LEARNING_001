import React, { useState, useEffect } from 'react';
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  DialogActions,
  Button,
  Box,
} from '@mui/material';
import { FormModal } from './FormModal';

export interface OptionType {
  label: string;
  value: string | number;
}

interface SingleSelectionModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (value: string | number) => void | Promise<void>;
  title: string;
  options: OptionType[];
  initialValue?: string | number;
}

export const SingleSelectionModal: React.FC<SingleSelectionModalProps> = ({
  open,
  onClose,
  onSubmit,
  title,
  options,
  initialValue = '',
}) => {
  const [value, setValue] = useState<string | number>(initialValue);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue, open]);

  const handleSubmit = async () => {
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
        <RadioGroup
          value={value}
          onChange={(e) => setValue(e.target.value)}
        >
          {options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio disabled={loading} />}
              label={option.label}
            />
          ))}
        </RadioGroup>
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
