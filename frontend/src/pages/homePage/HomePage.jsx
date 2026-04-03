import { Link } from "react-router-dom";
import "./homePage.css";
import SearchBar from "../../components/searchBar/SearchBar.jsx";

function HomePage() {
  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find Real Estate &amp; Get Your Dream Place</h1>
          <p>
            Browse thousands of properties for sale and rent. Use our map view
            and filters to find your perfect home.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Award Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Property Ready</h2>
            </div>
          </div>
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="Real estate hero" />
      </div>
    </div>
  );
}

export default HomePage;
