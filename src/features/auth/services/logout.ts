export async function logout() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOMAIN}/api/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const result = await res.json();

  return result;
}
