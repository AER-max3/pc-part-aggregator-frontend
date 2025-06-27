import React, { useState } from 'react';

export default function PcPartAggregatorApp() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://pc-parts-api.onrender.com/search?query=${query}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setResults(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">PC Part Aggregator</h1>
      <div className="flex gap-2 mb-4">
        <input
          className="border px-2 py-1 w-full"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search PC parts"
        />
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : Object.keys(results).length > 0 ? (
        Object.keys(results).map((source) => (
          <div key={source} className="mb-6">
            <h2 className="text-xl font-semibold mb-2">{source.toUpperCase()}</h2>
            <ul className="space-y-2">
              {results[source].map((item: any, index: number) => (
                <li key={index}>
                  <a className="text-blue-700 underline" href={item.link} target="_blank" rel="noopener noreferrer">
                    {item.name}
                  </a>
                  <span className="ml-2">- {item.price}</span>
                </li>
              ))}
            </ul>
          </div>
        ))
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
}