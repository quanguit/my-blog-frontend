import { transformRoutesToMap } from '@/utils';

const API_ENDPOINTS = {
  auth: {
    local: {
      register: null,
    },
  },
  blog: {
    ':id': null,
  },
};

const PUBLIC_ROUTES = {
  login: null,
  register: null,
};

export const PRIVATE_ROUTES = {
  '/': null,
  blog: {
    ':id': null,
  },
  contact: null,
  search: null,
};

const ALL_ROUTES = {
  ...PUBLIC_ROUTES,
  ...PRIVATE_ROUTES,
};

export const apiEndpoints = transformRoutesToMap(API_ENDPOINTS);
export const allRoutes = transformRoutesToMap(ALL_ROUTES);
