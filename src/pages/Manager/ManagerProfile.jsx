function ManagerProfile() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-6 py-10 mx-auto">
          <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
            Manager dashboard
          </h1>

          <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
            Manage your Holidaze experience
          </p>

          <div className="flex overflow-x-auto whitespace-nowrap mt-4">
            <button className="inline-flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 border border-b-0 border-gray-300 sm:text-base dark:border-gray-500 rounded-t-md dark:text-white whitespace-nowrap focus:outline-none">
              Venue
            </button>

            <button className="inline-flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base dark:border-gray-500 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 dark:hover:border-gray-300">
              Create
            </button>

            <button className="inline-flex items-center h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base dark:border-gray-500 dark:text-white whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 dark:hover:border-gray-300">
              All profiles
            </button>
            <div className="inline-flex items-center w-full h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base whitespace-nowrap cursor-base focus:outline-none"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ManagerProfile;
