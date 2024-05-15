import { useSelector } from 'react-redux';

import SearchForm from '../Forms/SearchForm';

/**
 * Hero component that displays a headline and a search form.
 * It encourages users to discover and search for getaways, hotels, and other accommodations.
 * This component dynamically adjusts based on the user's authentication status to provide
 * a more tailored interaction experience.
 *
 * @param {Object} props - The component props.
 * @param {Function} props.onSearch - Callback function that handles the search input submitted by the user.
 *                                    This function is passed down to the SearchForm component.
 * @returns {JSX.Element} The Hero component, which consists of a title, subtitle, and a search form that
 *                        uses Redux state to check if the user is logged in.
 */

function Hero({ onSearch }) {
  const isLoggedIn = useSelector((state) => !!state.user.currentUser);
  return (
    <section className="md:container md:mx-auto p-4 md:pt-24">
      <div className="text-left">
        <h1 className="text-3xl md:text-4xl lg:text-5xl lg:leading-tight  xxl:text-6xl text-fuscous-gray-700 font-semibold xxl:leading-tight mt-24 md:mt-16 flex flex-col">
          Discover your next getaway
          <span className="block">Explore great deals on hotels, vacation</span>
          <span className="block">and more...</span>
        </h1>
      </div>
      <div className="flex items-center justify-center mt-12">
        <SearchForm onSearch={onSearch} isLoggedIn={isLoggedIn} />
      </div>
    </section>
  );
}

export default Hero;
