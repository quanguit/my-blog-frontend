import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';
import { ResponseDataType } from '@/types';

import { AuthResponseDto, LoginDto } from '../dtos';

export const login = (body: LoginDto) =>
  fetcher<ResponseDataType<AuthResponseDto>, LoginDto>({
    method: 'POST',
    url: apiEndpoints.auth.local.toURL(),
    body,
  });
