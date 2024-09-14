import { useQuery } from '@tanstack/react-query';

import { blogQueryOptions } from '../queryKeys';

export const useGetBlogsQuery = () => useQuery(blogQueryOptions.all);
