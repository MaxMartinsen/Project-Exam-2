// src/pages/Bookings/BookingsProfile.jsx
import TabletsBookings from '../../components/Tables/TabletsBookings';

function BookingsProfile() {
  return (
    <section className="bg-white">
      <div className="max-w-screen-xl px-6 py-10 mx-auto">
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
