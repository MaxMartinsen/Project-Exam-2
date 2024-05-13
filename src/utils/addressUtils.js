/**
 * Formats and returns a concatenated address string for a given venue.
 *
 * This utility function takes a venue object and constructs a full address string
 * by combining various components of the venue's location such as address, city, zip code,
 * country, and continent. Only non-empty components are included in the final string.
 *
 * @param {Object} venue - The venue object containing location details.
 * @returns {string} A formatted address string.
 *
 */

export function formatAddress(venue) {
  const parts = [
    venue.location.address,
    venue.location.city,
    venue.location.zip,
    venue.location.country,
    venue.location.continent,
  ];

  return parts.filter((part) => part).join(', ');
}
