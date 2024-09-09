import {
  DefaultError,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { ResponseDataType } from '@/types';

import { BlogDto, CreateBlogDto } from '../dtos';
import { blogQueryOptions } from '../queryKeys';
import { createBlog } from '../services';

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDataType<BlogDto>, DefaultError, CreateBlogDto>({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryOptions.all);
    },
  });
};
