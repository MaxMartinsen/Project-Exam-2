// src/components/Hero/Hero.jsx
import SearchForm from '../Forms/SearchForm';
import { useSelector } from 'react-redux';

function Hero({ onSearch }) {
  const isLoggedIn = useSelector((state) => !!state.user.currentUser);
  return (
    <div className="bg-[url('/src/assets/image/hero-pattern.png')] w-full h-[500px] bg-cover flex justify-center items-center">
      <SearchForm onSearch={onSearch} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Hero;
