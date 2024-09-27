import { revalidatePath } from 'next/cache';
import type { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const req = await request.json();
    const postId = req?.entry?.id;

    if (req.model === 'article') {
      revalidatePath('/');
      revalidatePath('/blog');
      revalidatePath(`/blog/${postId}`);
    }
  } catch (error: any) {
    return new Response(`Webhook error: ${error.message}`, {
      status: 400,
    });
  }

  return Response.json({ revalidated: true });
}
