export async function fetchUrl(
  endpoint: string,
  query: string = "",
  options?: RequestInit
) {
  const res = await fetch(
    `https://headwheel-us.backendless.app/api/data/${endpoint}${query}`,
    options
  );
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${data.message || res.statusText}`
    );
  }
  return data;
}
