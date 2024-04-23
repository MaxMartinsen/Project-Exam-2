import { useState } from 'react';
import { useForm } from 'react-hook-form';

import dayjs from 'dayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { DemoContainer } from '@mui/x-date-pickers/internals/demo';

function BookingForm({ onSubmit, venueId }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [startDate, setStartDate] = useState(dayjs());
  const [endDate, setEndDate] = useState(dayjs().add(1, 'day'));
  const [guests, setGuests] = useState(1);

  const submitHandler = async (formData) => {
    if (!onSubmit) {
      console.error('onSubmit is not provided');
      return;
    }

    const bookingData = {
      dateFrom: startDate.toISOString(),
      dateTo: endDate.toISOString(),
      guests: parseInt(formData.guests, 10),
      venueId,
    };
    console.log('Booking form data:', bookingData);
    await onSubmit(bookingData);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col gap-3 mt-3 items-center"
    >
      <DemoContainer components={['DatePicker', 'DatePicker']}>
        <DatePicker
          label="Check-in"
          value={startDate}
          onChange={(date) => setStartDate(date)}
          format="DD MM YYYY"
        />
        <DatePicker
          label="Check-out"
          value={endDate}
          onChange={(date) => setEndDate(date)}
          format="DD MM YYYY"
        />
      </DemoContainer>

      <div className="relative">
        <input
          type="number"
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value, 10))}
          placeholder="Guests"
          {...register('guests', { required: true, min: 1 })}
        />
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
