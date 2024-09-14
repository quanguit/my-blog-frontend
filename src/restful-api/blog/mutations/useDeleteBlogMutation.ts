import { useMutation, useQueryClient } from '@tanstack/react-query';

import { blogQueryOptions } from '../queryKeys';
import { deleteBlog } from '../services';

export const useDeleteBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryOptions.all);
    },
  });
};
