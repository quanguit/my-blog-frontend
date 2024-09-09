import { useQuery } from '@tanstack/react-query';

import { ResponseDataType } from '@/types';

import { BlogDto } from '../dtos';
import { blogQueryOptions } from '../queryKeys';

export const useGetBlogQuery = (id: string) =>
  useQuery<ResponseDataType<BlogDto>>(blogQueryOptions.details(id));
