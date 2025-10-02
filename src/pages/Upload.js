import React, { useState } from "react";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    try {
      // Step 1: Request a pre-signed URL from API Gateway
      const res = await fetch("https://tsq50u94z7.execute-api.ap-south-1.amazonaws.com/MyStage", {
        method: "PUT",  // since you tested PUT in Postman
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: file.name,
          content_type: file.type || "application/octet-stream"
        }),
      });

      const data = await res.json();
      const uploadURL = data.uploadURL;
      console.log("Presigned URL:", uploadURL);

      // Step 2: Upload the file directly to S3
      const s3Res = await fetch(uploadURL, {
        method: "PUT",
        headers: { "Content-Type": file.type || "application/octet-stream" },
        body: file
      });

      if (s3Res.ok) {
        setMessage("✅ File uploaded successfully!");
      } else {
        setMessage("❌ Upload failed.");
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error uploading file.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold">Upload a File</h2>
      <input type="file" onChange={handleFileChange} className="my-2" />
      <button
        onClick={handleUpload}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Upload
      </button>
      <p>{message}</p>
    </div>
  );
}
