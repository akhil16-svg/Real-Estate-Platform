import { useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import Slider from "../../components/slider/Slider.jsx";
import Map from "../../components/map/Map.jsx";
import "./singlePage.css";

function SinglePage() {
  const post = useLoaderData();

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <span>{post.address}</span>
                </div>
                <div className="price">$ {post.price}</div>
              </div>
              <div className="user">
                <img src={post.user.avatar || "/noavatar.png"} alt="avatar" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            />
          </div>
        </div>
      </div>
      <div className="features">
        <div className="wrapper">
          <p className="title">General</p>
          <div className="listVertical">
            <div className="feature">
              <span>Bedrooms: {post.bedroom}</span>
            </div>
            <div className="feature">
              <span>Bathrooms: {post.bathroom}</span>
            </div>
            {post.postDetail.size && (
              <div className="feature">
                <span>Size: {post.postDetail.size} sqft</span>
              </div>
            )}
          </div>
          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            {post.postDetail.school && (
              <div className="feature">
                <span>School: {post.postDetail.school}m away</span>
              </div>
            )}
            {post.postDetail.bus && (
              <div className="feature">
                <span>Bus Stop: {post.postDetail.bus}m away</span>
              </div>
            )}
            {post.postDetail.restaurant && (
              <div className="feature">
                <span>Restaurant: {post.postDetail.restaurant}m away</span>
              </div>
            )}
          </div>
          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
