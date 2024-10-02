import { cookies } from 'next/headers';

export function POST() {
  cookies().delete('jwt');
  return Response.json({ success: true });
}
