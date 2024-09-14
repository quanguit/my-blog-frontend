import { useMutation } from '@tanstack/react-query';

import { login } from '../services';

export const useLoginMutation = () => {
  return useMutation({
    mutationFn: login,
  });
};
