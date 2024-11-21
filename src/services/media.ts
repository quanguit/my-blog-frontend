export function getStrapiURL(path = '') {
  return `${process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://192.168.1.7:1332'}${path}`;
}
