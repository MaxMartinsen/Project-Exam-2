// src/components/Hero/Hero.jsx
import SearchForm from '../Forms/SearchForm';
import { useSelector } from 'react-redux';

function Hero({ onSearch }) {
  const isLoggedIn = useSelector((state) => !!state.user.currentUser);
  return (
    <div className="bg-[url('/src/assets/image/hero-pattern.png')] w-full h-[300px] md:h-[600px] bg-cover flex flex-col justify-center">
      <section className="md:container md:mx-auto p-4">
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-4xl lg:text-5xl lg:leading-tight  xxl:text-6xl text-fuscous-gray-700 font-semibold xxl:leading-tight mt-24 md:mt-16 flex flex-col">
            Discover your next getaway
            <span className="hidden md:block">
              Explore great deals on hotels, vacation
            </span>
            <span className="hidden md:block">and more...</span>
          </h1>
        </div>
        <div className="flex items-center justify-center mt-5">
          <SearchForm onSearch={onSearch} isLoggedIn={isLoggedIn} />
        </div>
      </section>
    </div>
  );
}

export default Hero;
