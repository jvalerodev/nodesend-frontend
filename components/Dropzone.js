import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import useAuth from '@/hooks/useAuth';
import useApp from '@/hooks/useApp';
import Form from '@/components/Form';

const Dropzone = () => {
  const { isAuthenticated } = useAuth();
  const { loading, showAlert, uploadFile, createLink } = useApp();

  const onDropRejected = () => {
    const limit = isAuthenticated ? '20 MB' : '1MB';
    const account = isAuthenticated ? '' : 'Create an account if you want to upload larger files.';
    showAlert(`Error uploading the file, the limit is ${limit} and a maximum of one file. ${account}`);
  };

  const onDropAccepted = useCallback(async acceptedFiles => {
    const formData = new FormData();
    formData.append('file', acceptedFiles[0]);
    await uploadFile(formData, acceptedFiles[0].path);
  }, []);


  const { getRootProps, getInputProps, isDragActive, acceptedFiles } = useDropzone({ onDropAccepted, onDropRejected, maxSize: isAuthenticated ? 20971520 : 1048576, maxFiles: 1 });

  const files = acceptedFiles.map(file => (
    <li key={file.lastModified} className="bg-white flex-1 p-3 mb-4 shadow-lg rounded">
      <p className="font-bold text-xl">{file.path}</p>
      <p className="text-sm text-gray-500">{(file.size / Math.pow(1024, 2)).toFixed(2)} MB</p>
    </li>
  ));

  return (
    <div className="md:flex-1 mx-2 mt-16 lg:mt-0 flex flex-col items-center justify-center border-dashed border-gray-300 border-2 bg-gray-100 px-5 py-10">
      {acceptedFiles.length > 0 ? (
        <div className="w-full">
          <h4 className="text-2xl font-bold text-center mb-4">Files</h4>
          <ul>
            {files}
          </ul>

          {isAuthenticated ? <Form /> : null}

          {loading ? <p className="text-center text-gray-500 font-bold">Uploading file...</p> :
            <button type="button" className="bg-blue-700 w-full py-3 rounded-lg text-white my-5 hover:bg-blue-800" onClick={() => createLink()}>
              Create link
            </button>
          }
        </div>
      ) : (
        <div {...getRootProps({ className: 'dropzone w-full py-32' })}>
          <input className="h-full" {...getInputProps()} />

          {isDragActive ? <div className=""><p className="text-2xl text-center text-gray-600 py-16">Drop the file.</p></div> :
            <div className="text-center">
              <p className="text-2xl text-center text-gray-600">Select a file or drag it here.</p>
              <button type="button" className="bg-blue-700 w-full py-3 rounded-lg text-white my-10 hover:bg-blue-800">
                Select files to upload.
              </button>
            </div>
          }
        </div>
      )}
    </div>
  );
};

export default Dropzone;