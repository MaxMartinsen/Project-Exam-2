import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import FiltersForm from '../Forms/FiltersForm';

import IMAGE from '../../assets/image/default-image.png';
import { FaArrowRight } from 'react-icons/fa';

import SkeletonList from '../Skeleton/SkeletonList';

/**
 * VenuesList component displays a list of venues filtered by search queries and additional filter options.
 * It fetches venue data from the Redux store and renders each venue as a link to its detailed view.
 * The component also supports pagination by loading more venues on demand.
 *
 * @param {Object} props - The props passed to the component.
 * @param {string} props.searchQuery - The search term used to filter venues based on their name, city, or country.
 * @param {Object} props.filterOptions - Contains various criteria used to filter venues, such as amenities and price range.
 *    @param {boolean} props.filterOptions.breakfast - Filter for venues offering breakfast.
 *    @param {boolean} props.filterOptions.pets - Filter for pet-friendly venues.
 *    @param {boolean} props.filterOptions.wifi - Filter for venues with WiFi availability.
 *    @param {boolean} props.filterOptions.parking - Filter for venues with parking availability.
 *    @param {number} props.filterOptions.minPrice - Minimum price filter.
 *    @param {number} props.filterOptions.maxPrice - Maximum price filter.
 * @param {Function} props.onFilterChange - Callback function triggered when filter options change.
 *
 * @returns {JSX.Element} A responsive grid of venue cards, each providing a brief overview and a link to the detailed venue page.
 * Each card displays essential venue details like name, location, price, and rating. If no venues match the filters, a message is displayed.
 * If more venues are available beyond the initial display limit, a "Load More" button is presented.
 */

function VenuesList({ searchQuery, filterOptions, onFilterChange }) {
  const { venues, status, error } = useSelector((state) => state.venues);
  const [displayedVenuesCount, setDisplayedVenuesCount] = useState(12);

  if (status === 'loading') return <SkeletonList />;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!venues) return <div>No data available.</div>;

  const query = (searchQuery || '').toLowerCase();

  const filteredVenues = venues.filter((venue) => {
    const matchQuery =
      venue.name.toLowerCase().includes(query) ||
      venue.location.city?.toLowerCase().includes(query) ||
      venue.location.country?.toLowerCase().includes(query);

    const matchFacilities =
      (!filterOptions.breakfast || venue.meta.breakfast) &&
      (!filterOptions.pets || venue.meta.pets) &&
      (!filterOptions.wifi || venue.meta.wifi) &&
      (!filterOptions.parking || venue.meta.parking);

    const matchPrice =
      (!filterOptions.minPrice || venue.price >= filterOptions.minPrice) &&
      (!filterOptions.maxPrice || venue.price <= filterOptions.maxPrice);

    return matchQuery && matchFacilities && matchPrice;
  });

  const displayedVenues = filteredVenues.slice(0, displayedVenuesCount);

  const handleLoadMore = () => {
    setDisplayedVenuesCount((prevCount) => prevCount + 12);
  };
  return (
    <section className="max-w-screen-xxl mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="hidden md:block md:col-span-3">
          <FiltersForm onFilterChange={onFilterChange} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="flex flex-col gap-6">
            {displayedVenues.length > 0 ? (
              displayedVenues.map((venue) => (
                <Link
                  key={venue.id}
                  to={`/Venue/${venue.id}`}
                  className="relative z-20 w-full md:flex md:items-center cursor-default"
                >
                  <div className="absolute w-full md:bg-white/45 -z-10 md:h-80 xl:h-96 rounded-3xl md:border-2 md:border-white md:shadow-inner"></div>

                  <div className="group overflow-hidden w-full p-2 md:flex bg-white/45 rounded-3xl border-white border-2 md:border-none md:bg-transparent md:px-5 lg:px-6 md:justify-evenly">
                    <img
                      className="transition-transform duration-700 transform group-hover:scale-105 object-cover rounded-2xl shadow-md w-full h-80 md:h-[18rem] md:max-w-[12rem] lg:h-[22rem] lg:max-w-[14rem] xl:h-[26rem] xl:min-w-[26rem] md:rounded-3xl"
                      src={venue.media.length > 0 ? venue.media[0].url : IMAGE}
                      alt={
                        venue.media.length > 0
                          ? venue.media[0].alt
                          : 'Default Image'
                      }
                    />
                    <div className="mt-4 w-full h-auto md:ml-3 md:my-1 lg:my-10 xl:ml-6 flex flex-col">
                      <div className="flex justify-between">
                        <div className="flex flex-col">
                          <h3 className="text-2xl xl:text-3xl font-semibold tracking-tight text-fuscous-gray-700 max-w-60 md:max-w-60 lg:max-w-80 xxl:max-w-96 overflow-hidden whitespace-nowrap text-ellipsis">
                            {venue.name || 'Unknown Venue'}
                          </h3>
                          <h4 className="text-mountain-mist-400 text-xl font-semibold tracking-tight max-w-60 md:max-w-60 lg:max-w-80 overflow-hidden whitespace-nowrap text-ellipsis">
                            {venue.location.city || ' '}
                          </h4>
                        </div>
                        <div className="hidden sm:flex flex-col">
                          <div className="border-2 px-4 py-1 border-white flex items-center rounded-tr-2xl rounded-bl-2xl justify-center bg-pelorous-400">
                            <span className="text-white font-semibold text-xl lg:text-2xl">
                              {Math.floor(venue.rating) || '0'}
                            </span>
                          </div>
                          <span className="text-sm text-end text-mine-shaft-900">
                            Rating
                          </span>
                        </div>
                      </div>

                      <div className="border-s-4 border-pelorous-400 mt-1 xl:mt-4 text-lg leading-relaxed text-white md:text-xl">
                        <div className="ml-2 xl:ml-4 pr-14">
                          <h4 className="text-xl font-semibold tracking-tight text-fuscous-gray-700">
                            Description
                          </h4>
                          <p className="text-xl font-normal tracking-tight text-fuscous-gray-700    line-clamp-1 sm:line-clamp-2 xl:line-clamp-3">
                            {venue.description || ' '}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col mt-auto justify-end">
                        <div className="flex flex-col items-end my-4 md:my-2 text-mine-shaft-900">
                          <p className="flex">
                            Max.Guests:{' '}
                            <span className="line-clamp-1 ml-1">
                              {venue.maxGuests || '1'}
                            </span>
                          </p>
                          <h4 className="font-semibold text-xl">
                            <span className="mr-1">{venue.price}</span>$
                          </h4>
                          <span className="text-xs">
                            Includes taxes and charges
                          </span>
                        </div>
                        <div className="flex flex-col items-end">
                          <button className="cursor-pointer w-fit py-1 px-4 lg:py-2 lg:px-6 flex  items-center rounded-2xl border-2 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300">
                            See availability
                            <FaArrowRight className="ml-6" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div>No venues found for {searchQuery}.</div>
            )}
            {displayedVenues.length < filteredVenues.length && (
              <div className="flex items-center justify-center">
                <button
                  className="cursor-pointer w-fit py-1 px-4 lg:py-2 lg:px-6 flex  items-center rounded-2xl border-2 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300"
                  onClick={handleLoadMore}
                >
                  More Venues
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenuesList;
