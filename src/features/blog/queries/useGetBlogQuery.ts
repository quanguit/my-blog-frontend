import { useQuery } from '@tanstack/react-query';

import { blogQueryOptions } from '../queryKeys';

export const useGetBlogQuery = (id: string) =>
  useQuery(blogQueryOptions.details(id));
