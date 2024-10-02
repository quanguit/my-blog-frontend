export type ResponseDataType<T> = {
  data: T;
  statusCode: number;
  message: string;
};

export type FetchOptions = {
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
};

export type RequestInit = {
  headers: (HeadersInit & FetchOptions) | FetchOptions;
};
