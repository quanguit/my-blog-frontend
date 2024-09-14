import { useMutation, useQueryClient } from '@tanstack/react-query';

import { blogQueryOptions } from '../queryKeys';
import { updateBlog } from '../services';

export const useUpdateBlogMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
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
