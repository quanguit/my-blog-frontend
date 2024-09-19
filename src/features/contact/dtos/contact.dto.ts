import * as yup from 'yup';

export const contactSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().email().required(),
    message: yup.string().required(),
  })
  .required();

export type ContactInputDTO = yup.InferType<typeof contactSchema>;
