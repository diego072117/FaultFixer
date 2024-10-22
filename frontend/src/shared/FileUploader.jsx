import React, { useCallback, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ name, fieldChange, mediaUrl }) => {
  const [fileUrl, setFileUrl] = useState(mediaUrl);


  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      fieldChange(name, file);
      setFileUrl(URL.createObjectURL(file));
    },
    [fieldChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg", ".svg"],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer"
    >
      <input {...getInputProps()} name={name} className="cursor-pointer" />
      {fileUrl ? (
        <>
          <div className="preview-post">
            <img
              src={fileUrl}
              alt="image"
              className="file_uploader-img"
            />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="img-post">
          <CiImageOn className="file-uploader-img"/>
          <h3 className="base-medium text-light-2 mb-2 mt-6">
          Arrastrar foto aquí
          </h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
