import {
  DefaultError,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { ResponseDataType } from '@/types';

import { BlogDto, UpdateBlogDto } from '../dtos';
import { blogQueryOptions } from '../queryKeys';
import { updateBlog } from '../services';

export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<ResponseDataType<BlogDto>, DefaultError, UpdateBlogDto>({
    mutationFn: updateBlog,
    onSuccess: (data) => {
      queryClient.setQueryData(
        blogQueryOptions.details(data.data.id).queryKey,
        data,
      );
      // queryClient.invalidateQueries(blogQueryOptions.details(data.data.id));
    },
  });
};
