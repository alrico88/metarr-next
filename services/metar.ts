import { withQuery } from 'ufo';
import parser from 'aewx-metar-parser';

export interface IMetar {
  raw_text: string;
  raw_parts: string[];
  icao: string;
  observed: Date;
  wind: {
    degrees: number;
    speed_kts: number;
    speed_mps: number;
    gust_kts: number;
    gust_mps: number;
  };
  visibility: {
    miles: string;
    miles_float: number;
    meters: string;
    meters_float: number;
  };
  conditions: {
    code: string;
  }[];
  clouds: {
    code: string;
    base_feet_agl: number;
    base_meters_agl: number;
  }[];
  ceiling: {
    code: string;
    feet_agl: number;
    meters_agl: number;
  };
  temperature: {
    celsius: number;
    fahrenheit: number;
  };
  dewpoint: {
    celsius: number;
    fahrenheit: number;
  };
  humidity_percent: number;
  barometer: {
    hg: number;
    kpa: number;
    mb: number;
  };
  flight_category: string;
}

const headers = {
  Authorization: `Token ${process.env.API_TOKEN}`,
};

export async function getMetar(icao: string): Promise<IMetar | null> {
  'use server';

  const url = withQuery(`https://avwx.rest/api/metar/${icao}`, {
    airport: true,
    reporting: true,
    format: 'json',
    onfail: 'cache',
  });

  const THREE_MINUTES_IN_SECONDS = 180;

  const call = await fetch(url, {
    headers,
    next: {
      revalidate: THREE_MINUTES_IN_SECONDS,
    },
  });

  const data = await call.json();

  return data.sanitized ? (parser(data.sanitized) as IMetar) : null;
}

export interface NearestAirport {
  station: {
    icao: string;
    name: string;
    latitude: number;
    longitude: number;
  };
  nautical_miles: number;
}

export async function getNearestStations(
  latitude: number,
  longitude: number,
): Promise<NearestAirport[]> {
  'use server';

  const url = withQuery(
    `https://avwx.rest/api/station/near/${latitude},${longitude}`,
    {
      n: 10,
      airport: true,
      reporting: true,
      format: 'json',
    },
  );

  const data = await fetch(url, {
    headers,
    next: {
      revalidate: false,
    },
  });

  return data.json();
}
