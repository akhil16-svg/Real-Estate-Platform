import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest.js";
import "./newPostPage.css";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    const cloudName = import.meta.env.VITE_CLOUDINARY_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_PRESET;

    if (!cloudName || !uploadPreset) {
      setError("Cloudinary is not configured. Please set VITE_CLOUDINARY_NAME and VITE_CLOUDINARY_PRESET.");
      return;
    }

    const uploaded = [];
    try {
      for (const file of files) {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", uploadPreset);
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          { method: "POST", body: data }
        );
        if (!res.ok) {
          throw new Error(`Image upload failed: ${res.statusText}`);
        }
        const json = await res.json();
        uploaded.push(json.secure_url);
      }
      setImages((prev) => [...prev, ...uploaded]);
    } catch (err) {
      setError(err.message || "Image upload failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          bedroom: parseInt(inputs.bedroom),
          bathroom: parseInt(inputs.bathroom),
          type: inputs.type,
          property: inputs.property,
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images,
        },
        postDetail: {
          desc: value,
          utilities: inputs.utilities,
          pet: inputs.pet,
          income: inputs.income,
          size: parseInt(inputs.size),
          school: parseInt(inputs.school),
          bus: parseInt(inputs.bus),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to create post");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Property</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="bedroom">Bedrooms</label>
              <input id="bedroom" name="bedroom" type="number" min={1} required />
            </div>
            <div className="item">
              <label htmlFor="bathroom">Bathrooms</label>
              <input id="bathroom" name="bathroom" type="number" min={1} required />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="type">Type</label>
              <select id="type" name="type">
                <option value="rent">Rent</option>
                <option value="buy">Buy</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="property">Property</label>
              <select id="property" name="property">
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="condo">Condo</option>
                <option value="land">Land</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="utilities">Utilities Policy</label>
              <select id="utilities" name="utilities">
                <option value="owner">Owner is responsible</option>
                <option value="tenant">Tenant is responsible</option>
                <option value="shared">Shared</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="pet">Pet Policy</label>
              <select id="pet" name="pet">
                <option value="allowed">Allowed</option>
                <option value="not-allowed">Not Allowed</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="income">Income Policy</label>
              <input id="income" name="income" type="text" placeholder="Min. income required" />
            </div>
            <div className="item">
              <label htmlFor="size">Total Size (sqft)</label>
              <input id="size" name="size" type="number" min={0} />
            </div>
            <div className="item">
              <label htmlFor="school">School (distance in m)</label>
              <input id="school" name="school" type="number" min={0} />
            </div>
            <div className="item">
              <label htmlFor="bus">Bus Stop (distance in m)</label>
              <input id="bus" name="bus" type="number" min={0} />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Restaurant (distance in m)</label>
              <input id="restaurant" name="restaurant" type="number" min={0} />
            </div>
            <div className="item description">
              <label>Description</label>
              <ReactQuill theme="snow" onChange={setValue} value={value} />
            </div>
            <button type="submit" className="sendButton">
              Add Property
            </button>
            {error && <p className="error">{error}</p>}
          </form>
          <div className="sideContainer">
            {images.map((image, index) => (
              <img src={image} key={index} alt="property" />
            ))}
            <label htmlFor="imageUpload" className="uploadLabel">
              Upload Images
            </label>
            <input
              id="imageUpload"
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              style={{ display: "none" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewPostPage;
