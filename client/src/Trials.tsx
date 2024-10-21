import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';
import { Table } from './Table';
import { Trial } from './types';

export const Trials = () => {
  const [search, setSearch] = useState('');

  const trialsQuery = useQuery({
    queryKey: ['trials'],
    queryFn: async (): Promise<{ results: Trial[] }> => {
      const response = await axios.get(
        'http://localhost:4000',
        search
          ? {
              params: {
                query: search,
              },
            }
          : undefined
      );
      return response.data;
    },
  });

  return (
    <>
      <div className="flex space-x-3 items-center">
        <input
          type="text"
          className="border border-gray-400 px-2 py-1 rounded-md w-1/2 focus:outline-none focus:ring focus:border-blue-500 transition"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              trialsQuery.refetch();
            }
          }}
        />
        <button
          className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed"
          type="button"
          disabled={trialsQuery.isLoading || trialsQuery.isFetching || !search}
          onClick={() => trialsQuery.refetch()}
        >
          Search
        </button>
      </div>
      {trialsQuery.isLoading && <p>Loading...</p>}
      {trialsQuery.isError && <p>Error: {`${trialsQuery.error}`}</p>}
      {trialsQuery.data && <Table rows={trialsQuery.data.results} />}
    </>
  );
};
