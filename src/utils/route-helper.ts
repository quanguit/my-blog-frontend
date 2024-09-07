import set from 'lodash/set';

interface Routes {
  [key: string | number]: null | Routes;
}

type DefaultQueryParams = { query?: Record<string, string> };

type ExtractRouteParams<
  Key,
  Params extends DefaultQueryParams,
> = Key extends `:${infer Param}`
  ? { [K in Param]: string | number } & Params
  : Params;

type RouteMap<
  T extends Routes,
  Params extends DefaultQueryParams = DefaultQueryParams,
> = {
  [Key in keyof T]: {
    toURL: (params?: ExtractRouteParams<Key, Params>) => string;
  } & (T[Key] extends Routes
    ? RouteMap<T[Key], ExtractRouteParams<Key, Params>>
    : {});
};

function convertQuery(query: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(query).map(([key, value]) => [
      key,
      typeof value !== 'string' ? String(value) : value,
    ]),
  );
}

export function transformRoutesToMap<
  T extends Routes,
  P extends DefaultQueryParams,
>(routes: T): RouteMap<T, P> {
  const map = {};

  const createToURLFunction = (path: string): ((params?: P) => string) => {
    return (params?: P): string => {
      const resolvePath = `${path
        .split('.')
        .map((path) =>
          params && path.startsWith(':')
            ? params[path.slice(1) as keyof P]
            : path,
        )
        .join('/')}`;

      const currentPath = params?.query
        ? `${resolvePath}?${new URLSearchParams(
            convertQuery(params.query),
          ).toString()}`
        : resolvePath;

      return currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    };
  };

  const appendToURL = (path: string) => {
    const toURL = createToURLFunction(path);
    set(map, path, { toURL });
  };

  function traverseRoutes<T extends Routes>(routes: T, parentPath = ''): void {
    Object.entries(routes).forEach(([route, value]) => {
      const fullPath = parentPath ? `${parentPath}.${route}` : route;

      appendToURL(fullPath);

      if (value !== null) traverseRoutes(value, fullPath);
    });
  }

  traverseRoutes(routes);

  return map as RouteMap<T, P>;
}
