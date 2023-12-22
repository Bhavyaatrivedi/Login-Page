import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Upload = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setUploadStatus(null);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:4000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadStatus('File uploaded successfully!');
      console.log(response.data);
    } catch (error) {
      setUploadStatus(`Error uploading file: ${error.message}`);
      console.error('Error uploading file:', error.message);
    }
  };

  const handleGetFiles = async () => {
    try {
      const response = await axios.get('http://localhost:4000/files');
      setFileList(response.data);
    } catch (error) {
      console.error('Error getting files:', error.message);
    }
  };

  const handleDownload = async (fileName) => {
    try {
      const response = await axios.get(`http://localhost:4000/files/${fileName}`, {
        responseType: 'blob', // Important for binary data like files
      });

      // Create a Blob from the file data
      const blob = new Blob([response.data], { type: response.headers['content-type'] });

      // Create a link element and trigger a download
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error.message);
    }
  };

  useEffect(() => {
    handleGetFiles(); // Automatically load files when the component mounts
  }, []);

  return (
    <div>
      <h2>File Upload</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
      {uploadStatus && <p>{uploadStatus}</p>}
      <button onClick={handleGetFiles}>Get All Files</button>
      {fileList.length > 0 && (
        <div>
          <h3>File List</h3>
          <ul>
            {fileList.map((fileInfo) => (
              <li key={fileInfo.name}>
                {fileInfo.name}
                <button onClick={() => handleDownload(fileInfo.name)}>Download</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Upload;
