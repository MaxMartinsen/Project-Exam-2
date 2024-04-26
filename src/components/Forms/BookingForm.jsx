// src/components/Forms/BookingForm.jsx
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDisableCalendarDates } from '../../hooks/useDisableCalendarDates';
import NumberForm from './NumberForm';
import { useTotalPrice } from '../../hooks/useTotalPrice';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from '../../utils/routes';

function BookingForm({
  bookings,
  onSubmit,
  venueId,
  maxGuests,
  pricePerNight,
}) {
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

  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.user.currentUser);
  const isLoggedIn = Boolean(currentUser);

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [guests, setGuests] = useState(1);

  const totalPrice = useTotalPrice({
    pricePerNight,
    startDate: range[0].startDate,
    endDate: range[0].endDate,
  });

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
      <NumberForm
        guests={guests}
        setGuests={setGuests}
        register={register}
        maxGuests={maxGuests}
      />
      {errors.guests && (
        <p className="text-red-500">Please enter a valid number of guests.</p>
      )}

      {isLoggedIn ? (
        <button
          type="submit"
          className="w-full mt-4 px-2.5 py-4 rounded text-white font-bold text-xl bg-athens-gray-700 hover:bg-athens-gray-800 active:bg-athens-gray-900"
        >
          Book
        </button>
      ) : (
        <button
          type="button"
          className="w-full mt-4 px-2.5 py-4 rounded text-white font-bold text-xl bg-athens-gray-700 hover:bg-athens-gray-800 active:bg-athens-gray-900"
          onClick={() => navigate(ROUTES.LOGIN)}
        >
          Sign in
        </button>
      )}

      <div className="flex items-start justify-between mt-4">
        <h2>Price per night</h2>
        <p>
          {pricePerNight}
          <span className="ml-1">$</span>
        </p>
      </div>
      <div className="flex items-start justify-between mt-4">
        <h2>Number of nights</h2>
        <span>{totalPrice / pricePerNight}</span>
      </div>
      <div className="flex items-start justify-between mt-2 pt-4 border-t-4">
        <h2 className="">Total price</h2>
        <p>
          {totalPrice}
          <span className="ml-1">$</span>
        </p>
      </div>
    </form>
  );
}

export default BookingForm;
