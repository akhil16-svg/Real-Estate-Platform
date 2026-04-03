import { useNavigate, useSearchParams } from "react-router-dom";
import "./filter.css";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev);
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params;
    });
  };

  return (
    <div className="filter">
      <h1>
        Search results for{" "}
        <b>{searchParams.get("city") || "All Cities"}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="city">Location</label>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="City, neighborhood..."
            defaultValue={searchParams.get("city") || ""}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="type">Type</label>
          <select
            name="type"
            id="type"
            onChange={handleChange}
            defaultValue={searchParams.get("type") || ""}
          >
            <option value="">Any</option>
            <option value="buy">Buy</option>
            <option value="rent">Rent</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="property">Property</label>
          <select
            name="property"
            id="property"
            onChange={handleChange}
            defaultValue={searchParams.get("property") || ""}
          >
            <option value="">Any</option>
            <option value="apartment">Apartment</option>
            <option value="house">House</option>
            <option value="condo">Condo</option>
            <option value="land">Land</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            min={0}
            defaultValue={searchParams.get("minPrice") || ""}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            min={0}
            defaultValue={searchParams.get("maxPrice") || ""}
            onChange={handleChange}
          />
        </div>
        <div className="item">
          <label htmlFor="bedroom">Bedroom</label>
          <input
            type="number"
            id="bedroom"
            name="bedroom"
            placeholder="any"
            min={1}
            defaultValue={searchParams.get("bedroom") || ""}
            onChange={handleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default Filter;
