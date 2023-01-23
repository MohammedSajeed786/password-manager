import React, { useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../../context/alert/alertContext";
import { useContext } from "react";
import { Link } from "react-router-dom";
import "./login.css";
export default function Login() {
  let navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("token") !== null) {
      navigate("/");
    }
  });

  const alertContext = useContext(AlertContext);
  let { showAlert } = alertContext;

  //state for cred
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  const inputChange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const login = async (e) => {
    //disable retuurns true if something is wrong
    if (!disable()) {
      e.preventDefault();
      const response = await fetch(`/api/auth/loginuser`, {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: credentials.password,
          email: credentials.email,
        }), // body data type must match "Content-Type" header
      });
      const json = await response.json();
      //console.log(json);
      if (json.success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        showAlert("Login successful", "success");
        // console.log(localStorage.getItem('token'));
      } else {
        showAlert("invalid credentials", "danger");
      }
    }
    e.preventDefault();
  };

  const disable = () => {
    if (credentials.password.length < 8) {
      showAlert("password must be atleat 8 characters", "info");
      return true;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!credentials.email.match(mailformat)) {
      showAlert("invalid email", "info");
      return true;
    }
    return false;
  };

  //state for hide password
  const [hidePassword, sethidePassword] = useState(true);
  const handlePassword = (e) => {
    //  e.preventDefault();
    // console.log("pass");
    if (hidePassword === true) sethidePassword(false);
    else sethidePassword(true);
    //console.log(hidePassword);
  };
  // return (
  //   <div className="container">
  //     <h1>Please Login with your Credentials</h1>
  //     <form onSubmit={login}>
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
  //           type={hidePassword ? "password" : "text"}
  //           className="form-control"
  //           id="password"
  //           name="password"
  //           onChange={inputChange}
  //           required
  //         />
  //       </div>
  //       <div class="form-check my-2">
  //         <input
  //           class="form-check-input"
  //           type="checkbox"
  //           value=""
  //           id="flexCheckDefault"
  //           onClick={handlePassword}
  //         />
  //         <label
  //           className="form-check-label"
  //           HtmlFor="flexCheckDefault"
  //           // checked={hidePassword?"false":"true"}
  //         >
  //           show password
  //         </label>
  //       </div>
  //       <button
  //         type="submit"
  //         className="btn btn-primary"
  //         //disabled={disable()}
  //       >
  //         Login
  //       </button>
  //       {/* form is submited and button is clicked */}
  //     </form>
  //   </div>
  // );

  return (
    <div className="body">
      <div className="logincard">
        <h4 className="header">sign in</h4>
        <form onSubmit={login}>
          <input
            type="email"
            name="email"
            id=""
            className="data"
            placeholder="email"
            onChange={inputChange}
          />
          <input
            type={hidePassword ? "password" : "text"}
            name="password"
            id=""
            className="data"
            placeholder="password"
            onChange={inputChange}
          />
          {hidePassword ? (
            <i className="fa-solid fa-eye eye" onClick={handlePassword}></i>
          ) : (
            <i class="fa-solid fa-eye-slash eye" onClick={handlePassword}></i>
          )}
          <p className="hide">{!hidePassword ? "hide" : "view"} password</p>
          <input type="submit" value="" className="submit" value="SIGN IN" />
        </form>
        <div className="footer">
          <h6>Didn’t have an account?</h6>
          <Link className="signup" to="/signup">
            SIGN UP NOW
          </Link>
        </div>
      </div>
    </div>
  );
}
