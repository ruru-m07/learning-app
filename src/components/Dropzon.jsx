import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "./image";

const Dropzone = () => {
    const [files, setFiles] = useState([]);
    const [rejected, setRejected] = useState([]);
    console.log(files)

    const onDrop = useCallback((acceptedFiles, rejectedFiles) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
      }

      if (rejectedFiles?.length) {
        setRejected((previousFiles) => [...previousFiles, ...rejectedFiles]);
      }
    }, []);

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
     accept: {
       "image/*": [],
     },
     maxSize: 1024 * 1000,
     onDrop,
   });

    useEffect(() => {
      // Revoke the data uris to avoid memory leaks
      return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
    }, [files]);

    const removeAll = () => {
      setFiles([]);
      setRejected([]);
    };

    return (
      <form>
        <div {...getRootProps({})}>
          <input {...getInputProps()} />
          <div className="flex flex-col items-center justify-center gap-4">
            {/* <ArrowUpTrayIcon className="w-5 h-5 fill-current" /> */}
            {isDragActive ? (
              <p>Drop the files here ...</p>
            ) : (
              <p>Drag & drop files here, or click to select files</p>
            )}
          </div>
        </div>

        {/* Preview */}
        <section className="mt-10">
          <div className="flex gap-4">
            <h2 className="title text-3xl font-semibold">Preview</h2>
            <button
              type="button"
              onClick={removeAll}
              className="mt-1 text-[12px] uppercase tracking-wider font-bold text-neutral-500 border border-secondary-400 rounded-md px-3 hover:bg-secondary-400 hover:text-white transition-colors"
            >
              Remove all files
            </button>
          </div>

          {/* Accepted files */}
          <h3 className="title text-lg font-semibold text-neutral-600 mt-10 border-b pb-3">
            Accepted Files
          </h3>
          <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-10">
            {files.map((file) => (
              <li
                key={file.name}
                className="relative h-32 rounded-md shadow-lg"
              >
                <Image
                  src={file.preview}
                  alt={file.name}
                  width={100}
                  height={100}
                  onLoad={() => {
                    URL.revokeObjectURL(file.preview);
                  }}
                  className="h-full w-full object-contain rounded-md"
                />
                
                <p className="mt-2 text-neutral-500 text-[12px] font-medium">
                  {file.name}
                </p>
              </li>
            ))}
          </ul>
        </section>
      </form>
    );
}

export default Dropzone