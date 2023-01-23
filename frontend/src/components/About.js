import React from "react";
import PasswordContext from "../context/passwords/passwordContext";
import { useContext, useEffect } from "react";
export default function About() {
  return (
    // <div className="container mx-5">This is About</div>;
    <div className="container mx-1">
      <div className="row">
        <div className="about-card col container-fluid">
          <h3>Add a password</h3>
          <p className="small  about-p">
            Store the password and email of a platform,so that you can check
            whenever you forget
          </p>
        </div>
        <div className="about-card col container-fluid">
          <h3>update and delete the password</h3>
          <p className="small about-p">
            Update the password and Delete it whenever required
          </p>
        </div>
        <div className="about-card col container-fluid">
          <h3>Passwords are secure</h3>
          <p className="small  about-p">
            Passwords are securely stored with AES encryption, so that even
            admin cannot read them
          </p>
        </div>
      </div>
    </div>
  );
}


















