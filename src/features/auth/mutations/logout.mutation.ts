import { useMutation } from '@tanstack/react-query';

import { logout } from '../services';

export function useLogoutMutation() {
  return useMutation({
    mutationFn: logout,
  });
}
