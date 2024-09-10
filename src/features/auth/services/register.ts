import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';
import { ResponseDataType } from '@/types';

import { AuthResponseDTO, RegiterInputDTO } from '../dtos';

export const register = (body: RegiterInputDTO) =>
  fetcher<ResponseDataType<AuthResponseDTO>, RegiterInputDTO>({
    method: 'POST',
    url: apiEndpoints.auth.local.register.toURL(),
    body,
  });
