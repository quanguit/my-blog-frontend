import { apiEndpoints } from '@/constants';
import { fetcherRestful } from '@/services';
import { ResponseDataType } from '@/types';

import { BlogDto, UpdateBlogDto } from '../dtos';

export const updateBlog = (body: UpdateBlogDto) =>
  fetcherRestful<ResponseDataType<BlogDto>, UpdateBlogDto>({
    method: 'PUT',
    url: apiEndpoints.blog[':id'].toURL({ id: body.id }),
    body,
  });
