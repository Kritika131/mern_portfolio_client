import React, { useState, useRef } from "react";
import { message } from "antd";
import api from "../api/axios";

const FileUpload = ({
  type = "image", // 'image' or 'pdf'
  value = "",
  onChange,
  uploadEndpoint = "/portfolio/upload/image",
  label = "",
  placeholder = "",
  maxSize = 5, // in MB
  shape = "rectangle", // 'rectangle', 'circle', 'square'
  previewSize = "", // For circle/square: 'w-40 h-40', for rectangle: 'h-48 w-full'
  disabled = false,
}) => {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  const acceptTypes = type === "pdf" ? ".pdf,application/pdf" : "image/*";

  const allowedText = type === "pdf" ? "PDF" : "PNG, JPG, GIF";

  const handleFileUpload = async (file) => {
    if (!file) return;

    // Validate file type
    if (type === "image" && !file.type.startsWith("image/")) {
      message.error("Please upload an image file");
      return;
    }
    if (type === "pdf" && file.type !== "application/pdf") {
      message.error("Please upload a PDF file");
      return;
    }

    // Validate file size
    if (file.size > maxSize * 1024 * 1024) {
      message.error(`File size should be less than ${maxSize}MB`);
      return;
    }

    const formData = new FormData();
    formData.append(type === "pdf" ? "resume" : "image", file);

    try {
      setUploading(true);
      const response = await api.post(uploadEndpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        onChange(response.data.url);
        message.success(
          `${type === "pdf" ? "PDF" : "Image"} uploaded successfully!`
        );
      } else {
        message.error(response.data.msg);
      }
    } catch (err) {
      message.error(err.response?.data?.msg || `Failed to upload ${type}`);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    handleFileUpload(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    if (!disabled) setDragOver(true);
  };

  const handleRemove = () => {
    onChange("");
  };

  const shapeClasses = {
    rectangle: "rounded-xl",
    circle: "rounded-xl",
    square: "rounded-xl",
  };

  const previewShapeClasses = {
    rectangle: "rounded-lg",
    circle: "rounded-full",
    square: "rounded-lg",
  };

  // Default preview sizes for each shape
  const defaultPreviewSizes = {
    rectangle: "h-48 w-full",
    circle: "w-40 h-40",
    square: "w-48 h-48",
  };

  const previewSizeClass = previewSize || defaultPreviewSizes[shape];

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          {label}
        </label>
      )}
      <div
        className={`relative border-2 border-dashed p-6 text-center transition-all duration-300 ${
          shapeClasses[shape]
        } ${
          disabled
            ? "bg-gray-100 border-gray-200 cursor-not-allowed"
            : dragOver
            ? "border-thirdry bg-thirdry/5"
            : value
            ? "border-green-300 bg-green-50"
            : "border-gray-300 hover:border-gray-400 bg-gray-50 cursor-pointer"
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setDragOver(false)}
        onClick={() => !disabled && !value && fileInputRef.current?.click()}
      >
        {uploading ? (
          <div className="py-8">
            <div className="w-12 h-12 border-4 border-thirdry border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-500">Uploading...</p>
          </div>
        ) : value ? (
          <div className="relative inline-block">
            {type === "image" ? (
              <div
                className={`${previewSizeClass} overflow-hidden mx-auto border-4 border-white shadow-lg ${previewShapeClasses[shape]}`}
              >
                <img
                  src={value}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="py-4">
                <div className="w-16 h-16 rounded-xl bg-red-100 flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM6 20V4h7v5h5v11H6z" />
                    <path d="M8 12h8v2H8zm0 4h8v2H8z" />
                  </svg>
                </div>
                <p className="text-green-700 font-medium mb-2">PDF uploaded</p>
                <a
                  href={value}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline flex items-center justify-center gap-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  View PDF
                </a>
              </div>
            )}

            {/* Remove button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemove();
              }}
              className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-md"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* Change button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="mt-3  text-sm text-thirdry hover:underline block mx-auto"
            >
              Change {type === "pdf" ? "PDF" : "Image"}
            </button>
          </div>
        ) : (
          <div className="py-8">
            <div
              className={`w-16 h-16 ${
                shape === "circle" ? "rounded-full" : "rounded-xl"
              } bg-gray-200 flex items-center justify-center mx-auto mb-4`}
            >
              {type === "pdf" ? (
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              ) : (
                <svg
                  className="w-8 h-8 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <p className="text-gray-600 font-medium mb-1">
              {placeholder ||
                `Drop your ${type === "pdf" ? "PDF" : "image"} here`}
            </p>
            <p className="text-gray-400 text-sm">or click to browse</p>
            <p className="text-gray-400 text-xs mt-2">
              {allowedText} up to {maxSize}MB
            </p>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept={acceptTypes}
          className="hidden pt-[6px] "
          onChange={(e) => handleFileUpload(e.target.files[0])}
          disabled={disabled}
        />
      </div>
    </div>
  );
};

export default FileUpload;
