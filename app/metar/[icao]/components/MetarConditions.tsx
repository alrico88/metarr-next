'use client';

import { IMetar } from '@/services/metar';
import { useMemo, useState } from 'react';
import InfoTableRow from './InfoTableRow';
import SimpleChooser from '@/app/components/SimpleChooser';
import IconSun from '~icons/material-symbols/sunny-outline.jsx';
import { processNumber } from 'number-helper-functions';

type TempUnit = 'celsius' | 'fahrenheit';

interface IMetarConditionsProps {
  metar: IMetar;
}

export default function MetarConditions(props: IMetarConditionsProps) {
  const tempUnitsOpts = [
    {
      text: 'ºC',
      value: 'celsius',
    },
    {
      text: 'ºF',
      value: 'fahrenheit',
    },
  ];
  const [tempUnits, setTempUnits] = useState<TempUnit>('celsius');

  const flightConditionColor = (() => {
    switch (props.metar.flight_category) {
      case 'VFR':
        return '#4caf50';
      case 'MVFR':
        return '#F6C244';
      case 'IFR':
        return '#ff5722';
      default:
        return '#d32f2f';
    }
  })();

  const temperature = useMemo(() => {
    return processNumber(props.metar.temperature[tempUnits]);
  }, [props.metar, tempUnits]);

  const dewPoint = useMemo(() => {
    return processNumber(props.metar.dewpoint[tempUnits]);
  }, [props.metar, tempUnits]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="hstack gap-2 justify-content-between align-items-center">
          <div>
            <IconSun /> Conditions
          </div>
          <div>
            <SimpleChooser
              options={tempUnitsOpts}
              selected={tempUnits}
              onSelection={(val) => setTempUnits(val as unknown as TempUnit)}
            />
          </div>
        </div>
      </div>
      <div className="card-body">
        <table className="table table-borderless mb-0">
          <tbody>
            <InfoTableRow
              title="Flight conditions"
              value={props.metar.flight_category}
              valueColor={flightConditionColor}
              alignRight
            />
            <InfoTableRow title="Temperature" value={temperature} alignRight />
            <InfoTableRow title="Dew point" value={dewPoint} alignRight />
            <InfoTableRow
              title="Humidity"
              value={`${Math.round(props.metar.humidity_percent)}%`}
              alignRight
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
