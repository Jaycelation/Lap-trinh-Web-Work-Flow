import { useState, useEffect } from "react";
import CountryCard from "./CountryCard";
import "./styles.css";

export default function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("name");
  const [order, setOrder] = useState("asc");
  const [subRegionFilter, setSubRegionFilter] = useState("all");
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const url =
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,subregion,languages,population";
      const response = await fetch(url);

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Error ${response.status}: ${text}`);
      }

      const data = await response.json();
      setCountries(data);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching countries:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setSubRegionFilter("all");
  }, [filter]);

  if (loading && countries.length === 0) {
    return <div className="loading">Loading countries...</div>;
  }

  if (error) {
    return (
      <div className="error">
        <h2>Error</h2>
        <p>{error}</p>
        <button onClick={fetchData}>Try again</button>
      </div>
    );
  }

  const regions = [...new Set(countries.map((c) => c.region).filter(Boolean))];
  
  const subregions = [
    ...new Set(
      countries
        .filter((c) => (filter === "all" ? true : c.region === filter))
        .map((c) => c.subregion)
        .filter(Boolean)
    ),
  ];

  const handleSearch = () => {
    setSearchQuery(query.trim());
  };

  const filteredData = countries
    .filter((country) =>
      country.name?.common
        ?.toLowerCase()
        .includes(searchQuery.toLowerCase().trim())
    )
    .filter((country) => (filter === "all" ? true : country.region === filter))
    .filter((country) => (subRegionFilter === "all" ? true : country.subregion === subRegionFilter))
    .sort((a, b) => {
      let x, y;
      switch (sortBy) {
        case "region":
          x = a.region || "";
          y = b.region || "";
          break;
        case "subregion":
          x = a.subregion || "";
          y = b.subregion || "";
          break;
        case "population":
          x = a.population || 0;
          y = b.population || 0;
          break;
        default:
          x = a.name?.common || 0;
          y = b.name?.common || 0;
      }
      let result;
      if (typeof x === "string" && typeof y === "string") {
        result = x.localeCompare(y);
      } else {
        result = x - y;
      }
      return order === "asc" ? result : -result;
    });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Country Card</h1>
      </header>
      <main>
        <label>Search by name:</label>
        <div className="search-controls">
          <input
            type="text"
            name="search"
            className="search-input"
            placeholder="Type a country name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={handleSearch} className="search-button">Search</button>
        </div>
        
        <label>Filter by region:</label>
        <select
          className="search-type"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All regions</option>
          {regions.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>

        <label>Filter by subregion:</label>
        <select
          className="search-type"
          value={subRegionFilter}
          onChange={(e) => setSubRegionFilter(e.target.value)}
        >
          <option value="all">All subregions</option>
          {subregions.map((sr) => (
            <option key={sr} value={sr}>
              {sr}
            </option>
          ))}
        </select>

        <label>Sort by:</label>
        <select
          className="search-type"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Name</option>
          <option value="region">Region</option>
          <option value="subregion">Subregion</option>
          <option value="population">Population</option>
        </select>

        <label>Order:</label>
        <select
          className="search-type"
          value={order}
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>

        {loading ? (
          <div className="loading-results">Loading...</div>
        ) : (
          <>
            <div className="results-info">
              {filteredData.length}{" "}
              {filteredData.length > 1 ? "countries" : "country"} found.
            </div>
            <div className="countries-grid">
              {filteredData.map((c) => (
                <CountryCard key={c.cca3} country={c} />
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
