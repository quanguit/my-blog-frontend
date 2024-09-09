import { apiEndpoints } from '@/constants';
import { fetcher } from '@/services';
import { ResponseDataType } from '@/types';

import { AuthResponseDto, RegisterDto } from '../dtos';

export const register = (body: RegisterDto) =>
  fetcher<ResponseDataType<AuthResponseDto>, RegisterDto>({
    method: 'POST',
    url: apiEndpoints.auth.local.register.toURL(),
    body,
  });
