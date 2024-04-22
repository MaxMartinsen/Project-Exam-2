function FiltersForm() {
  return (
    <div className="sticky top-24">
      <form className="flex flex-col bg-white border border-gray-200 rounded-lg shadow p-4 leading-normal">
        <h2 className="font-bold border-b-2 mb-4">Filters</h2>

        <h3 className="mb-2 font-semibold text-gray-90">Facilities</h3>
        <ul className="text-sm font-medium text-gray-900 mb-2">
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="breakfast-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="breakfast-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Breakfast included
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="pets-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="pets-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Pets allowed
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="wifi-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="wifi-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Free Wi-Fi
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="parking-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="parking-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Parking
              </label>
            </div>
          </li>
        </ul>
        <h3 className="font-semibold text-gray-90">Property rating</h3>
        <p className="mb-2 text-sm">Includes stars and other ratings</p>
        <ul className="text-sm font-medium text-gray-900 mb-2">
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="1star-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="1star-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                1 star
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="2stars-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="2stars-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                2 stars
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="3stars-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="3stars-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                3 stars
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="4stars-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="4stars-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                4 stars
              </label>
            </div>
          </li>
          <li className="w-full border-b border-gray-200 rounded-t-lg dark:border-gray-600">
            <div className="flex items-center">
              <input
                id="5stars-checkbox"
                type="checkbox"
                value=""
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              />
              <label
                htmlFor="5stars-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                5 stars
              </label>
            </div>
          </li>
        </ul>
        <h3 className="font-semibold text-gray-90 mb-2">Price Range</h3>
        <label
          htmlFor="min-price-input"
          className="block mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Select a min price:
        </label>
        <input
          type="number"
          id="min-price-input"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Min price"
        />
        <span className="border-2 my-2 mx-14"></span>
        <label
          htmlFor="max-price-input"
          className="block mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Select a max price:
        </label>
        <input
          type="number"
          id="max-price-input"
          aria-describedby="helper-text-explanation"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          placeholder="Max price"
        />
        <button
          type="button"
          className="text-white mt-2 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default FiltersForm;
