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
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border hidden:border-red-400 bg-white px-5 py-2.5 text-gray-700 hidden:focus:border-red-400 focus:outline-none focus:ring hidden:focus:ring-red-300 focus:ring-opacity-40"
            />

            <p className="mt-3 hidden text-xs text-red-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
          <h2 className="mb-4 font-semibold text-gray-900">Location</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:max-w-64 ">
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
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border hidden:border-red-400 bg-white px-5 py-2.5 text-gray-700 hidden:focus:border-red-400 focus:outline-none focus:ring hidden:focus:ring-red-300 focus:ring-opacity-40"
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
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border hidden:border-red-400 bg-white px-5 py-2.5 text-gray-700 hidden:focus:border-red-400 focus:outline-none focus:ring hidden:focus:ring-red-300 focus:ring-opacity-40"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-48 ">
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
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border hidden:border-red-400 bg-white px-5 py-2.5 text-gray-700 hidden:focus:border-red-400 focus:outline-none focus:ring hidden:focus:ring-red-300 focus:ring-opacity-40"
              />

              <p className="mt-3 hidden text-xs text-red-400">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </p>
            </div>
            <div className="md:max-w-64 ">
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
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border hidden:border-red-400 bg-white px-5 py-2.5 text-gray-700 hidden:focus:border-red-400 focus:outline-none focus:ring hidden:focus:ring-red-300 focus:ring-opacity-40"
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
                className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border hidden:border-red-400 bg-white px-5 py-2.5 text-gray-700 hidden:focus:border-red-400 focus:outline-none focus:ring hidden:focus:ring-red-300 focus:ring-opacity-40"
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
        </form>
      </div>
    </section>
  );
}

export default VenuesForm;
