import { IMetar } from '@/services/metar';
import InfoTableRow from './InfoTableRow';
import { processNumber } from 'number-helper-functions';
import IconClock from '~icons/material-symbols/nest-clock-farsight-analog-rounded.jsx';

interface IMetarAltimeterProps {
  metar: IMetar;
}

export default function MetarAltimeter(props: IMetarAltimeterProps) {
  return (
    <div className="card">
      <div className="card-header">
        <IconClock /> Altimeter
      </div>
      <div className="card-body">
        <table className="table table-borderless mb-0">
          <tbody>
            <InfoTableRow
              title="Inches"
              value={processNumber(props.metar.barometer.hg)}
              alignRight
            />
            <InfoTableRow
              title="Millibars"
              value={processNumber(props.metar.barometer.mb)}
              alignRight
            />
          </tbody>
        </table>
      </div>
    </div>
  );
}
