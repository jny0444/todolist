"use client";

import { useState } from "react";

export default function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  }

  function handleUpload() {
    if (!selectedFile) return;
    const formData = new FormData();
    formData.append("file", selectedFile);

    fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
  }

  return (
    <div>
      Hello
      <div>
        <label className="bg-gray-200 px-2 py-1 rounded cursor-pointer">
          Choose File
          <input
            type="file"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
        </label>
        {selectedFile && <p>{selectedFile.name}</p>}
        <button onClick={handleUpload}>Upload</button>
      </div>
    </div>
  );
}
