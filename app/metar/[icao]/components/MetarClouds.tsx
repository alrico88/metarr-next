import { IMetar } from '@/services/metar';
import IconCloud from '~icons/ic/outline-cloud-queue.jsx';

interface IMetarCloudsProps {
  metar: IMetar;
}

export default function MetarClouds(props: IMetarCloudsProps) {
  const cloudLayers = props.metar.clouds ?? [];

  const noClouds = (
    <tr>
      <td colSpan={2}>No clouds</td>
    </tr>
  );

  return (
    <div className="card">
      <div className="card-header">
        <IconCloud /> Clouds
      </div>
      <div className="card-body p-0">
        <table className="table table-striped table-bordered mb-0">
          <thead>
            <tr>
              <th>Condition</th>
              <th>Elevation (feet)</th>
            </tr>
          </thead>
          <tbody>
            {cloudLayers.length > 0
              ? cloudLayers.map((cloud) => {
                  return (
                    <tr key={cloud.code + cloud.base_feet_agl}>
                      <td>{cloud.code}</td>
                      <td>{cloud.base_feet_agl}</td>
                    </tr>
                  );
                })
              : noClouds}
          </tbody>
        </table>
      </div>
    </div>
  );
}
