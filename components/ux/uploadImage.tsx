// components/ImageUploadForm.tsx
"use client";

import Image from "next/image";
import { useState } from "react";

export default function ImageUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    setPreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert(data.message || "Upload complete");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <Image src={preview} alt="Preview" className="w-32 h-32 object-cover" />}
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Upload</button>
    </form>
  );
}
