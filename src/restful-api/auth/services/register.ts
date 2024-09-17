import { apiEndpoints } from '@/constants';
import { fetcherRestful } from '@/services';
import { ResponseDataType } from '@/types';

import { AuthResponseDTO, RegiterInputDTO } from '../dtos';

export const register = (body: RegiterInputDTO) =>
  fetcherRestful<ResponseDataType<AuthResponseDTO>, RegiterInputDTO>({
    method: 'POST',
    url: apiEndpoints.auth.local.register.toURL(),
    body,
  });
