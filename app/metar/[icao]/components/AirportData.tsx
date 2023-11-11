import { Airport, getAirportData } from '@/services/airportData';
import InfoTableRow from './InfoTableRow';

interface IAirportDataProps {
  icao: string;
  airportData: Airport;
}

export default async function AirportData(props: IAirportDataProps) {
  if (!props.airportData.icao) {
    return (
      <div className="alert alert-danger">
        Airport <span className="fw-bold">{props.icao}</span> not found
      </div>
    );
  }

  const niceElevation = Math.round(props.airportData.elevation);
  const runways = props.airportData.runwayCount;

  return (
    <>
      <div className="row">
        <div className="col-md-5">
          <h5 className="fw-bold">Airport info:</h5>
          <div className="card">
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-striped mb-0">
                  <tbody>
                    <InfoTableRow alignRight title="ICAO" value={props.icao} />
                    <InfoTableRow
                      alignRight
                      title="Airport name"
                      value={props.airportData.name}
                    />
                    <InfoTableRow
                      alignRight
                      title="Municipality"
                      value={props.airportData.municipality}
                    />
                    <InfoTableRow
                      alignRight
                      title="Elevation"
                      value={`${niceElevation}ft.`}
                    />
                    <InfoTableRow alignRight title="Runways" value={runways} />
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
