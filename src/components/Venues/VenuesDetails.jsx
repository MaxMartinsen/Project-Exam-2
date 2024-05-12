/**
 * VenuesDetails component provides detailed information about the host of a venue and its guest capacity.
 * It displays the host's avatar, name, and contact information alongside the maximum number of guests allowed.
 *
 * @param {Object} props - The props passed to the component.
 * @param {Object} props.owner - The owner of the venue with details like name and email.
 * @param {number} props.maxGuests - The maximum number of guests that the venue can accommodate.
 * @param {Object} props.avatar - Contains the URL and alternative text for the owner's avatar image.
 * @param {string} props.avatar.url - URL of the owner's avatar image.
 * @param {string} props.avatar.alt - Alternative text for the owner's avatar image.
 *
 * @returns {JSX.Element} A React component that renders a section detailing the host and capacity information of a venue.
 */

function VenuesDetails({ owner, maxGuests, avatar }) {
  return (
    <div className="flex flex-col my-4 gap-4">
      <div>
        <div className="flex flex-row items-center gap-4">
          <h4 className="text-xl font-semibold tracking-tight text-fuscous-gray-700">
            Hosted by
          </h4>
          <div className="flex items-center gap-1">
            <img
              className="w-6 h-6 rounded-full"
              src={avatar.url}
              alt={avatar.alt}
            ></img>
            <span className="text-xl font-semibold tracking-tight text-fuscous-gray-700">
              {owner.name}
            </span>
          </div>
        </div>
        <p className="text-lg font-normal tracking-tight text-fuscous-gray-700">
          Contact: <span className="">{owner.email}</span>
        </p>
      </div>
      <div className="flex flex-col">
        <h4 className="text-xl font-semibold tracking-tight text-fuscous-gray-700">
          Details
        </h4>
        <p className="text-lg font-normal tracking-tight text-fuscous-gray-700">
          Maximum: <span>{maxGuests}</span> guest
        </p>
      </div>
    </div>
  );
}

export default VenuesDetails;
