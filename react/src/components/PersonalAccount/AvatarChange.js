import React, { useState } from "react";

function appChange() {
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "nsasiwra");
    setLoading(true);
    const res = await fetch(
      "postgres://nsasiwra:ial97aslAWk9lHBcwQJPNLFkjbwIgOKD@hattie.db.elephantsql.com:5432/nsasiwra",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    setImage(file.secure_url);
    setLoading(false);
  };
  return (
    <div>
      <h1>Upload Image</h1>
      <input
        type="file"
        name="file"
        placeholder="Upload an image"
        onChange={uploadImage}
      />
      {loading ? (
        <h3>Loading...</h3>
      ) : (
        <img src={image} style={{ width: "300px" }} />
      )}
    </div>
  );
}
