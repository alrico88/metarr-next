interface IRawMetarProps {
  metar: string;
}

export default function RawMetar(props: IRawMetarProps) {
  return (
    <div className="row">
      <div className="col">
        <h5 className="fw-bold">METAR:</h5>
        <div className="alert alert-primary mb-0">{props.metar}</div>
      </div>
    </div>
  );
}
