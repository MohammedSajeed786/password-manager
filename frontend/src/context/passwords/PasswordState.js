import React, { useState } from "react";
import PasswordContext from "./passwordContext";

export default function PasswordState(props) {
  // let host = "http://localhost:5000";
  // let data = [
  //   {
  //     _id: "6200c82a6ba4df80658d2c3b",
  //     user: "61ffc19b44024d616f5f0095",
  //     platform: "whatsapp",
  //     email: "abcd@gmail.com",
  //     password: "abcdef",
  //     date: "2022-02-07T07:20:10.602Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6200c8af6ba4df80658d2c3d",
  //     user: "61ffc19b44024d616f5f0095",
  //     platform: "whatsapp",
  //     email: "abcd@gmail.com",
  //     password: "abcdef",
  //     date: "2022-02-07T07:22:23.655Z",
  //     __v: 0,
  //   },
  //   {
  //     _id: "6200c8ed6ba4df80658d2c3f",
  //     user: "61ffc19b44024d616f5f0095",
  //     platform: "whatsapp",
  //     email: "abcd@gmail.com",
  //     password: "abcdef",
  //     date: "2022-02-07T07:23:25.201Z",
  //     __v: 0,
  //   },
  // ];
  let data = [];
  const [passwords, setpasswords] = useState(data);

  //add password
  const addPassword = async (platform, password, email) => {
    const response = await fetch(`/api/passwords/createpasswords`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({ platform, password, email }), // body data type must match "Content-Type" header
    });
    console.log(response.json()); // parses JSON response into native JavaScript objects
    fetchPasswords();
    console.log("password added");
  };

  //update password
  const updatePassword = async (id, platform, password, email) => {
   console.log(id,platform,password,email);
    const response = await fetch(`/api/passwords/update/${id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "auth-token": localStorage.getItem("token"),
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },

      body: JSON.stringify({
        platform: platform,
        password: password,
        email: email,
      }), // body data type must match "Content-Type" header
    });
    fetchPasswords();
    console.log("updated");
  };

  //delete password
  const deletePassword = async (id) => {
    const response = await fetch(`/api/passwords/delete/${id}`, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    fetchPasswords();
    console.log("deleted");
  };

  //fetch passwords
  const fetchPasswords = async () => {
    const response = await fetch(`/api/passwords/fetchallpasswords`, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    let data = await response.json();
    // console.log(data);
    setpasswords(data); // parses JSON response into native JavaScript objects
    console.log("hello");
  };

  return (
    <PasswordContext.Provider
      value={{
        passwords,
        addPassword,
        deletePassword,
        updatePassword,
        fetchPasswords,
      }}
    >
      {props.children}
    </PasswordContext.Provider>
  );
}
