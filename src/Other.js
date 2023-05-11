import React, { useState, useEffect } from "react";

function Other() {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((response) => response.json())
      .then((products) => setUsers(products));
    console.log(response)
    .catch((error) => console.error(error));
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    fetch("https://dummyjson.com/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  return (
    <div>
      <h1>Users:</h1>
      <ul>
        {users?.map((user) => {
          return (
            <table className="table-bordered">
              <tr>
                <td>{user.id}</td>
                <td>{user.title}</td>
              </tr>
            </table>
          );
        })}
      </ul>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>
          Email:
          <input type="email" name="email" onChange={handleInputChange} />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Other;
