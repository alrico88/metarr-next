'use client';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="alert alert-danger mb-0">{error.message}</div>
        </div>
      </div>
    </div>
  );
}
