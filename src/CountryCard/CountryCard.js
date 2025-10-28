export default function CountryCard({ country }) {
  return (
    <div className="country-card">
      <div className="flag-container">
        <img
          src={country.flags?.png}
          alt={`Flag of ${country.name?.common}`}
          className="country-flag"
        />
      </div>

      <div className="country-info">
        <h2 className="country-name">{country.name?.common}</h2>
        <div className="country-details">
          {country.capital && (
            <p>
              <span className="label">Capital: </span>
              {country.capital.join(", ")}
            </p>
          )}
          {country.region && (
            <p>
              <span className="label">Region: </span> {country.region}
            </p>
          )}
          {country.subregion && (
            <p>
              <span className="label">Subregion: </span> {country.subregion}
            </p>
          )}
          {country.languages && (
            <p>
              <span className="label">Languages: </span>
              {Object.values(country.languages).join(", ")}
            </p>
          )}
          {country.population && (
            <p>
              <span className="label">Population: </span>
              {country.population.toLocaleString()}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}