// Backend (server.js)
const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const app = express();

app.post('/upload', upload.single('file'), (req, res) => {
  // Handle the file upload and store the data in the database
});

app.get('/data', (req, res) => {
  // Fetch the data from the database and send it as a response
});

app.put('/data/:id', (req, res) => {
  // Update the data in the database based on the request body
});

app.listen(3000, () => console.log('Server started on port 3000'));

// Frontend (App.js)
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('/data').then(res => setData(res.data));
  }, []);

  const handleUpload = event => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    axios.post('/upload', formData).then(() => {
      // Refresh the data
      axios.get('/data').then(res => setData(res.data));
    });
  };

  const handleUpdate = id => {
    // Update the data
    axios.put(`/data/${id}`).then(() => {
      // Refresh the data
      axios.get('/data').then(res => setData(res.data));
    });
  };

  return (
    <div>
      <input type="file" onChange={handleUpload} />
      {data.map(item => (
        <div key={item.id}>
          {/* Display the data */}
          <button onClick={() => handleUpdate(item.id)}>Update</button>
        </div>
      ))}
    </div>
  );
}

export default App;