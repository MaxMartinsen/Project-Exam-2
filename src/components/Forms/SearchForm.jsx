import { useState, useEffect } from 'react';
import useDebounce from '../../hooks/useDebounce';

/**
 * SearchForm component used for submitting search queries.
 * This form utilizes a debounced input to reduce the frequency of search operations,
 * enhancing performance and user experience by reducing unnecessary load.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSearch - Callback function that executes the search operation.
 *                                    This function is called with the search query whenever
 *                                    the user stops typing for a specified delay or submits the form.
 *
 * @returns {JSX.Element} The SearchForm component, consisting of an input field for entering
 *                        a search query and a submit button. The form ensures that search
 *                        queries are processed in an optimized manner using debouncing.                  on user input.
 */

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
      className="flex flex-col sm:flex-row w-full lg:w-[800px] md:flex-row items-center bg-white/45 rounded-3xl border-white border-2 p-4 gap-4 shadow-inner"
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
          className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-xl font-semibold focus:outline-none focus:ring-0 focus:border-pelorous-300 block w-full py-1 px-4 lg:py-2 lg:px-6"
          placeholder="Search for venue"
        />
      </div>
      <button
        type="submit"
        className="cursor-pointer w-fit py-1 px-4 lg:py-2 lg:px-6 flex  items-center rounded-xl border-2 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
