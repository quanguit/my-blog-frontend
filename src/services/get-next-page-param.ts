import { PAGE_SIZE } from '@/constants';
import { Pagination } from '@/generated/graphql';

export const getNextPageParamFunc = (pagination?: Pagination) => {
  const page = pagination?.page ?? 1;
  const pageCount = pagination?.pageCount ?? 1;

  if (page < pageCount) {
    return {
      pagination: {
        page: page + 1,
        pageSize: PAGE_SIZE,
      },
    };
  }
};
