// DeleteBookForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function Bookdelete() {
  const [bookNumber, setBookNumber] = useState();
  

  const handleDelete = async (e) => {
  e.preventDefault();  // Prevent the default form submission (page reload)

        // Send a POST request to the deposit endpoint with the account number and amount
        axios.post('http://localhost:8757/bookdelete', { bookNumber })
            .then(result => {
                // Log the result from the server (for debugging purposes)
                console.log(result.data);

                // Check if the deposit operation was successful
                if (result.data === "Success") {
                    // If the deposit was successful, navigate to the home page
                    navigate("/home");
                }

                // Log the full response for debugging purposes
                console.log(result);
            })
            .catch(err => {
                // Log any error that occurs during the request
                console.log(err);
            });
    };

  return (
    <form onSubmit={handleDelete}>
      <input
        name="bookNumber"
        type="text"
              
        onChange={(e) => setBookNumber(e.target.value)}
        required
      />
      <button type="submit">Delete Book</button>
      
    </form>
  );
}

export default Bookdelete;
