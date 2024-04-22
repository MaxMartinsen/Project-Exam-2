import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DateRange } from 'react-date-range';

function BookingForm({ onSubmit, venueId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [range, setRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  const [guests, setGuests] = useState(1);

  const submitHandler = async (formData) => {
    if (!onSubmit) {
      console.error('onSubmit is not provided');
      return;
    }

    const bookingData = {
      dateFrom: range[0].startDate.toISOString(),
      dateTo: range[0].endDate.toISOString(),
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
      <div className="calendarWrap" data-testid="venue-calendar">
        <DateRange
          onChange={(item) => setRange([item.selection])}
          editableDateInputs
          moveRangeOnFirstSelection={false}
          ranges={range}
          months={1}
          direction="horizontal"
          className="calendarElement w-full"
          minDate={new Date()}
        />
      </div>

      <div className="relative">
        <input
          className="floating-input peer"
          type="number"
          id="guests"
          value={guests}
          placeholder=" "
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          {...register('guests', { required: true, min: 1 })}
        />
        <label className="floating-label" htmlFor="guests">
          Guests
        </label>
        {errors.guests && (
          <p className="text-red-500">Please enter the number of guests.</p>
        )}
      </div>

      <button type="submit" className="btn">
        Book
      </button>
    </form>
  );
}

export default BookingForm;
