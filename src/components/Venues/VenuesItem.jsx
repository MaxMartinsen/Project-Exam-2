import Rating from '../Rating/Rating';

import IMAGE from '../../assets/image/default-image.png';

function VenuesItem({ venue }) {
  console.log(venue);

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full dark:hidden"
              src={venue.media.length > 0 ? venue.media[0].url : IMAGE}
              alt={
                venue.media.length > 0 ? venue.media[0].alt : 'Default Image'
              }
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {venue.name}
            </h1>
            <div className="my-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                {venue.price} $ Night
              </p>
            </div>

            <Rating rating={venue.rating} maxRating={5} />

            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <a
                href="#"
                title=""
                className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                role="button"
              >
                Reserve
              </a>
            </div>

            <hr className="my-6 md:my-8 border-gray-200" />

            <p className="mb-6 text-gray-500">{venue.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default VenuesItem;
