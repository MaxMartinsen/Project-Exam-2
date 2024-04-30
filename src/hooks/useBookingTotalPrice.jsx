import { useState, useEffect } from 'react';
import { differenceInCalendarDays } from 'date-fns';

/**
 * A custom hook to calculate the total price based on booking dates and price per night.
 * @param {Date} dateFrom - The start date of the booking.
 * @param {Date} dateTo - The end date of the booking.
 * @param {number} pricePerNight - The price per night for the booking.
 * @returns {number} - The total price for the booking.
 */
export const useBookingTotalPrice = (dateFrom, dateTo, pricePerNight) => {
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (dateFrom && dateTo) {
      const daysDifference = differenceInCalendarDays(dateTo, dateFrom);
      const nights = daysDifference > 0 ? daysDifference : 0;
      const calculatedPrice = nights * pricePerNight;
      setTotalPrice(calculatedPrice);
    }
  }, [dateFrom, dateTo, pricePerNight]);

  return totalPrice;
};
