import React, { useState } from 'react';
import axios from 'axios';

const UploadForm = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('file', selectedFile);

        axios.post('http://localhost:5000/upload', formData)
            .then((response) => {
                setUploadStatus(response.data.message);
            })
            .catch((error) => {
                setUploadStatus('Error occurred during upload');
                console.error(error);
            });
    };

    return (
        <div>
            <h2>Image Upload</h2>
            <form onSubmit={handleFormSubmit}>
                <input type="file" accept="image/*" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
            <p>{uploadStatus}</p>
        </div>
    );
};

export default UploadForm;