import React, { useState } from "react";
import { useContext, useEffect, useRef } from "react";
import PasswordContext from "../../context/passwords/passwordContext";
import AES from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";

import PasswordItem from "./PasswordItem";

import AddPassword from "./AddPassword";
import { render } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../context/alert/alertContext";
export default function Passwords() {
  const alertContext = useContext(AlertContext);
  let { showAlert } = alertContext;
  const passwordContext = useContext(PasswordContext);
  let { passwords, fetchPasswords, updatePassword } = passwordContext;
  //console.log("render");

  //runs only once because array is empty and empty array doesn't change
  // case 1:- no second arg:- runs each time after render==infinite loop of useeffect
  //https://medium.com/@andrewmyint/infinite-loop-inside-useeffect-react-hooks-6748de628
  // case 2:- empty array :- runs only once when mount or unmount since the empty array doesn't change
  // case 3:- array having elements :- runs only if elements in array change

  // Dependencies can be state or props. It should be noted that any value defined outside useEffect but inside the component, has to be passed as a dependency if you are to use it inside useEffect. This is illustrated below. or else it will be a infinite loop

  //everytime state changes component re-renders and hence useeffect will run again
  //useref is used which will not rerender
  let navigate = useNavigate();
  useEffect(() => {
    ////console.log("run hogaya");

    //console.log(localStorage.getItem("token"));
    if (localStorage.getItem("token")) {
      fetchPasswords();
    } else {
      navigate("/login");
    }
  }, []);

  // we are using useref so that when we click edit button,the button which toggles our model is clicked

  const [password, setpassword] = useState({
    platform: "",
    email: "",
    password: "",
    _id:""
  });
  const ref = useRef(null);
  const close = useRef(null);
  let key = "iamaboy";
  const toggleUpdate = (originalPassword) => {
    // //console.log(originalPassword);

    ref.current.click();
    let decr = AES.decrypt(originalPassword.password, key).toString(enc);
    //console.log(decr);
    setpassword({
      email: originalPassword.email,
      password: decr,
      platform: originalPassword.platform,
      _id:originalPassword._id
    });
  };

  const inputChange = (e) => {
    // //console.log("hello")
    // //console.log(e.target.name,e.target.value);
    setpassword({ ...password, [e.target.name]: e.target.value });
  };

  const update = () => {
    //console.log(password);
    let enc=AES.encrypt(password.password, key).toString();
    //console.log(enc);
    updatePassword(
      password._id,
      password.platform,
      // password.password,
       enc,
      password.email
    );
    close.current.click();
    showAlert("Password Updated Successfully", "success");
  };

  const disable = () => {
    if (password.platform.length < 5) return true;
    if (password.password.length < 8) return true;
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!password.email.match(mailformat)) return true;
    return false;
  };

  return (
    <div>
      <AddPassword></AddPassword>

      <button
        type="button"
        class="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
      >
        Update Password
      </button>

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Update Password
              </h5>
              {/* <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button> */}
            </div>
            <div className="container mx-1">
              <form>
                <div className="mb-3">
                  <label htmlFor="platform" className="form-label">
                    Platform
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="platform"
                    name="platform"
                    onChange={inputChange}
                    value={password.platform}
                    // aria-describedby="emailHelp"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    aria-describedby="emailHelp"
                    onChange={inputChange}
                    value={password.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="password"
                    name="password"
                    onChange={inputChange}
                    value={password.password}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={close}
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                disabled={disable()}
                onClick={update}
              >
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
      <div style={{ margin: " 1rem 5rem 1rem 3rem" }}>
        <h1>Your Passwords</h1>
      </div>

      {/* for printing passwords */}
      {/* <div className="row" id="passwords" > */}
      {passwords.length === 0 ? (
        <div className="container mx-5">
          <h6>No Passwords Found</h6>
        </div>
      ) : (
        <div className="row" id="passwords">
          {passwords.map((password) => {
            return (
              <PasswordItem
                password={password}
                toggleUpdate={toggleUpdate}
              ></PasswordItem>
            );
          })}
        </div>
      )}
      {/* </div> */}
    </div>
  );
}
