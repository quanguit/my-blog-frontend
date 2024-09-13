import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';
import { ResponseDataType } from '@/types';

import { BlogDto } from '../dtos';

export const getBlog = (id: string) =>
  fetcher<ResponseDataType<BlogDto>>({
    method: 'GET',
    url: apiEndpoints.blog[':id'].toURL({ id }),
  });
