import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader({ name, onFileChange }) {
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
          setFile(acceptedFiles[0]);
          onFileChange(acceptedFiles[0]); // Pass file to react-hook-form
      }
  });

  return (
      <div {...getRootProps()} className={`border-2 h-[40px] flex items-center justify-center ${file ? "border-[#1E915D]" : "border-[#3981F7]"} p-1 text-center cursor-pointer rounded-full`}>
          <input {...getInputProps()} />
          {file ? (
              <div className="flex items-center justify-center text-[#1E915D] text-[10px]">
                  <img src="/document-upload.svg" alt="ticket" className="mx-2" width={20} height={20}/>
                  
                  {file.name}
              </div>
          ) : (
              <div className="flex  items-center justify-center text-[#3981F7]">
                  <img src="/icon.svg" alt="ticket" className="mx-2"/> {name}
              </div>
          )}
      </div>
  );
}
