'use client';

import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import BsSearch from '~icons/bi/search.jsx';

export default function SearchInput() {
  const [icao, setIcao] = useState('');
  const router = useRouter();

  function handleSearch(e: FormEvent): void {
    e.preventDefault();

    router.push(`/metar/${icao}`);
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="input-group">
        <input
          type="text"
          className="form-control"
          value={icao}
          onChange={(e) => setIcao(e.target.value.toUpperCase())}
        />
        <button className="btn btn-primary" type="submit">
          <BsSearch /> Search
        </button>
      </div>
    </form>
  );
}
