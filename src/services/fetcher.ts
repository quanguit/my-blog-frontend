export async function fetcher<TData, TBody = undefined>({
  url,
  body,
  options,
  method,
}: {
  url: string;
  body?: TBody;
  options?: RequestInit['headers'];
  method: string;
}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...options,
    },
    body: JSON.stringify(body),
  });

  const json = await res.json();

  if (json.errors) {
    const { message } = json;

    throw new Error(message);
  }

  return json as TData;
}
