import { useState } from 'react';

import VenuesForm from '../../components/Forms/VenuesForm';
import TablesVenues from '../../components/Tables/TablesVenues';

/**
 * `ManagerProfile` is a React component for the manager's dashboard on the Holidaze platform.
 * This component allows venue managers to interact with various functionalities like viewing, editing, and creating venues,
 * as well as managing profiles. It provides a navigation system to switch between different views based on the manager's actions.
 *
 * @returns {JSX.Element} Renders the managerial dashboard with capabilities to switch between different management views.
 */

function ManagerProfile() {
  const [activeView, setActiveView] = useState('venue');
  const [selectedVenue, setSelectedVenue] = useState(null);

  const handleEditVenue = (venue) => {
    setSelectedVenue(venue);
    setActiveView('edit');
  };

  const getButtonClass = (view) => {
    return `inline-flex items-center h-12 px-4 py-2 text-sm text-center border-white sm:text-base rounded-t-md whitespace-nowrap focus:outline-none ${
      activeView === view ? 'border-2 border-b-0' : 'bg-transparent border-b-2'
    }`;
  };
  return (
    <section className="pt-24 pb-3">
      <div className="max-w-screen-xxl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
          Manager dashboard
        </h1>

        <p className="mt-4 text-gray-500 xl:mt-6">
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

          <div className="inline-flex items-center w-full h-12 px-4 py-2 text-sm text-center text-gray-700 bg-transparent border-b-2 border-white sm:text-base whitespace-nowrap cursor-base focus:outline-none"></div>
        </div>
      </div>

      {activeView === 'venue' && <TablesVenues onEditVenue={handleEditVenue} />}
      {(activeView === 'edit' || activeView === 'create') && (
        <VenuesForm mode={activeView} initialData={selectedVenue} />
      )}
    </section>
  );
}

export default ManagerProfile;
