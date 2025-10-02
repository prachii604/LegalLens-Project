// UploadPdf.js
import React, { useState } from "react";

export default function UploadPdf({ presignApiUrl }) {
  // presignApiUrl example: "https://{api-id}.execute-api.{region}.amazonaws.com/prod/presign"
  const [file, setFile] = useState(null);
  const [status, setStatus] = useState("");

  const onFileChange = (e) => {
    setFile(e.target.files[0]);
    setStatus("");
  };

  const upload = async () => {
    if (!file) {
      setStatus("Select a file first");
      return;
    }
    if (file.type !== "application/pdf") {
      setStatus("Please select a PDF");
      return;
    }

    setStatus("Requesting presigned URL...");
    try {
      // 1) request presigned URL from your backend (Lambda via API Gateway)
      const presignResp = await fetch(presignApiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          filename: file.name,
          content_type: file.type,
        }),
      });

      if (!presignResp.ok) {
        const errText = await presignResp.text();
        throw new Error(`Presign error: ${presignResp.status} ${errText}`);
      }

      const presignData = await presignResp.json();
      const uploadUrl = presignData.uploadUrl;
      const objectKey = presignData.objectKey;

      setStatus("Uploading file to S3...");

      // 2) upload to S3 using PUT
      const putResp = await fetch(uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
          // do NOT set 'Content-Length' manually; the browser handles it
        },
        body: file,
      });

      if (!putResp.ok) {
        const text = await putResp.text();
        throw new Error(`Upload failed: ${putResp.status} ${text}`);
      }

      setStatus(`Upload success! s3 key: ${objectKey}`);

      // 3) optional: notify your backend that upload finished and store reference
      // await fetch('/api/notify-upload', { method: 'POST', body: JSON.stringify({ key: objectKey })});
    } catch (err) {
      console.error(err);
      setStatus("Error: " + err.message);
    }
  };

  return (
    <div>
      <h3>Upload PDF to S3 (presigned PUT)</h3>
      <input type="file" accept="application/pdf" onChange={onFileChange} />
      <button onClick={upload} disabled={!file}>
        Upload
      </button>
      <div style={{ marginTop: 10 }}>{status}</div>
    </div>
  );
}
