// src/pages/Bookings/BookingsProfile.jsx
import TabletsBookings from '../../components/Tables/TabletsBookings';

function BookingsProfile() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="max-w-screen-xl px-6 py-10 mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
          Booking dashboard
        </h1>

        <p className="mt-4 text-gray-500 xl:mt-6 dark:text-gray-300">
          Manage your Holidaze experience
        </p>
      </div>

      <TabletsBookings />
    </section>
  );
}

export default BookingsProfile;
