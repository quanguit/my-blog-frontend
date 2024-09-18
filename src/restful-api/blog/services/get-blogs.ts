import { apiEndpoints } from '@/constants';
import { fetcherRestful } from '@/services';
import { ResponseDataType } from '@/types';

import { BlogDto } from '../dtos';

export const getBlogs = () =>
  fetcherRestful<ResponseDataType<BlogDto>>({
    method: 'GET',
    url: apiEndpoints.blog.toURL(),
  });
