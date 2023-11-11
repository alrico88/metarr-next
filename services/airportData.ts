export interface Airport {
  id: number;
  icao: string;
  latitude: number;
  longitude: number;
  country: string;
  name: string;
  elevation: number;
  runwayCount: number;
  municipality: string;
  runways: Runway[];
}

export interface Runway {
  ident: string;
  bearing: number;
  surface: string;
  length: number;
  width: number;
}

const ONE_DAY_IN_SECONDS = 86400;

export async function getAirportData(icao: string): Promise<Airport> {
  'use server';

  const call = await fetch(`https://airapi.vercel.app/api/airport/${icao}`, {
    next: {
      revalidate: ONE_DAY_IN_SECONDS,
    },
  });

  return call.json();
}
