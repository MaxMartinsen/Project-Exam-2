// src/components/Forms/BookingForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDisableCalendarDates } from '../../hooks/useDisableCalendarDates';

function BookingForm({ bookings, onSubmit, venueId, maxGuests }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { disabledDates } = useDisableCalendarDates({
    bookings,
    venueId,
    maxGuests,
  });

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [guests, setGuests] = useState(1);

  const submitHandler = async (formData) => {
    const { startDate, endDate } = range[0];

    if (startDate >= endDate) {
      console.error('Invalid date range: startDate must be before endDate');
      return;
    }

    const startOfDay = new Date(
      Date.UTC(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate()
      )
    );
    const endOfDay = new Date(
      Date.UTC(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())
    );

    const bookingData = {
      dateFrom: startOfDay.toISOString(),
      dateTo: endOfDay.toISOString(),
      guests: parseInt(formData.guests, 10),
      venueId,
    };

    console.log('Booking form data:', bookingData);
    await onSubmit(bookingData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3 mt-3"
    >
      <div className="flex flex-col justify-center mb-4 gap-4">
        <div className="flex justify-around">
          <h2>Check in</h2>
          <h2>Check out</h2>
        </div>
        <div>
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            className="calendarElement w-full"
            rangeColors={['#4e577f']}
            minDate={new Date()}
            disabledDates={disabledDates}
          />
        </div>
      </div>

      <label htmlFor="guests-input" className="sr-only">
        Choose guests:
      </label>
      <div className="relative flex items-center">
        <button
          type="button"
          id="decrement-button"
          data-input-counter-decrement="guests-input"
          className="bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100  focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
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
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          placeholder="Number of guests"
          {...register('guests', { required: true, min: 1 })}
          data-input-counter
          data-input-counter-min="1"
          data-input-counter-max="5"
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
          id="increment-button"
          data-input-counter-increment="guests-input"
          className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
        >
          <svg
            className="w-3 h-3 text-gray-900 dark:text-white"
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
      {errors.guests && (
        <p className="text-red-500">Please enter a valid number of guests.</p>
      )}

      <button
        type="submit"
        className="w-full mt-4 px-2.5 py-4 rounded text-white font-bold text-xl bg-athens-gray-700 hover:bg-athens-gray-800 active:bg-athens-gray-900"
      >
        Book
      </button>

      <div className="flex items-start justify-between mt-4">
        <h2>Price per night</h2>
        <p>
          <span>$</span>
        </p>
      </div>
      <div className="flex items-start justify-between mt-4">
        <h2>Number of nights</h2>
        <span></span>
      </div>
      <div className="flex items-start justify-between mt-2 pt-4 border-t-4">
        <h2 className="">Total price</h2>
        <p>
          <span>$</span>
        </p>
      </div>
    </form>
  );
}

export default BookingForm;
