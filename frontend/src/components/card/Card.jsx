import { Link } from "react-router-dom";
import "./card.css";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item.id}`} className="imageContainer">
        <img src={item.images?.[0] || "/placeholder.jpg"} alt={item.title} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item.id}`}>{item.title}</Link>
        </h2>
        <p className="address">
          <span>📍</span>
          <span>{item.address}</span>
        </p>
        <p className="price">$ {item.price}</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <span>🛏 {item.bedroom} bed</span>
            </div>
            <div className="feature">
              <span>🚿 {item.bathroom} bath</span>
            </div>
          </div>
          <div className="icons">
            <span title="Save">{item.isSaved ? "❤️" : "🤍"}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
