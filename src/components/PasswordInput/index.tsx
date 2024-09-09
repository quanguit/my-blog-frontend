'use client';

import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {
  IconButton,
  TextField,
  TextFieldProps,
  TextFieldVariants,
} from '@mui/material';
import { forwardRef } from 'react';
import { useController } from 'react-hook-form';
import { useBoolean } from 'usehooks-ts';

export type PasswordInputProps<
  Variant extends TextFieldVariants = TextFieldVariants,
> = TextFieldProps<Variant>;

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ name = '', ...props }, ref) => {
    const {
      field,
      fieldState: { error },
    } = useController({ name });
    const { value, toggle } = useBoolean(false);

    return (
      <TextField
        {...field}
        type={value ? 'text' : 'password'}
        inputRef={ref}
        size="small"
        helperText={error?.message}
        error={Boolean(error)}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton onClick={toggle}>
                {value ? <VisibilityIcon /> : <VisibilityOffIcon />}
              </IconButton>
            ),
          },
        }}
        {...props}
      />
    );
  },
);

PasswordInput.displayName = 'PasswordInput';
