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
