import { IoIosPersonAdd } from 'react-icons/io';
import { FaStarHalfAlt } from 'react-icons/fa';
import { FaMoneyBill1Wave } from 'react-icons/fa6';
import ImageForm from './ImageForm';

function VenuesForm() {
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Create Venue
        </h2>
      </div>
      <div>
        <form className="w-full h-full space-y-5">
          <div className="mt-4 md:max-w-64">
            <label
              htmlFor="name"
              className="block text-sm text-gray-500 dark:text-gray-300"
            >
              Venue name
            </label>

            <input
              id="name"
              type="text"
              minLength="4"
              required
              className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
            />

            <p className="mt-3 hidden text-xs text-red-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Location</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-96">
              <label
                htmlFor="address"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Adress
              </label>

              <input
                id="address"
                type="text"
                required
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-64 ">
              <label
                htmlFor="city"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                City
              </label>

              <input
                id="city"
                type="text"
                required
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-32 ">
              <label
                htmlFor="zip"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Zip
              </label>

              <input
                id="zip"
                type="text"
                required
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:w-80 ">
              <label
                htmlFor="country"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Country
              </label>

              <input
                id="country"
                type="text"
                required
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-64 ">
              <label
                htmlFor="continent"
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                Continent
              </label>

              <input
                id="continent"
                type="text"
                required
                className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-4 p-2.5"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
          </div>

          <h2 className="mb-4 font-semibold text-gray-900">Facilities</h2>
          <ul className="items-center w-full text-sm font-medium text-gray-900 border-gray-300 bg-white border rounded-lg sm:flex">
            <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  id="meta-checkbox-wifi"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="meta-checkbox-wifi"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Wi-Fi
                </label>
              </div>
            </li>
            <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  id="meta-checkbox-parking"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="meta-checkbox-parking"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Parking
                </label>
              </div>
            </li>
            <li className="w-full border-b sm:border-b-0 sm:border-r border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  id="meta-checkbox-breakfast"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="meta-checkbox-breakfast"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Breakfast
                </label>
              </div>
            </li>
            <li className="w-full border-gray-300">
              <div className="flex items-center ps-3">
                <input
                  id="meta-checkbox-pets"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="meta-checkbox-pets"
                  className="w-full py-3 ms-2 text-sm font-medium text-gray-900"
                >
                  Pets
                </label>
              </div>
            </li>
          </ul>

          <h2 className="mb-4 font-semibold text-gray-900">Property</h2>
          <div className=" grid md:grid-cols-3 gap-4">
            <div className="col-span-1">
              <label
                htmlFor="max-guests"
                className="block text-sm text-gray-500"
              >
                Guest&apos;s amount
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                  <IoIosPersonAdd className="h-5 w-5 text-gray-500" />
                </div>
                <input
                  type="text"
                  id="max-guests"
                  aria-describedby="helper-text-explanation"
                  className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 block w-full ps-10 p-2.5"
                  placeholder="1 - 999"
                  pattern="^\d{5}(-\d{4})?$"
                  required
                />
              </div>
              <p
                id="helper-text-explanation"
                className="mt-1 text-sm text-gray-500 dark:text-gray-400"
              >
                Please select a digit number from 1 to 999.
              </p>
            </div>
            <div className="col-span-1">
              <div className="col-span-1">
                <label htmlFor="rating" className="block text-sm text-gray-500">
                  Poll rating
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <FaStarHalfAlt className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="rating"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder="1 - 5"
                    pattern="^\d{5}(-\d{4})?$"
                    required
                  />
                </div>
                <p
                  id="helper-text-explanation"
                  className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  Please select a digit number from 1 to 5.
                </p>
              </div>
            </div>
            <div className="col-span-1">
              <div className="col-span-1">
                <label htmlFor="price" className="block text-sm text-gray-500">
                  Price per night
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 top-0 flex items-center ps-3.5 pointer-events-none">
                    <FaMoneyBill1Wave className="h-5 w-5 text-gray-500" />
                  </div>
                  <input
                    type="text"
                    id="price"
                    aria-describedby="helper-text-explanation"
                    className="bg-gray-50 mt-2 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5"
                    placeholder=""
                    pattern="^\d{5}(-\d{4})?$"
                    required
                  />
                </div>
                <p
                  id="helper-text-explanation"
                  className="mt-1 text-sm text-gray-500 dark:text-gray-400"
                >
                  Please select a digit number from 1.
                </p>
              </div>
            </div>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Details</h2>
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-500 dark:text-white"
            >
              Description
            </label>
            <textarea
              id="description"
              rows="4"
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Write your thoughts here..."
            ></textarea>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Gallery</h2>
          <div>
            <ImageForm />
          </div>
          <div>
            <button
              type="submit"
              className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              <svg
                className="me-1 -ms-1 w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Create Venue
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default VenuesForm;
