import { getMetar } from '@/services/metar';
import AirportData from './components/AirportData';
import RawMetar from './components/RawMetar';
import ParsedMetar from './components/ParsedMetar';
import { getAirportData } from '@/services/airportData';

export default async function Metar({ params }: { params: { icao: string } }) {
  const airportData = await getAirportData(params.icao);

  if (!airportData.icao) {
    throw new Error('Airport not found');
  }

  const metar = await getMetar(params.icao);

  const noMetar = <div className="alert alert-danger">No METAR found</div>;

  return (
    <div className="container">
      <div className="vstack gap-2">
        <AirportData icao={params.icao} airportData={airportData} />
        {metar ? (
          <>
            <RawMetar metar={metar.raw_text} />
            <ParsedMetar metar={metar} airportData={airportData} />
          </>
        ) : (
          noMetar
        )}
      </div>
    </div>
  );
}
