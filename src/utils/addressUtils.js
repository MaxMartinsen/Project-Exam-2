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
