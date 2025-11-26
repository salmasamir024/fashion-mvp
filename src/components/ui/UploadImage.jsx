// src/components/ui/UploadImage.jsx
import React, { useRef } from "react";

/**
 * UploadImage component
 * props:
 *  label: string
 *  multiple: boolean
 *  onChange: (files) => {}
 */
export default function UploadImage({ label = "Upload image", multiple = false, onChange, accept = "image/*", className = "" }) {
  const inputRef = useRef();

  const handleChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (onChange) onChange(files);
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <label className="text-sm font-medium">{label}</label>
      <div>
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
          className="hidden"
        />
        <button
          type="button"
          onClick={() => inputRef.current && inputRef.current.click()}
          className="px-4 py-2 border rounded-md"
        >
          Choose file{multiple ? "s" : ""}
        </button>
      </div>
    </div>
  );
}
