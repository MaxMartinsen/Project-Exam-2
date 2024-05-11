// src/components/Forms/NumberForm.jsx

function NumberForm({ guests, setGuests, register, maxGuests }) {
  const handleDecrease = () => {
    setGuests((g) => Math.max(1, g - 1));
    console.log('Decreased guests count:', Math.max(1, guests - 1));
  };

  const handleIncrease = () => {
    setGuests((g) => Math.min(maxGuests, g + 1));
    console.log('Increased guests count:', Math.min(maxGuests, guests + 1));
  };

  const handleChange = (e) => {
    const newGuests = parseInt(e.target.value, 10);
    const validGuests = Math.min(Math.max(1, newGuests), maxGuests);
    setGuests(validGuests);
    console.log('Changed guests count:', validGuests);
  };
  return (
    <>
      <label htmlFor="guests-input" className="sr-only">
        Choose guests:
      </label>
      <div className="relative flex items-center">
        <button
          type="button"
          onClick={handleDecrease}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          type="number"
          value={guests}
          onChange={handleChange}
          {...register('guests', { required: true, min: 1 })}
          className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-base focus:ring-none focus:border-none block w-full pb-6"
          required
        />
        <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-base text-gray-400 space-x-1 rtl:space-x-reverse">
          <svg
            className="w-2.5 h-2.5 text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z"
            />
          </svg>
          <span>Guests</span>
        </div>
        <button
          type="button"
          onClick={handleIncrease}
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default NumberForm;
