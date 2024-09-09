import { useMutation } from '@tanstack/react-query';

import { register } from '../services';

export const useRegisterMutation = () => {
  return useMutation({
    mutationFn: register,
  });
};
