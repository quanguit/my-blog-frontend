import * as yup from 'yup';

export const commentSchema = yup
  .object({
    input: yup.string().trim().required('Comment is required field'),
  })
  .required();

export type CommentInputDTO = yup.InferType<typeof commentSchema>;
