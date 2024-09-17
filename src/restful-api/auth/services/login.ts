import { apiEndpoints } from '@/constants';
import { fetcherRestful } from '@/services';
import { ResponseDataType } from '@/types';

import { AuthResponseDTO, LoginInputDTO } from '../dtos';

export const login = (body: LoginInputDTO) =>
  fetcherRestful<AuthResponseDTO, LoginInputDTO>({
    method: 'POST',
    url: apiEndpoints.auth.local.toURL(),
    body,
  });

// export const login = (body: LoginInputDTO) =>
//   fetcher<ResponseDataType<AuthResponseDTO>, LoginInputDTO>({
//     method: 'POST',
//     url: apiEndpoints.auth.local.toURL(),
//     body,
//   });
