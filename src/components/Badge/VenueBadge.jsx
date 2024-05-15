import { FaWifi, FaParking, FaUtensils, FaPaw } from 'react-icons/fa';

/**
 * VenueBadge component dynamically generates badges for various amenities based on the venue's metadata.
 * It uses specific icons to visually represent the presence of amenities such as Wi-Fi, parking, breakfast, and pet allowance.
 *
 * @param {Object} props - The component props.
 * @param {Object} props.meta - Metadata containing boolean values indicating the availability of specific amenities.
 * @param {boolean} props.meta.wifi - Indicates if Wi-Fi is available.
 * @param {boolean} props.meta.parking - Indicates if parking is available.
 * @param {boolean} props.meta.breakfast - Indicates if breakfast is provided.
 * @param {boolean} props.meta.pets - Indicates if pets are allowed.
 *
 * @returns {JSX.Element} A flex container with badges for each available amenity. Each badge is styled with a border,
 * rounded corners, and includes an icon and a label describing the amenity.
 */

function VenueBadge({ meta }) {
  const badges = [];

  if (meta.wifi) {
    badges.push(
      <div
        key="wifi"
        className="flex items-center bg-white/45 antialiased text-fuscous-gray-700 border-2 border-white rounded-lg px-4 py-2"
      >
        <FaWifi className="mr-2" /> Wi-Fi
      </div>
    );
  }

  if (meta.parking) {
    badges.push(
      <div
        key="parking"
        className="flex items-center bg-white/45 antialiased text-fuscous-gray-700 border-2 border-white rounded-lg px-4 py-2"
      >
        <FaParking className="mr-2" /> Parking
      </div>
    );
  }

  if (meta.breakfast) {
    badges.push(
      <div
        key="breakfast"
        className="flex items-center bg-white/45 antialiased text-fuscous-gray-700 border-2 border-white rounded-lg px-4 py-2"
      >
        <FaUtensils className="mr-2" /> Breakfast
      </div>
    );
  }

  if (meta.pets) {
    badges.push(
      <div
        key="pets"
        className="flex items-center bg-white/45 antialiased text-fuscous-gray-700 border-2 border-white rounded-lg px-4 py-2"
      >
        <FaPaw className="mr-2" /> Pets Allowed
      </div>
    );
  }

  return <div className="flex flex-wrap gap-2">{badges}</div>;
}

export default VenueBadge;
