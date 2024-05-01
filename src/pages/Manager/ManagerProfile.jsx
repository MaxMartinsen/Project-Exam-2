// src/pages/Manager/ManagerProfile.jsx

import { useState } from 'react';
import VenuesForm from '../../components/Forms/VenuesForm';
import TablesProfiles from '../../components/Tables/TablesProfiles';
import TablesVenues from '../../components/Tables/TablesVenues';

function ManagerProfile() {
  const [activeView, setActiveView] = useState('venue');

  const getButtonClass = (view) => {
    return `inline-flex items-center h-12 px-4 py-2 text-sm text-center border-gray-300 sm:text-base rounded-t-md whitespace-nowrap focus:outline-none ${
      activeView === view ? 'border border-b-0' : 'bg-transparent border-b'
    }`;
  };
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          Manager dashboard
        </h1>

        <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
          Manage your Holidaze experience
        </p>

        <div className="flex overflow-x-auto whitespace-nowrap mt-4">
          <button
            onClick={() => setActiveView('venue')}
            className={getButtonClass('venue')}
          >
            Venue
          </button>

          <button
            onClick={() => setActiveView('create')}
            className={getButtonClass('create')}
          >
            Create
          </button>

          <button
            onClick={() => setActiveView('profiles')}
            className={getButtonClass('profiles')}
          >
            All profiles
          </button>
          <div className="inline-flex items-center w-full h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b border-gray-300 sm:text-base whitespace-nowrap cursor-base focus:outline-none"></div>
        </div>
      </div>

      {activeView === 'venue' && <TablesVenues />}
      {activeView === 'create' && <VenuesForm />}
      {activeView === 'profiles' && <TablesProfiles />}
    </section>
  );
}

export default ManagerProfile;
