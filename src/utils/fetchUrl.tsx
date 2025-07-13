export async function fetchUrl(
  endpoint: string,
  query: string = "",
  options?: RequestInit
) {
  const baseUrl =
    process.env.BACKENDLESS_BASE_URL ||
    "https://headwheel-us.backendless.app/api/data/";
  const res = await fetch(`${baseUrl}${endpoint}${query}`, options);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      `Failed to fetch ${endpoint}: ${data.message || res.statusText}`
    );
  }
  return data;
}
