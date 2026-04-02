import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./searchBar.css";

const types = ["buy", "rent"];

function SearchBar() {
  const [query, setQuery] = useState({ type: "buy", city: "", minPrice: 0, maxPrice: 0 });
  const navigate = useNavigate();

  const switchType = (val) => setQuery((prev) => ({ ...prev, type: val }));

  const handleChange = (e) => {
    setQuery((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFilter = () => {
    navigate(
      `/list?type=${query.type}&city=${query.city}&minPrice=${query.minPrice}&maxPrice=${query.maxPrice}`
    );
  };

  return (
    <div className="searchBar">
      <div className="type">
        {types.map((type) => (
          <button
            key={type}
            onClick={() => switchType(type)}
            className={query.type === type ? "active" : ""}
          >
            {type}
          </button>
        ))}
      </div>
      <div className="inputGroup">
        <input
          type="text"
          name="city"
          placeholder="City Location"
          value={query.city}
          onChange={handleChange}
        />
        <input
          type="number"
          name="minPrice"
          placeholder="Min Price"
          min={0}
          value={query.minPrice}
          onChange={handleChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="Max Price"
          min={0}
          value={query.maxPrice}
          onChange={handleChange}
        />
        <button className="searchBtn" onClick={handleFilter}>
          🔍
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
