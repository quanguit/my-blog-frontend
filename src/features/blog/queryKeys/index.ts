import { queryOptions } from '@tanstack/react-query';

import { ResponseDataType } from '@/types';

import { BlogDto } from '../dtos';
import { getBlog } from '../services';
import { getBlogs } from '../services/get-blogs';

export const blogQueryOptions = {
  all: queryOptions<ResponseDataType<BlogDto>>({
    queryKey: ['blog'],
    queryFn: getBlogs,
  }),
  details: (id: string) =>
    queryOptions<ResponseDataType<BlogDto>>({
      queryKey: [blogQueryOptions.all.queryKey, { id }],
      queryFn: () => getBlog(id),
    }),
};
