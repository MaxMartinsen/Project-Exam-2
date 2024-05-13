import TabletsBookings from '../../components/Tables/TabletsBookings';

/**
 * `BookingsProfile` is a React component that serves as the main user interface for managing bookings on the Holidaze platform.
 * It provides a comprehensive overview and management tools for user's bookings, displayed through the `TabletsBookings` component.
 * This component acts as a dashboard where users can view and manage their booking details.
 *
 * @returns {JSX.Element} The BookingsProfile component, comprising a section with a header and the `TabletsBookings` component.
 */

function BookingsProfile() {
  return (
    <section className="pt-24 pb-3">
      <div className="max-w-screen-xxl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl">
          Booking dashboard
        </h1>

        <p className="mt-4 text-gray-500 xl:mt-6">
          Manage your Holidaze experience
        </p>
      </div>

      <TabletsBookings />
    </section>
  );
}

export default BookingsProfile;
