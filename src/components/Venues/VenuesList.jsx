// src/components/Venues/VenuesList.jsx
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import IMAGE from '../../assets/image/default-image.png';
import FiltersForm from '../Forms/FiltersForm';
import { FaArrowRight } from 'react-icons/fa';

function VenuesList({ searchQuery, filterOptions, onFilterChange }) {
  // Accept the searchQuery prop
  const { venues, status, error } = useSelector((state) => state.venues);

  if (status === 'loading') return <div>Loading...</div>;
  if (error) return <div>Error: {error.toString()}</div>;
  if (!venues) return <div>No data available.</div>;

  // If searchQuery is undefined, consider it an empty string to prevent errors
  const query = (searchQuery || '').toLowerCase();

  // Filter venues based on the search query
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
  return (
    <section className="max-w-screen-xxl mx-auto p-4">
      <div className="grid grid-cols-12 gap-4">
        <div className="hidden md:block md:col-span-3">
          <FiltersForm onFilterChange={onFilterChange} />
        </div>
        <div className="col-span-12 md:col-span-9">
          <div className="flex flex-col gap-6">
            {filteredVenues.length > 0 ? (
              filteredVenues.map((venue) => (
                <Link
                  key={venue.id}
                  to={`/Venue/${venue.id}`}
                  className="relative z-20 w-full md:flex md:items-center cursor-default"
                >
                  <div className="absolute w-full md:bg-white/45 -z-10 md:h-80 xl:h-96 rounded-3xl md:border-4 md:border-white md:shadow-inner"></div>

                  <div className="group overflow-hidden w-full p-2 md:flex bg-white/45 rounded-3xl border-white border-4 md:border-none md:bg-transparent md:p-5 lg:pl-6 lg:pr-5 md:justify-evenly">
                    <img
                      className="transition-transform duration-700 transform group-hover:scale-105 object-cover rounded-2xl shadow-md w-full h-80 md:h-[18rem] md:max-w-[12rem] lg:h-[22rem] lg:max-w-[14rem] xl:h-[26rem] xl:min-w-[26rem] md:rounded-3xl"
                      src={venue.media.length > 0 ? venue.media[0].url : IMAGE}
                      alt={
                        venue.media.length > 0
                          ? venue.media[0].alt
                          : 'Default Image'
                      }
                    />
                    <div className="mt-4 w-full h-auto md:ml-3 md:my-0 lg:my-7 xl:ml-6 xl:my-9 flex flex-col">
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
                          <div className="border-4 px-4 py-1 border-white flex items-center rounded-tr-2xl rounded-bl-2xl justify-center bg-gradient-to-br from-pelorous-400 to-pelorous-200">
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
                          <button className="cursor-pointer w-fit py-1 px-4 lg:py-2 lg:px-6 flex  items-center rounded-full border-4 text-white font-semibold text-lg lg:text-xl border-white bg-gradient-to-br from-pelorous-400 to-pelorous-200 hover:from-pelorous-500 hover:to-pelorous-300">
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenuesList;

{
  /* <div className="flex flex-col p-4 leading-normal">
<h5 className="mb-2 md:max-w-64 lg:max-w-80 overflow-hidden whitespace-nowrap text-ellipsis text-2xl font-bold tracking-tight text-gray-900">
  {venue.name || 'Unknown Venue'}
</h5>
<Rating rating={venue.rating || 0} maxRating={5} />
{venue.location.city && (
  <p className="mb-3 md:max-w-64 lg:max-w-80 overflow-hidden whitespace-nowrap text-ellipsis text-sm font-bold text-gray-500">
    {venue.location.city}
  </p>
)}
<p className="mb-3 md:max-w-44 lg:max-w-80 font-normal line-clamp-2 lg:line-clamp-3 text-gray-700">
  {venue.description || 'No description'}
</p>
</div> */
}
