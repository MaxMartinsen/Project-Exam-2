import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

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
    <div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col gap-3 mt-3 items-center"
      >
        <div className="flex items-center justify-center mb-4 gap-4">
          <DateRange
            ranges={range}
            onChange={(item) => setRange([item.selection])}
            editableDateInputs={true}
            moveRangeOnFirstSelection={false}
            months={1}
            direction="horizontal"
            className="calendarElement w-full"
            rangeColors={['#f27777']}
            minDate={new Date()}
          />
        </div>

        <div className="">
          <input
            type="number"
            value={guests}
            onChange={(e) => setGuests(parseInt(e.target.value, 10))}
            placeholder="Number of guests"
            {...register('guests', { required: true, min: 1 })}
          />
          {errors.guests && (
            <p className="text-red-500">
              Please enter a valid number of guests.
            </p>
          )}
        </div>

        <button type="submit" className="btn">
          Book
        </button>
      </form>
    </div>
  );
}

export default BookingForm;
