/**
 * NumberForm component provides a user interface for adjusting the number of guests within a specified range.
 * It includes "+" and "-" buttons to increment and decrement the guest count, as well as an input field for direct
 * manipulation of the number. The component ensures that the guest count does not exceed the maximum allowed guests
 * and does not drop below one.
 *
 * @param {Object} props - The properties passed to the component.
 * @param {number} props.guests - The current number of guests.
 * @param {Function} props.setGuests - A function to update the number of guests.
 * @param {Function} props.register - Method from react-hook-form to register the input field for validation.
 * @param {number} props.maxGuests - The maximum number of guests allowed.
 *
 * @returns {JSX.Element} A component with buttons for increasing and decreasing the guest count, and an input field for direct entry.
 */

function NumberForm({ guests, setGuests, register, maxGuests }) {
  const handleDecrease = () => {
    setGuests((g) => Math.max(1, g - 1));
  };

  const handleIncrease = () => {
    setGuests((g) => Math.min(maxGuests, g + 1));
  };

  const handleChange = (e) => {
    const newGuests = parseInt(e.target.value, 10);
    const validGuests = Math.min(Math.max(1, newGuests), maxGuests);
    setGuests(validGuests);
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
          className="bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 2"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M1 1h16"
            />
          </svg>
        </button>
        <input
          id="guests-input"
          type="number"
          value={guests}
          onChange={handleChange}
          {...register('guests', { required: true, min: 1 })}
          className="bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 text-base focus:ring-none focus:border-none block w-full pb-6"
          required
        />
        <div className="absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center text-lg text-pelorous-500 space-x-1 rtl:space-x-reverse">
          <span>Guests</span>
        </div>
        <button
          type="button"
          onClick={handleIncrease}
          className="bg-gradient-to-br from-pelorous-600 to-pelorous-400 hover:from-pelorous-500 hover:to-pelorous-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M9 1v16M1 9h16"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

export default NumberForm;
