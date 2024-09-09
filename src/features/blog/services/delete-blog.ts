import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';

export const deleteBlog = ({ id }: { id: string }) =>
  fetcher<void>({
    method: 'DELETE',
    url: apiEndpoints.clients[':id'].toURL({ id }),
  });
