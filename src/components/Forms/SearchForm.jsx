// src/components/Forms/SearchForm.jsx
import { useState, useEffect } from 'react';

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function SearchForm({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchQuery.trim() ? searchQuery : '');
  };

  useEffect(() => {
    if (debouncedSearchQuery.trim()) {
      onSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery, onSearch]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row w-full lg:w-[800px] md:flex-row items-center bg-white/45 rounded-3xl border-white border-4 p-4 gap-4 shadow-inner"
    >
      <div className="w-full">
        <label htmlFor="location" className="sr-only">
          Search location
        </label>
        <input
          id="location"
          type="text"
          value={searchQuery}
          onChange={handleChange}
          className="bg-white/45 border-white border-4 rounded-xl text-fuscous-gray-700 text-xl font-semibold focus:ring-0 focus:border-pelorous-300 block w-full py-1 px-4 lg:py-2 lg:px-6"
          placeholder="Search for venue"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer w-fit py-1 px-4 lg:py-2 lg:px-6 flex  items-center rounded-xl border-4 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-400 to-pelorous-200 hover:from-pelorous-500 hover:to-pelorous-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
