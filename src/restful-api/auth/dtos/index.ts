import * as yup from 'yup';

export const loginSchema = yup
  .object({
    identifier: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

export type LoginInputDTO = yup.InferType<typeof loginSchema>;

export const registerSchema = yup
  .object({
    username: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
  })
  .required();

export type RegiterInputDTO = yup.InferType<typeof registerSchema>;

export type UserDTO = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type AuthResponseDTO = {
  jwt: string;
  user: UserDTO;
};
