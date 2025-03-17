import { useState } from "react";
import { useDropzone } from "react-dropzone";

export default function FileUploader() {
  const [file, setFile] = useState(null);

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setFile(Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0])
      }));
    }
  });

  return (
    <div {...getRootProps()}  className={`border-2 h-[50px] flex items-center justify-center ${file ? " border-[#1E915D]" : "border-[#3981F7]"} p-1 text-center cursor-pointer rounded-full`}>
      

      {file ? (
        <div className="flex items-center justify-center text-[#1E915D] text-sm">
          
          <img src="/document-upload.svg" alt="ticket" className="mx-2"/>
          {file.name}
        </div>
      ): (
        <>
        <input {...getInputProps()} />
        <div className="flex items-center justify-center text-[#3981F7]">
          <img src="/icon.svg" alt="ticket" className="mx-2"/> Flight Ticket
        </div>
        </>
      )}
    </div>
  );
}
