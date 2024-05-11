// src/components/Tables/TablesProfile.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchBookingsByProfile } from '../../features/profile/profileSlice';
import Rating from '../Rating/Rating';
import { format } from 'date-fns';

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
    return <div>Loading bookings...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
  return (
    <section className="container px-4 mx-auto my-5">
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
                      className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <button className="flex items-center gap-x-2">
                        <svg
                          className="h-3"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.3"
                          />
                        </svg>
                        <span>Status</span>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-50"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Guests</span>
                      </button>
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
                <tbody className="bg-white divide-y divide-gray-200">
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
                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center px-3 py-1 rounded-full gap-x-2 bg-emerald-100/60">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>

                            <h2 className="text-sm font-normal text-emerald-500">
                              Active
                            </h2>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {booking.guests}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {booking.venue.location.address},{' '}
                          {booking.venue.location.city}
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
