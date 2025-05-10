import { useState } from "react";

function ImageUploader() {
  const [images, setImages] = useState([]);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 2) {
      alert("You can only upload up to 2 images!");
      return;
    }

    const imagePreviews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages(imagePreviews);
  };

  const handleUpload = () => {
    images.forEach((imageObj) => {
      console.log(imageObj.file);
      // Here you can upload imageObj.file to your server
    });
  };

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageChange}
      />
      <button onClick={handleUpload}>Upload</button>

      <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
        {images.map((img, idx) => (
          <div key={idx}>
            <img
              src={img.preview}
              alt="preview"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <p style={{ fontSize: "12px" }}>{img.file.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImageUploader;
