'use client';

export default function Error(_props: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="alert alert-danger mb-0">
            Airport or METAR not found
          </div>
        </div>
      </div>
    </div>
  );
}
