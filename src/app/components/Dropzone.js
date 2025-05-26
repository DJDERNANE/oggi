import { useState } from "react";
import { useDropzone } from "react-dropzone";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function FileUploader({ name, onFileChange }) {
  const [file, setFile] = useState(null);
  const { getRootProps, getInputProps } = useDropzone({
      accept: "image/*",
      onDrop: (acceptedFiles) => {
          setFile(acceptedFiles[0]);
          onFileChange(acceptedFiles[0]); // Pass file to react-hook-form
      }
  });

  const truncateFileName = (fileName, maxLength = 20) => {
      if (fileName.length <= maxLength) return fileName;
      const extension = fileName.split('.').pop();
      const nameWithoutExt = fileName.slice(0, -(extension.length + 1));
      const truncated = nameWithoutExt.slice(0, maxLength - 3) + '...';
      return `${truncated}.${extension}`;
  };

  return (
      <div {...getRootProps()} className={`border-2 h-[40px] flex items-center justify-center ${file ? "border-[#1E915D]" : "border-[#3981F7]"} p-1 text-center cursor-pointer rounded-full overflow-hidden`}>
          <input {...getInputProps()} />
          {file ? (
              <div className="flex items-center justify-center text-[#1E915D] text-[10px] w-full">
                  <img src="/document-upload.svg" alt="ticket" className="mx-2 flex-shrink-0" width={20} height={20}/>
                  <TooltipProvider>
                      <Tooltip>
                          <TooltipTrigger asChild>
                              <span className="truncate max-w-[calc(100%-40px)]">
                                  {truncateFileName(file.name)}
                              </span>
                          </TooltipTrigger>
                          <TooltipContent>
                              <p>{file.name}</p>
                          </TooltipContent>
                      </Tooltip>
                  </TooltipProvider>
              </div>
          ) : (
              <div className="flex items-center justify-center text-[#3981F7] w-full">
                  <img src="/Icon.svg" alt="ticket" className="mx-2 flex-shrink-0"/> 
                  <span className="truncate">{name}</span>
              </div>
          )}
      </div>
  );
}
