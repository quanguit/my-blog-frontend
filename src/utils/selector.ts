type WithSelectorOptions<TData, TResult> = {
  select: (data: TData) => TResult;
};

export async function withSelector<
  T extends (...args: any) => Promise<any>,
  TData = ReturnType<T> | null | undefined,
  TResult = TData,
>(
  queryFunc: T,
  { select }: WithSelectorOptions<TData, TResult>,
): Promise<TResult> {
  const data = await queryFunc();

  return select(data);
}
