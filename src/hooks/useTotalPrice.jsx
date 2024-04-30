import { useMemo } from 'react';
import { differenceInCalendarDays } from 'date-fns';

/**
 * A hook to calculate the total price based on the venue's nightly rate and the number of nights.
 * @param {Object} params - Parameters for the calculation.
 * @param {number} params.pricePerNight - The nightly rate of the venue.
 * @param {Date} params.startDate - The start date of the booking.
 * @param {Date} params.endDate - The end date of the booking.
 * @returns {number} The total price for the booking.
 */
export const useTotalPrice = ({ pricePerNight, startDate, endDate }) => {
  // Calculate the number of nights based on the date range
  const numNights = useMemo(() => {
    if (!startDate || !endDate || startDate >= endDate) {
      return 0;
    }
    return differenceInCalendarDays(endDate, startDate);
  }, [startDate, endDate]);

  // Calculate the total price based on the number of nights and the nightly rate
  const totalPrice = useMemo(() => {
    return numNights * pricePerNight;
  }, [numNights, pricePerNight]);

  return totalPrice;
};
