import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Clone the request headers so that we don't modify the original headers object
  const requestHeaders = new Headers(request.headers)

  const country = (request.geo && request.geo.country) || ''
  const city = (request.geo && request.geo.city) || ''
  const latitude = (request.geo && request.geo.latitude) || ''
  const longitude = (request.geo && request.geo.longitude) || ''

  // requestHeaders.set('x-forwarded-for', ip)
  requestHeaders.set('x-country', country)
  requestHeaders.set('x-city', city)
  requestHeaders.set('x-latitude', latitude)
  requestHeaders.set('x-longitude', longitude)

  // Return a new request object with the updated headers using NextResponse.next()
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}
export const config = {
  matcher: '/',
}
