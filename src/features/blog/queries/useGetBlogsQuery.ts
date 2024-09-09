import { useQuery } from '@tanstack/react-query';

import { ResponseDataType } from '@/types';

import { BlogDto } from '../dtos';
import { blogQueryOptions } from '../queryKeys';

export const useGetBlogsQuery = () =>
  useQuery<ResponseDataType<BlogDto>>(blogQueryOptions.all);
