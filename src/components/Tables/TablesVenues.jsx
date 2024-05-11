// src/components/Tables/TablesVenues.jsx

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVenuesByProfile } from '../../features/profile/profileSlice';
import Rating from '../Rating/Rating';
import { format } from 'date-fns';
import DeleteModal from '../Modal/DeleteModal';
import { deleteVenue } from '../../features/venues/venuesSlice';

function TablesVenues({ onEditVenue }) {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);
  const token = useSelector((state) => state.user.token);
  const apiKey = useSelector((state) => state.user.apiKey);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedVenueId, setSelectedVenueId] = useState(null);

  const { venues, isLoading, error } = useSelector((state) => state.profile);

  useEffect(() => {
    if (currentUser && token && apiKey) {
      const { name } = currentUser;
      dispatch(fetchVenuesByProfile({ username: name, token, apiKey }));
    } else {
      console.error('User information is missing');
    }
  }, [dispatch, currentUser, token, apiKey]);

  const handleDeleteClick = (id) => {
    setSelectedVenueId(id);
    setDeleteModalOpen(true);
  };
  const handleEditClick = (id) => {
    const venueToEdit = venues.find((venue) => venue.id === id);
    if (venueToEdit) {
      onEditVenue(venueToEdit);
    }
  };

  const confirmDelete = () => {
    if (selectedVenueId) {
      dispatch(deleteVenue({ venueId: selectedVenueId, token, apiKey }))
        .then(() => {
          dispatch(
            fetchVenuesByProfile({ username: currentUser.name, token, apiKey })
          );
        })
        .finally(() => {
          setDeleteModalOpen(false);
        });
    }
  };

  const cancelDelete = () => {
    setDeleteModalOpen(false);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!venues.length) return <div>No venues found.</div>;
  return (
    <section className="container px-4 mx-auto">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800">Upcoming Venues</h2>

        <span className="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">
          {venues?.length}
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
                      <span>Booked</span>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      <span>Guests</span>
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
                      Created
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Updated
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
                    >
                      Price
                    </th>

                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {venues.map((profile, index) => {
                    return (
                      <tr key={profile.id || index}>
                        <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          <div className="inline-flex items-center gap-x-3">
                            <div className="flex items-center gap-x-2">
                              <img
                                className="object-cover w-20 h-20 rounded"
                                src={profile.media[0].url}
                                alt={profile.media[0].alt}
                              />
                              <div>
                                <h2 className="font-medium text-gray-800">
                                  {profile.name}
                                </h2>
                                <div className="text-sm font-normal text-gray-600">
                                  <Rating
                                    rating={profile.rating || 0}
                                    maxRating={5}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-12 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                          {profile._count.bookings}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {profile.maxGuests}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          <div className="flex flex-col">
                            <p>{profile.location.address},</p>
                            <p>{profile.location.city}</p>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {format(new Date(profile.created), 'dd.MM.yyyy')}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                          {format(new Date(profile.updated), 'dd.MM.yyyy')}
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-2">
                            <div className="flex flex-col items-start gap-x-2">
                              <p className=" text-sm text-gray-500 whitespace-nowrap">
                                {profile.price} $
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4 text-sm whitespace-nowrap">
                          <div className="flex items-center gap-x-6">
                            <button
                              onClick={() => handleDeleteClick(profile.id)}
                              className="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                />
                              </svg>
                              <span className="sr-only">Delete</span>
                            </button>

                            <button
                              onClick={() => handleEditClick(profile.id)}
                              className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth="1.5"
                                stroke="currentColor"
                                className="w-5 h-5"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                />
                              </svg>
                              <span className="sr-only">Edit</span>
                            </button>
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
      {isDeleteModalOpen && (
        <DeleteModal
          confirmDelete={confirmDelete}
          cancelDelete={cancelDelete}
        />
      )}
    </section>
  );
}

export default TablesVenues;
