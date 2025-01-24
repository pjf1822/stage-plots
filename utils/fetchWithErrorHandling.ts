export const fetchWithErrorHandling = async (url: string, body: any) => {
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const errorResponse = await res.json();
    throw new Error(errorResponse.message || `Failed to0 ${url}`);
  }
  return res.json();
};
