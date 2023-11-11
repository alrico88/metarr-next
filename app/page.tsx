import BsFillCursorFill from '~icons/bi/cursor-fill';
import SearchInput from './components/SearchInput';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h5 className="fw-bold">Enter an airport:</h5>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 col-lg-9">
          <fieldset>
            <label htmlFor="icao" className="form-label">
              By ICAO:
            </label>
            <SearchInput />
          </fieldset>
        </div>
        <div className="col-md-6 col-lg-3">
          <fieldset>
            <label htmlFor="nearest" className="form-label">
              Search nearest:
            </label>
            <Link href="/nearest" className="btn btn-primary d-block">
              <BsFillCursorFill /> Get 10 nearest stations
            </Link>
          </fieldset>
        </div>
      </div>
    </div>
  );
}
