function VenuesDetails({ owner, maxGuests }) {
  return (
    <div>
      <div>
        <h2>About the Place</h2>
        <h3>
          Hosted by <span>{owner.name}</span>
        </h3>
        <p>
          Contact <span>{owner.email}</span>
        </p>
      </div>
      <div>
        <h2>Details</h2>
        <h3>
          Maximum <span>{maxGuests}</span> guest
        </h3>
      </div>
    </div>
  );
}

export default VenuesDetails;
