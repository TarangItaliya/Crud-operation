import React, { useState } from "react";

function Odd() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://dummyjson.com/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Data created successfully:", data);

        // Update the state of the component with the new data
        // This will trigger a re-render and update the table
        // with the new data
      })
      .catch((error) => {
        console.error("Error creating data:", error);
      });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleChange}
      />
      
      <button type="submit">Create Data</button>
    </form>
  );
}

export default Odd;
