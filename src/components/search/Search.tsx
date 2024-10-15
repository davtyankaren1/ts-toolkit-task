import React, { useState } from 'react';

export const Search = () => {
  const [query, setQuery] = useState('');

  const handleSearch = (event: any) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input type="text" />
      <button>Search</button>
    </div>
  );
};
