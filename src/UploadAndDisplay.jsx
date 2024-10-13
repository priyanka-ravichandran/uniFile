import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UploadAndDisplay = () => {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [filesList, setFilesList] = useState([]);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const uploadFile = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Content = reader.result.split(',')[1]; // Remove data URL prefix
      const fileName = file.name;
      const contentType = file.type;

      try {
        const response = await axios.post('https://c8ara8a26k.execute-api.us-east-1.amazonaws.com/upload/', {
          fileName,
          fileContent: base64Content,
          contentType,
        });
        setMessage(response.data.message);
        fetchFiles();
      } catch (error) {
        setMessage('Error uploading file');
      }
    };
  };

  const fetchFiles = async () => {
    try {
      const response = await axios.get('https://ba9twrgd1f.execute-api.us-east-1.amazonaws.com/getFiles');
      console.log(JSON.parse(response.data.body))
      setFilesList(JSON.parse(response.data.body).files);
    } catch (error) {
      setMessage('Error fetching files');
    }
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  return (
    <div>
      <h2>Upload and Display S3 Files</h2>

      <input type="file" onChange={handleFileChange} />
      <button onClick={uploadFile}>Upload</button>
      <p>{message}</p>

      <h3>Uploaded Files</h3>
      <ul>
        {filesList.map((file) => (
          <li key={file.fileName}>
            <a href={file.fileUrl} target="_blank" rel="noopener noreferrer">
              {file.fileName}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UploadAndDisplay;
