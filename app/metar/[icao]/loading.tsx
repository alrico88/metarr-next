import LoadingSpinner from '@/app/components/LoadingSpinner';

export default function Load() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <LoadingSpinner text="Gathering Airport info" />
        </div>
      </div>
    </div>
  );
}
