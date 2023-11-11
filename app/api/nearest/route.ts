import { getNearestStations } from '@/services/metar';
import type { NextRequest } from 'next/server';
import is from '@sindresorhus/is';

export async function GET(req: NextRequest) {
  const query = req.nextUrl.searchParams;
  const lat = query.get('latitude');
  const lon = query.get('longitude');

  if (is.nullOrUndefined(lat) || is.nullOrUndefined(lon)) {
    throw new Error('Latitude and longitude required');
  }

  return Response.json(await getNearestStations(Number(lat), Number(lon)));
}
