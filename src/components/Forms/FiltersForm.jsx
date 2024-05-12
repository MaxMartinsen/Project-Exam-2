import { useState, useEffect } from 'react';

/**
 * FiltersForm component provides a set of inputs for filtering data based on specific criteria like amenities
 * and price range. It includes checkboxes for amenities and input fields for minimum and maximum price.
 * The form auto-updates the filters in the parent component through a callback function upon any change.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Function} props.onFilterChange - Callback function that is called whenever any filter value changes.
 * This function sends the updated filters back to the parent component.
 *
 * @returns {JSX.Element} A form with various filters that can be applied to search queries. Each input is managed
 * by local state and updates are propagated back to the parent via the `onFilterChange` callback.
 */

function FiltersForm({ onFilterChange }) {
  const [breakfast, setBreakfast] = useState(false);
  const [pets, setPets] = useState(false);
  const [wifi, setWifi] = useState(false);
  const [parking, setParking] = useState(false);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Function to handle checkbox changes
  const handleCheckboxChange = (setter) => (e) => {
    setter(e.target.checked);
  };

  // Function to handle price input changes
  const handlePriceChange = (setter) => (e) => {
    setter(e.target.value);
  };
  useEffect(() => {
    onFilterChange({
      breakfast,
      pets,
      wifi,
      parking,
      minPrice,
      maxPrice,
    });
  }, [breakfast, pets, wifi, parking, minPrice, maxPrice, onFilterChange]);
  return (
    <div className="sticky top-24">
      <form className="flex text-fuscous-gray-700 flex-col rounded-3xl bg-white/45 border-2 border-white shadow-inner p-4 leading-normal">
        <h2 className="font-bold border-b-2 border-white mb-4">Filters</h2>

        <h3 className="mb-2 font-semibold text-gray-90">Facilities</h3>
        <ul className="text-sm font-medium text-gray-900 mb-2">
          <li className="w-full border-b border-white rounded-t-lg ">
            <div className="flex items-center">
              <input
                id="breakfast-checkbox"
                type="checkbox"
                checked={breakfast}
                onChange={handleCheckboxChange(setBreakfast)}
                className="w-4 h-4 text-pelorous-400 bg-white/45 border-white rounded focus:ring-0"
              />
              <label
                htmlFor="breakfast-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                Breakfast included
              </label>
            </div>
          </li>
          <li className="w-full border-b border-white rounded-t-lg">
            <div className="flex items-center">
              <input
                id="pets-checkbox"
                type="checkbox"
                checked={pets}
                onChange={handleCheckboxChange(setPets)}
                className="w-4 h-4 text-pelorous-400 bg-white/45 border-white rounded focus:ring-0"
              />
              <label
                htmlFor="pets-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                Pets allowed
              </label>
            </div>
          </li>
          <li className="w-full border-b border-white rounded-t-lg">
            <div className="flex items-center">
              <input
                id="wifi-checkbox"
                type="checkbox"
                checked={wifi}
                onChange={handleCheckboxChange(setWifi)}
                className="w-4 h-4 text-pelorous-400 bg-white/45 border-white rounded focus:ring-0"
              />
              <label
                htmlFor="wifi-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
              >
                Free Wi-Fi
              </label>
            </div>
          </li>
          <li className="w-full border-b border-white rounded-t-lg">
            <div className="flex items-center">
              <input
                id="parking-checkbox"
                type="checkbox"
                checked={parking}
                onChange={handleCheckboxChange(setParking)}
                className="w-4 h-4 text-pelorous-400 bg-white/45 border-white rounded focus:ring-0"
              />
              <label
                htmlFor="parking-checkbox"
                className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
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
          className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:ring-0 focus:border-pelorous-300 block w-full py-1 px-4 "
        />
        <span className="border-2 my-2 mx-14 border-white"></span>
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
          className="bg-white/45 border-white border-2 rounded-xl text-fuscous-gray-700 text-sm font-semibold focus:ring-0 focus:border-pelorous-300 block w-full py-1 px-4 "
        />
      </form>
    </div>
  );
}

export default FiltersForm;
