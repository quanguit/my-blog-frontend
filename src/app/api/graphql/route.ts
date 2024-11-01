import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const incomingHeaders = request.headers;
  const customHeaders = new Headers();

  const jwt = cookies().get('jwt')?.value;

  if (jwt) {
    customHeaders.set('Authorization', `Bearer ${jwt}`);
  }

  incomingHeaders.forEach((value, key) => {
    if (key !== 'cookie') {
      customHeaders.set(key, value);
    }
  });

  const res = await fetch(`${process.env.NEXT_PUBLIC_STRAPI_API_URL}/graphql`, {
    method: 'POST',
    headers: customHeaders,
    body: JSON.stringify(body),
  });

  const result = await res.json();

  // check UnAuhorized 401 by result.error.status === 401

  const authData = result.data?.login || result.data?.register;

  if (authData?.jwt) {
    cookies().set({
      name: 'jwt',
      value: authData.jwt,
      httpOnly: true,
      path: '/',
    });
  }

  return Response.json(result);
}
