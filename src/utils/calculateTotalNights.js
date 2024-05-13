/**
 * Calculates the total number of nights between two dates.
 *
 * This function computes the difference in days between two Date objects representing
 * the start and end of a period, rounding up to account for any part of a day counted
 * as a full night. It's primarily used in scenarios where the difference in days
 * needs to be calculated for purposes like booking durations in hotels or rental services.
 *
 * @param {Date} dateFrom - The start date of the period.
 * @param {Date} dateTo - The end date of the period.
 * @returns {number} The total number of nights between the given dates.
 *
 */
function calculateTotalNights(dateFrom, dateTo) {
  if (!dateFrom || !dateTo) return 0;

  const timeDiff = Math.abs(dateTo - dateFrom);
  const totalNights = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  return totalNights;
}

export default calculateTotalNights;
