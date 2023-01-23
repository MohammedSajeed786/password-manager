import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../../context/alert/alertContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./signup.css";
export default function () {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/");
    }
  });
  const alertContext = useContext(AlertContext);
  let { showAlert } = alertContext;
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
    name: "",
    cpassword: "",
  });
  
  const inputChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  const register = async (e) => {
    if (!disable()) {
      e.preventDefault();
      const response = await fetch(
        `/api/auth/createuser`,
        {
          method: "POST", // *GET, POST, PUT, DELETE, etc.
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: credentials.password,
            email: credentials.email,
            name: credentials.name,
          }), // body data type must match "Content-Type" header
        }
      );
      const json = await response.json();
      //console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        showAlert("Registration successful", "success");
      } else {
        showAlert("invalid credentials", "danger");
      }
    }
    e.preventDefault();
    //console.log(credentials);
  };
  const disable = () => {
    ////console.log("disable")
    if (credentials.name.length < 1){  showAlert("name must be atleat 1 character", "info");return true;}
    if (credentials.password.length < 8) {
      showAlert("password must be atleat 8 characters", "info");
      return true;
    }
    if (credentials.password !== credentials.cpassword) {
      showAlert("password and confirm password doesn't match", "info");
      return true;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!credentials.email.match(mailformat)) {
      showAlert("invalid email", "info");
      return true;
    }
    return false;
  };

  const [hidePassword, sethidePassword] = useState(true);
  const handlePassword = (e) => {
    //  e.preventDefault();
    // //console.log("pass");
    if (hidePassword === true) sethidePassword(false);
    else sethidePassword(true);
    //console.log(hidePassword);
  };
  // return (
  //   <div className="container">
  //     <h1>Please Signup to Save Passwords</h1>
  //     <form onSubmit={register}>
  //       <div className="mb-3">
  //         <label htmlFor="name" className="form-label">
  //           Name
  //         </label>
  //         <input
  //           type="name"
  //           className="form-control"
  //           id="name"
  //           name="name"
  //           onChange={inputChange}
  //           required
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="email" className="form-label">
  //           Email address
  //         </label>
  //         <input
  //           type="email"
  //           className="form-control"
  //           id="email"
  //           name="email"
  //           aria-describedby="emailHelp"
  //           onChange={inputChange}
  //           required
  //         />
  //       </div>

  //       <div className="mb-3">
  //         <label htmlFor="password" className="form-label">
  //           Password
  //         </label>
  //         <input
  //           type={hidePassword?"password":"text"}
  //           className="form-control"
  //           id="password"
  //           name="password"
  //           onChange={inputChange}
  //           required
  //         />
  //       </div>
  //       <div className="mb-3">
  //         <label htmlFor="cpassword" className="form-label">
  //           Confirm Password
  //         </label>
  //         <input
  //           type={hidePassword?"password":"text"}
  //           className="form-control"
  //           id="cpassword"
  //           name="cpassword"
  //           onChange={inputChange}
  //           required
  //         />
  //       </div>
  //       <div className="form-check my-2">
  //         <input
  //           className="form-check-input"
  //           type="checkbox"
  //           value=""
  //           id="flexCheckDefault"
  //           onClick={handlePassword}
  //         />
  //         <label className="form-check-label" HtmlFor="flexCheckDefault"
  //         // checked={hidePassword?"false":"true"}
  //         >
  //           show password
  //         </label>
  //       </div>
  //       <button type="submit" className="btn btn-primary"

  //       //disabled={disable()}
  //       >
  //         Register
  //       </button>
  //     </form>
  //   </div>
  // );

  return (
    <div className="nbody">
      <div className="ncard">
        <h4 className="nheader">create your account</h4>
        <form onSubmit={register}>
          <input
            type="text"
            name="name"
            id=""
            className="ndata"
            placeholder="name"
            onChange={inputChange}
          />
          <input
            type="email"
            name="email"
            id=""
            className="ndata"
            placeholder="email"
            onChange={inputChange}
          />
          <input
            type={hidePassword ? "password" : "text"}
            name="password"
            id=""
            className="ndata"
            placeholder="password"
            onChange={inputChange}
          />
          <input
            type={hidePassword ? "password" : "text"}
            name="cpassword"
            id=""
            className="ndata"
            placeholder="confirm password"
            onChange={inputChange}
          />
          {hidePassword ? (
            <i className="fa-solid fa-eye eye" onClick={handlePassword}></i>
          ) : (
            <i
              className="fa-solid fa-eye-slash eye"
              onClick={handlePassword}
            ></i>
          )}
          <p className="nhide">{!hidePassword ? "hide" : "view"} password</p>
          <input type="submit" value="" className="nsubmit" value="SIGN UP" />
        </form>
        <div className="nfooter">
          <h6>already had an account?</h6>
          <Link className="nsignin" to="/login">
            SIGN IN
          </Link>
        </div>
      </div>
    </div>
  );
}

{
  /* form is submited and button is clicked */
}
