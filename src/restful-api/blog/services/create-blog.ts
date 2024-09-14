import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';
import { ResponseDataType } from '@/types';

import { BlogDto, CreateBlogDto } from '../dtos';

export const createBlog = (body: CreateBlogDto) =>
  fetcher<ResponseDataType<BlogDto>, CreateBlogDto>({
    method: 'POST',
    url: apiEndpoints.blog.toURL(),
    body,
  });
