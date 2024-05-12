// src/components/Tables/TablesProfile.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsByProfile } from '../../features/profile/profileSlice';
import Rating from '../Rating/Rating';
import { format } from 'date-fns';
import { formatAddress } from '../../utils/addressUtils';
import SkeletonItem from './../Skeleton/SkeletonItem';

function calculateTotalPrice(dateFrom, dateTo, pricePerNight) {
  if (!dateFrom || !dateTo || pricePerNight <= 0) return 0;

  const timeDiff = Math.abs(dateTo - dateFrom);
  const dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return dayCount * pricePerNight;
}

// Function to calculate total nights
function calculateTotalNights(dateFrom, dateTo) {
  if (!dateFrom || !dateTo) return 0;

  const timeDiff = Math.abs(dateTo - dateFrom);
  const totalNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return totalNights;
}

function TabletsBookings() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);

  const { bookings, isLoading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (currentUser && token && apiKey) {
      const { name } = currentUser;
      dispatch(fetchBookingsByProfile({ username: name, token, apiKey }));
    } else {
      console.error('User information is missing');
    }
  }, [dispatch, currentUser, token, apiKey]);

  if (isLoading) {
    return <SkeletonItem />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className="max-w-screen-xxl px-4 mx-auto my-5">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">Upcoming bookings</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {bookings.length}
        </span>
      </div>

      <div className="flex flex-col mt-6">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name Venue</span>
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Guests
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Location
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Price
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/45 divide-y divide-white">
                  {bookings.map((booking, index) => {
                    const dateFrom = new Date(booking.dateFrom);
                    const dateTo = new Date(booking.dateTo);

                    const totalPrice = calculateTotalPrice(
                      dateFrom,
                      dateTo,
                      booking.venue.price
                    );

                    const totalNights = calculateTotalNights(dateFrom, dateTo);

                    return (
                      <tr key={booking.id || index}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-20 h-20 rounded"
                                src={booking.venue.media[0].url}
                                alt={booking.venue.media[0].alt}
                              />
                              <div>
                                <h2 className="font-medium text-gray-800">
                                  {booking.venue.name}
                                </h2>
                                <div className="text-sm font-normal text-gray-600">
                                  <Rating
                                    rating={booking.venue.rating || 0}
                                    maxRating={5}
                                  />
                                </div>
                                <p className="text-sm font-normal text-gray-600">
                                  {format(
                                    new Date(booking.dateFrom),
                                    'dd.MM.yyyy'
                                  )}{' '}
                                  -{' '}
                                  {format(
                                    new Date(booking.dateTo),
                                    'dd.MM.yyyy'
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {booking.guests}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {formatAddress(booking.venue)}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex flex-col items-start gap-x-2">
                            <p className=" text-sm text-gray-500 whitespace-nowrap">
                              {totalPrice} $
                            </p>
                            <p className="text-sm text-gray-500 whitespace-nowrap">
                              {totalNights} Nights
                            </p>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TabletsBookings;
