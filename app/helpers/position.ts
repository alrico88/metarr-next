import { processNumber } from 'number-helper-functions';

export function getUserPosition(): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (err) => {
        reject(err);
      },
    );
  });
}

export function bearingToAzimuth(bearing: number): number {
  const corrected = bearing < 0 ? 360 + bearing : bearing;

  return processNumber(corrected, 0);
}
