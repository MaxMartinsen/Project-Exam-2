import SearchForm from '../Forms/SearchForm';
import { useSelector } from 'react-redux';

function Hero({ onSearch }) {
  const isLoggedIn = useSelector((state) => !!state.user.currentUser);
  return (
    <div className="bg-alizarin-crimson-50 w-full h-[300px] bg-cover flex justify-center items-center">
      <SearchForm onSearch={onSearch} isLoggedIn={isLoggedIn} />
    </div>
  );
}

export default Hero;
