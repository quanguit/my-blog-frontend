import { useEffect } from 'react';
import { useIntersectionObserver } from 'usehooks-ts';

export const useInfinityScroll = (fetchNextPage: () => void) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 0.5,
  });

  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [fetchNextPage, isIntersecting]);

  return ref;
};
