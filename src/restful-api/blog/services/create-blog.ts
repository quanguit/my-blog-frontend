import { apiEndpoints } from '@/constants';
import { fetcherRestful } from '@/services';
import { ResponseDataType } from '@/types';

import { BlogDto, CreateBlogDto } from '../dtos';

export const createBlog = (body: CreateBlogDto) =>
  fetcherRestful<ResponseDataType<BlogDto>, CreateBlogDto>({
    method: 'POST',
    url: apiEndpoints.blog.toURL(),
    body,
  });
