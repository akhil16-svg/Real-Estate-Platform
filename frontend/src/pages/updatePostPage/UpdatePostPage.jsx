import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import apiRequest from "../../lib/apiRequest.js";
import "./updatePostPage.css";

function UpdatePostPage() {
  const post = useLoaderData();
  const [value, setValue] = useState(post.postDetail?.desc || "");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      await apiRequest.put("/posts/" + post.id, {
        ...inputs,
        price: parseInt(inputs.price),
        bedroom: parseInt(inputs.bedroom),
        bathroom: parseInt(inputs.bathroom),
      });
      navigate("/" + post.id);
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    }
  };

  return (
    <div className="updatePostPage">
      <h1>Update Property</h1>
      <form onSubmit={handleSubmit}>
        <div className="item">
          <label>Title</label>
          <input name="title" type="text" defaultValue={post.title} required />
        </div>
        <div className="item">
          <label>Price</label>
          <input name="price" type="number" defaultValue={post.price} required />
        </div>
        <div className="item">
          <label>Address</label>
          <input name="address" type="text" defaultValue={post.address} />
        </div>
        <div className="item description">
          <label>Description</label>
          <ReactQuill theme="snow" onChange={setValue} value={value} />
        </div>
        <button type="submit">Update</button>
        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
}

export default UpdatePostPage;
