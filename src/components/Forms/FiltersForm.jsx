import { useState } from 'react';

function FiltersForm({ onFilterChange }) {
  // State for filter options
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Function to update filters and notify parent
  const updateFilters = () => {
    onFilterChange({
      breakfast,
      pets,
      wifi,
      parking,
      minPrice,
      maxPrice,
    });
  };

  // Function to handle checkbox change
  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
    updateFilters();
  };

  // Function to handle price change
  const handlePriceChange = (setter) => (e) => {
    setter(e.target.value);
    updateFilters();
  };
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
                checked={breakfast}
                onChange={handleCheckboxChange(setBreakfast)}
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
                checked={pets}
                onChange={handleCheckboxChange(setPets)}
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
                checked={wifi}
                onChange={handleCheckboxChange(setWifi)}
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
                checked={parking}
                onChange={handleCheckboxChange(setParking)}
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
        <h3 className="font-semibold text-gray-90 mb-2">Price Range</h3>
        <label
          htmlFor="min-price"
          className="block mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Select a min price:
        </label>
        <input
          id="min-price"
          type="number"
          placeholder="Min price"
          value={minPrice}
          onChange={handlePriceChange(setMinPrice)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
        <span className="border-2 my-2 mx-14"></span>
        <label
          htmlFor="max-price"
          className="block mb-2 text-sm font-medium text-gray-900 sr-only"
        >
          Select a max price:
        </label>
        <input
          id="max-price"
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={handlePriceChange(setMaxPrice)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        />
      </form>
    </div>
  );
}

export default FiltersForm;
