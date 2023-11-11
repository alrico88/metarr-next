'use client';

import { IMetar } from '@/services/metar';
import { ReactElement, useMemo, useState } from 'react';
import SimpleChooser from '@/app/components/SimpleChooser';
import BiWind from '~icons/bi/wind.jsx';
import { processNumber } from 'number-helper-functions';
import { Airport } from '@/services/airportData';
import BiArrowUp from '~icons/bi/arrow-up.jsx';
import { bearingToAzimuth } from '@/app/helpers/position';

type SpeedUnit = 'speed_mps' | 'speed_kts';

function feetToMeters(feet: number): number {
  return feet / 3.281;
}

interface IMetarWindProps {
  airportInfo: Airport;
  metar: IMetar;
}

export default function MetarWind(props: IMetarWindProps) {
  const [windUnits, setWindUnits] = useState<SpeedUnit>('speed_kts');

  const windUnitsOpts = [
    {
      text: 'ms/s',
      value: 'speed_mps',
    },
    {
      text: 'Knots',
      value: 'speed_kts',
    },
  ];

  const windSpeed = useMemo(
    () => processNumber(props.metar.wind[windUnits]),
    [windUnits, props.metar],
  );
  const windUnitsText = useMemo(
    () => windUnitsOpts.find((d) => d.value === windUnits)?.text,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [windUnits],
  );

  return (
    <div className="card">
      <div className="card-header">
        <div className="hstack gap-2 justify-content-between align-items-center">
          <div>
            <BiWind /> Wind
          </div>
          <div>
            <SimpleChooser
              options={windUnitsOpts}
              selected={windUnits}
              onSelection={(val) => setWindUnits(val as unknown as SpeedUnit)}
            />
          </div>
        </div>
      </div>
      <div className="card-body p-0">
        <div className="row mb-2">
          <div className="col">
            <div className="p-3">
              <div className="row">
                <div className="col">
                  <h5 className="fw-bold">Speed:</h5>
                  <p className="font-monospace mb-0">
                    {windSpeed} {windUnitsText}
                  </p>
                </div>
                <div className="col">
                  <h5 className="fw-bold">Coming from:</h5>
                  <p className="font-monospace mb-0">
                    {props.metar.wind.degrees}º
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-bordered table-striped mb-0">
          <thead className="table-light">
            <tr>
              <th>Rwy.</th>
              <th>Surface</th>
              <th>Length</th>
              <th>Width</th>
              <th>Wind</th>
            </tr>
          </thead>
          <tbody>
            {props.airportInfo.runways.map(
              ({ ident, bearing, surface, length, width }) => {
                const lengthInKm = processNumber(
                  feetToMeters(length) / 1000,
                  1,
                );
                const widthInM = processNumber(feetToMeters(width), 1);

                let runwayWind: ReactElement | string = '??';

                if (props.metar.wind.degrees) {
                  const runwayWindBearing =
                    bearingToAzimuth(props.metar.wind.degrees - bearing) - 180;

                  const style = {
                    transform: `rotate(${runwayWindBearing}deg)`,
                  };

                  runwayWind = <BiArrowUp style={style} />;
                }

                return (
                  <tr key={ident}>
                    <td>{ident}</td>
                    <td>{surface}</td>
                    <td>{lengthInKm} km.</td>
                    <td>{widthInM} m.</td>
                    <td className="text-center">{runwayWind}</td>
                  </tr>
                );
              },
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
