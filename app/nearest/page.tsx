'use client';

import { Suspense, useEffect, useState } from 'react';
import { bearingToAzimuth, getUserPosition } from '../helpers/position';
import type { NearestAirport } from '@/services/metar';
import { withQuery } from 'ufo';
import Link from 'next/link';
import { processNumber } from 'number-helper-functions';
import CheapRuler from 'cheap-ruler';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Nearest() {
  const [nearest, setNearest] = useState<
    (NearestAirport & { bearing: number })[]
  >([]);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getNearest() {
      try {
        setLoading(true);

        const userPos = await getUserPosition();

        const res = await fetch(
          withQuery('/api/nearest', {
            latitude: userPos.coords.latitude,
            longitude: userPos.coords.longitude,
          }),
          {
            next: {
              revalidate: 604800,
            },
          },
        );

        const list = (await res.json()) as NearestAirport[];

        const ruler = new CheapRuler(list[0].station.latitude);

        setNearest(
          list.map((d) => {
            return {
              ...d,
              bearing: ruler.bearing(
                [userPos.coords.longitude, userPos.coords.latitude],
                [d.station.longitude, d.station.latitude],
              ),
            };
          }),
        );
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getNearest();
  }, []);

  const listTable = nearest.map((airport) => {
    return (
      <tr key={airport.station.icao}>
        <td>{airport.station.icao}</td>
        <td>{airport.station.name}</td>
        <td>{bearingToAzimuth(airport.bearing)} º</td>
        <td>{processNumber(airport.nautical_miles)} nm.</td>
        <td>
          {airport.station.icao && (
            <Link href={`/metar/${airport.station.icao}`}>
              <button className="btn btn-primary">See METAR</button>
            </Link>
          )}
        </td>
      </tr>
    );
  });

  const emptyTable = (
    <tr>
      <td colSpan={5}>No airports found</td>
    </tr>
  );

  const loadingTable = (
    <tr>
      <td colSpan={5} className="text-center">
        <LoadingSpinner text="Loading nearest airports" />
      </td>
    </tr>
  );

  const tableContent = loading
    ? loadingTable
    : nearest.length > 0
    ? listTable
    : emptyTable;

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h5>Nearest airports</h5>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <table className="table table-striped table-bordered align-middle">
            <thead className="table-light">
              <tr>
                <th>ICAO</th>
                <th>Name</th>
                <th>Bearing</th>
                <th>Distance</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>{tableContent}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
