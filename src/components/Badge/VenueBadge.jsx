import { FaWifi, FaParking, FaUtensils, FaPaw } from 'react-icons/fa';

function AmenitiesBadge({ meta }) {
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

export default AmenitiesBadge;
