import SearchForm from '../Forms/SearchForm';

function Hero({ onSearch }) {
  return (
    <div className="bg-alizarin-crimson-50 w-full h-[300px] bg-cover flex justify-center items-center">
      <SearchForm onSearch={onSearch} />
    </div>
  );
}

export default Hero;
