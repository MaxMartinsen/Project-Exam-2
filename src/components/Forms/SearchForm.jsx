import { IoLocationOutline } from 'react-icons/io5';

function SearchForm() {
  return (
    <form className="w-full md:w-[448px] mx-auto my-3 px-2">
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only"
      >
        Search
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <IoLocationOutline />
        </div>
        <input
          type="search"
          id="default-search"
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-alizarin-crimson-500 focus:border-alizarin-crimson-500"
          placeholder="Search for city, country or venue name"
          required
        />
        <button
          type="submit"
          className="absolute flex items-center justify-center w-24 top-0 end-0 p-2.5 text-sm font-medium h-full text-white bg-alizarin-crimson-600 rounded-e-lg border border-alizarin-crimson-500 hover:bg-alizarin-crimson-500 focus:ring-4 focus:outline-none focus:ring-blue-300"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
          <span className="sr-only">Search</span>
        </button>
      </div>
    </form>
  );
}

export default SearchForm;
