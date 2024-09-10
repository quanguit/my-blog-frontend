import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';
import { ResponseDataType } from '@/types';

import { AuthResponseDTO, LoginInputDTO } from '../dtos';

export const login = (body: LoginInputDTO) =>
  fetcher<ResponseDataType<AuthResponseDTO>, LoginInputDTO>({
    method: 'POST',
    url: apiEndpoints.auth.local.toURL(),
    body,
  });
