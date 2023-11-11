'use client';

import { IMetar } from '@/services/metar';
import { useState } from 'react';
import InfoTableRow from './InfoTableRow';
import SimpleChooser from '@/app/components/SimpleChooser';
import BsEyeFill from '~icons/bi/eye-fill.jsx';

type DistanceUnit = 'meters' | 'miles';

interface IMetarVisibilityProps {
  metar: IMetar;
}

export default function MetarVisibility(props: IMetarVisibilityProps) {
  const [units, setUnits] = useState<DistanceUnit>('meters');

  const unitOpts = [
    {
      text: 'm.',
      value: 'meters',
    },
    {
      text: 'miles',
      value: 'miles',
    },
  ];

  const cavok = props.metar.raw_parts.includes('CAVOK');

  const visibility = props.metar.visibility[units];

  return (
    <div className="card">
      <div className="card-header">
        <div className="hstack gap-2 justify-content-between align-items-center">
          <div>
            <BsEyeFill /> Visibility
          </div>
          <div>
            <SimpleChooser
              options={unitOpts}
              selected={units}
              onSelection={(val) => setUnits(val as unknown as DistanceUnit)}
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-borderless mb-0">
          <tbody>
            <InfoTableRow title="CAVOK" value={cavok.toString()} alignRight />
            {cavok === false && (
              <InfoTableRow title="Distance" value={visibility} alignRight />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
