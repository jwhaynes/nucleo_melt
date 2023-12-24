// Importing necessary modules
import React, { useState } from 'react'; // React for building the component and useState for managing local state
import Papa from 'papaparse'; // Papa Parse for parsing CSV data

// Defining the App component
function App() {
  // Using the useState hook to create a state variable 'data' and a function 'setData' to update it
  const [data, setData] = useState([]);

  // Defining a function to handle file uploads
  const handleFileUpload = event => {
    // Getting the uploaded file from the event object
    const file = event.target.files[0];

    // Using Papa Parse to parse the CSV file
    Papa.parse(file, {
      // When parsing is complete, this function will be called with the results
      complete: (results) => {
        // The parsed data is an array of arrays, each representing a row of the CSV
        // We update our state with this data
        setData(results.data);
      },
      // This option tells Papa Parse to treat the first row of the CSV as the header row
      // and parse the rest of the CSV into objects using the header row for the property names
      header: true
    });
  };

  // The component's render method
  return (
    <div>
      {/* An input element for file uploads. When a file is selected, handleFileUpload is called */}
      <input type="file" onChange={handleFileUpload} />

      {/* If there is any data, we map over it and display each row */}
      {data.length > 0 && (
        <div>
          {/* Display the CSV data */}
          {data.map((row, index) => (
            // For each row, we create a <p> element with the row data as its content
            // We use JSON.stringify to convert the row data (an object) into a string
            // We also give each <p> element a key prop, which helps React optimize re-rendering
            <p key={index}>{JSON.stringify(row)}</p>
          ))}
        </div>
      )}
    </div>
  );
}

// Exporting the App component so it can be imported and used in other files
export default App;