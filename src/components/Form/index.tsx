import { Box, BoxProps } from '@mui/material';
import { FieldValues, FormProvider, UseFormReturn } from 'react-hook-form';

interface FormProps<T extends FieldValues> extends BoxProps<'form'> {
  methods: UseFormReturn<T>;
}

export function Form<T extends FieldValues>({
  methods,
  ...boxProps
}: FormProps<T>) {
  return (
    <FormProvider {...methods}>
      <Box component="form" {...boxProps} />
    </FormProvider>
  );
}
