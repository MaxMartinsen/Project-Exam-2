// src/components/Forms/SearchForm.jsx
import { useState, useEffect } from 'react';
import { MdOutlineLocationCity } from 'react-icons/md';

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
    <div className="relative">
      <form
        onSubmit={handleSubmit}
        className="relative flex flex-col md:flex-row items-center mx-auto bg-orange-500 bg-opacity-80 p-4 rounded-xl gap-4"
      >
        <div className="relative w-full">
          <label htmlFor="location" className="sr-only">
            Search location
          </label>
          <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <MdOutlineLocationCity className="text-gray-500 w-6 h-6" />
          </div>
          <input
            id="location"
            type="text"
            value={searchQuery}
            onChange={handleChange}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
            placeholder="Search for venue"
          />
        </div>
        <button
          type="submit"
          className="tracking-widest inline-flex items-center py-2.5 px-3 text-sm font-bold text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchForm;
