import { apiEndpoints } from '@/constants';
import { fetcherRestful } from '@/services';

export const deleteBlog = ({ id }: { id: string }) =>
  fetcherRestful<void>({
    method: 'DELETE',
    url: apiEndpoints.blog[':id'].toURL({ id }),
  });
