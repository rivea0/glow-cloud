// Only with deployments on Vercel, will return undefined in local development
// See: https://vercel.com/guides/geo-ip-headers-geolocation-vercel-functions
export function GET(request: Request) {
  const city = request.headers.get('x-vercel-ip-city') ?? undefined;
  const country = request.headers.get('x-vercel-ip-country') ?? undefined;
  const latitude = request.headers.get('x-vercel-ip-latitude') ?? undefined;
  const longitude = request.headers.get('x-vercel-ip-longitude') ?? undefined;

  // Local testing:
  // const city = request.headers.get('x-vercel-ip-city') ?? 'Houston';
  // const country = request.headers.get('x-vercel-ip-country') ?? 'US';
  // const latitude = request.headers.get('x-vercel-ip-latitude') ?? 29.8131;
  // const longitude = request.headers.get('x-vercel-ip-longitude') ?? -95.3098;

  return new Response(
    JSON.stringify({
      city,
      country,
      latitude,
      longitude,
    }),
    {
      headers: { 'content-type': 'application/json' },
    }
  );
}
