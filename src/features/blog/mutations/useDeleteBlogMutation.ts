import {
  DefaultError,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import { blogQueryOptions } from '../queryKeys';
import { deleteBlog } from '../services';

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<void, DefaultError, { id: string }>({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryOptions.all);
    },
  });
};
