import { useState } from "react";

const useCloudinary = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    if (!file) {
      setError("No file provided");
      return null;
    }

    const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
    const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

    if (!cloudName || !uploadPreset) {
      const missing = [];
      if (!cloudName) missing.push("VITE_CLOUDINARY_CLOUD_NAME");
      if (!uploadPreset) missing.push("VITE_CLOUDINARY_UPLOAD_PRESET");
      setError(`Missing env vars: ${missing.join(", ")}`);
      return null;
    }

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      setImageUrl(data.secure_url);
      return data.secure_url;
    } catch (err) {
      setError(err.message || "Failed to upload image");
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadImage, imageUrl, uploading, error };
};

export default useCloudinary;
