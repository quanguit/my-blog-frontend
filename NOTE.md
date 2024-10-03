1. SSR in first time or reload and CLR if navigate to page
2. In Homepage, it prefech details page base on 2 this function:
  await queryClient.prefetchInfiniteQuery({
    queryKey: useInfiniteArticlesQuery.getKey({
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    }),
    queryFn: ({ pageParam }) => useArticlesQuery.fetcher(pageParam)(),
    initialPageParam: {
      pagination: {
        page: DEFAULT_PAGE,
        pageSize: PAGE_SIZE,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: useBannersQuery.getKey(),
    queryFn: useBannersQuery.fetcher(),
  });
3. And to see it, please run this on production mode. In Homepage, It auto prefetch 4 details page in network tab
4. In homepage, open view source, I will see content of one element include image, title and file script in case get 1 item, if get 4 items, we will see 4 content like this.
5. Can use fetchNextPage to load more
6. Homepage use View Load Post to load more post
7. Blogpage use SCROLL to load more post
8. Page for SEO shouldn't add authentication, should public routes
9. Don't need to use SSR because we don't know user will search whatever

