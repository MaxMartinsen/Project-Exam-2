/**
 * Calculates the total price for a stay between two dates at a given rate per night.
 *
 * This function takes start and end dates along with a nightly rate and calculates the total cost.
 * It computes the total number of days between the two dates, rounds up to the nearest whole number
 * to accommodate partial days as full charge days, and then multiplies this number by the nightly rate.
 * The function returns 0 if the dates are invalid or the price per night is not greater than zero.
 *
 * @param {Date} dateFrom - The start date of the period.
 * @param {Date} dateTo - The end date of the period.
 * @param {number} pricePerNight - The nightly rate.
 * @returns {number} The total cost of the nights between the given dates, calculated as nights * pricePerNight.
 */

function calculateTotalPrice(dateFrom, dateTo, pricePerNight) {
  if (!dateFrom || !dateTo || pricePerNight <= 0) return 0;

  const timeDiff = Math.abs(dateTo - dateFrom);
  const dayCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return dayCount * pricePerNight;
}

export default calculateTotalPrice;
