import { TextField, TextFieldProps } from '@mui/material';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';

export const Input = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ name = '', ...props }, ref) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name });

    return (
      <TextField
        {...field}
        size="small"
        inputRef={ref}
        helperText={error?.message}
        error={Boolean(error)}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';
