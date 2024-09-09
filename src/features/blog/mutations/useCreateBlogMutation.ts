import { useMutation, useQueryClient } from '@tanstack/react-query';

import { blogQueryOptions } from '../queryKeys';
import { createBlog } from '../services';

export const useCreateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries(blogQueryOptions.all);
    },
  });
};
