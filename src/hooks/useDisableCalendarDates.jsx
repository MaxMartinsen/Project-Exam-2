// src/hooks/useDisableCalendarDates.jsx
import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval } from 'date-fns';

/**
 * A custom hook to disable calendar dates based on existing bookings.
 * @param {Object} options - Configuration containing the bookings object.
 * @param {Object} options.bookings - The bookings object containing an array and a boolean.
 * @returns {Object} An object with an array of disabled dates and a function to set them.
 */
export const useDisableCalendarDates = ({ bookings }) => {
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    let actualBookings = [];

    // Check if bookings contains an array of bookings
    if (bookings && Array.isArray(bookings.bookings)) {
      actualBookings = bookings.bookings;
    } else if (Array.isArray(bookings)) {
      // If bookings itself is an array, use it
      actualBookings = bookings;
    } else {
      console.error(
        "Expected 'bookings' to be an array or to contain an array in 'bookings', but got:",
        bookings
      );
      actualBookings = []; // Default to an empty array if the structure is incorrect
    }

    const disabledDatesArray = actualBookings.flatMap((booking) => {
      const startDate = parseISO(booking.dateFrom);
      const endDate = parseISO(booking.dateTo);

      const datesBetween = eachDayOfInterval({
        start: startDate,
        end: endDate,
      });

      // Return the dates as ISO strings, removing the time component
      return datesBetween.map((date) => date.toISOString().split('T')[0]);
    });

    setDisabledDates(disabledDatesArray);
  }, [bookings]);

  return { disabledDates, setDisabledDates };
};
