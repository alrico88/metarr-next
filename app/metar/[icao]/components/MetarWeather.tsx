import { IMetar } from '@/services/metar';
import BiCloudRain from '~icons/bi/cloud-rain.jsx';

interface IMetarWeatherProps {
  metar: IMetar;
}

export default function MetarWeather(props: IMetarWeatherProps) {
  const conditions = props.metar.conditions ?? [];

  const noPhenomena = (
    <tr>
      <td>No phenomena</td>
    </tr>
  );

  return (
    <div className="card">
      <div className="card-header">
        <BiCloudRain /> Weather phenomena
      </div>
      <div className="card-body p-0">
        <table className="table table-striped table-bordered mb-0">
          <thead>
            <tr>
              <th>Phenomena</th>
            </tr>
          </thead>
          <tbody>
            {conditions.length > 0
              ? conditions.map((cond) => (
                  <tr key={cond.code}>
                    <td>{cond.code}</td>
                  </tr>
                ))
              : noPhenomena}
          </tbody>
        </table>
      </div>
    </div>
  );
}
