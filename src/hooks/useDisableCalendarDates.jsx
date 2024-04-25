import { useEffect, useState } from 'react';
import { parseISO, eachDayOfInterval } from 'date-fns';

/**
 * A custom hook to calculate and return disabled dates based on bookings and venue capacity.
 * @param {Array} bookings - An array of booking objects.
 * @param {string} venueId - The ID of the venue.
 * @param {number} maxGuests - The maximum number of guests allowed.
 * @returns {Array} An array of disabled dates (as ISO date strings).
 */
export const useDisableCalendarDates = ({ bookings, venueId, maxGuests }) => {
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    console.log('Received bookings:', bookings);
    console.log('Received venueId:', venueId);
    console.log('Received maxGuests:', maxGuests);

    if (!Array.isArray(bookings)) {
      console.error('Invalid bookings data');
      return;
    }

    if (!venueId) {
      console.error('Invalid venueId');
      return;
    }

    if (typeof maxGuests !== 'number' || maxGuests <= 0) {
      console.error('Invalid maxGuests');
      return;
    }

    // Map to count total guests for each day
    const dayGuestCount = {};

    bookings.forEach((booking) => {
      const { dateFrom, dateTo, guests } = booking;
      const start = parseISO(dateFrom);
      const end = parseISO(dateTo);

      const dates = eachDayOfInterval({ start, end });

      dates.forEach((date) => {
        const dateKey = date.toISOString().split('T')[0];
        dayGuestCount[dateKey] = (dayGuestCount[dateKey] || 0) + guests;
      });
    });

    // Identify dates where guest count is equal to or greater than maxGuests
    const fullyBookedDates = Object.entries(dayGuestCount)
      .filter(([, count]) => count >= maxGuests)
      .map(([date]) => date);

    setDisabledDates(fullyBookedDates);
  }, [bookings, venueId, maxGuests]);

  return { disabledDates };
};
