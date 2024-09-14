import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';

export const deleteBlog = ({ id }: { id: string }) =>
  fetcher<void>({
    method: 'DELETE',
    url: apiEndpoints.blog[':id'].toURL({ id }),
  });
