import * as yup from 'yup';

export const searchSchema = yup
  .object({
    q: yup.string().required(),
  })
  .required();

export type SearchInputDTO = yup.InferType<typeof searchSchema>;
