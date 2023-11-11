import type { IMetar } from '@/services/metar';
import MetarConditions from './MetarConditions';
import MetarAltimeter from './MetarAltimeter';
import MetarClouds from './MetarClouds';
import MetarVisibility from './MetarVisibility';
import MetarWeather from './MetarWeather';
import MetarWind from './MetarWind';
import { Airport } from '@/services/airportData';
import MasonryController from './MasonryController';

interface IParsedMetarProps {
  metar: IMetar;
  airportData: Airport;
}

export default function ParsedMetar(props: IParsedMetarProps) {
  return (
    <>
      <div className="row">
        <div className="col">
          <h5 className="fw-bold">Parsed METAR:</h5>
          <p className="text-muted mb-1">
            Observed:{' '}
            {Intl.DateTimeFormat('en-GB', {
              dateStyle: 'full',
              timeStyle: 'short',
              timeZone: 'utc',
            }).format(props.metar.observed)}{' '}
            Z
          </p>
        </div>
      </div>
      <div className="row row-cols-md-2 row-cols-lg-3 grid g-3">
        <div className="col">
          <MetarConditions metar={props.metar} />
        </div>
        <div className="col">
          <MetarWind metar={props.metar} airportInfo={props.airportData} />
        </div>
        <div className="col">
          <MetarClouds metar={props.metar} />
        </div>
        <div className="col">
          <MetarAltimeter metar={props.metar} />
        </div>
        <div className="col">
          <MetarVisibility metar={props.metar} />
        </div>
        <div className="col">
          <MetarWeather metar={props.metar} />
        </div>
        <MasonryController containerClass=".grid" />
      </div>
    </>
  );
}
