import { FaWifi, FaParking, FaUtensils, FaPaw } from 'react-icons/fa';

function AmenitiesBadge({ meta }) {
  const badges = [];

  if (meta.wifi) {
    badges.push(
      <div
        key="wifi"
        className="flex items-center bg-blue-500 text-white rounded px-2 py-1"
      >
        <FaWifi className="mr-1" /> Wi-Fi
      </div>
    );
  }

  if (meta.parking) {
    badges.push(
      <div
        key="parking"
        className="flex items-center bg-yellow-500 text-white rounded px-2 py-1"
      >
        <FaParking className="mr-1" /> Parking
      </div>
    );
  }

  if (meta.breakfast) {
    badges.push(
      <div
        key="breakfast"
        className="flex items-center bg-orange-500 text-white rounded px-2 py-1"
      >
        <FaUtensils className="mr-1" /> Breakfast
      </div>
    );
  }

  if (meta.pets) {
    badges.push(
      <div
        key="pets"
        className="flex items-center bg-green-500 text-white rounded px-2 py-1"
      >
        <FaPaw className="mr-1" /> Pets Allowed
      </div>
    );
  }

  return <div className="flex flex-wrap gap-2">{badges}</div>;
}

export default AmenitiesBadge;
