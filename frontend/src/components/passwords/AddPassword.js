import React from "react";
import PasswordContext from "../../context/passwords/passwordContext";
import { useContext, useState } from "react";
import AlertContext from "../../context/alert/alertContext";
import AES from 'crypto-js/aes';
export default function AddPassword() {
  const alertContext = useContext(AlertContext);
  let { showAlert } = alertContext;
  const passwordContext = useContext(PasswordContext);
  let { addPassword } = passwordContext;
  const [password, setpassword] = useState({
    platform: "",
    email: "",
    password: "",
  });
  const inputChange = (e) => {
    // //console.log("hello")
    // //console.log(e.target.name,e.target.value);
    setpassword({ ...password, [e.target.name]: e.target.value });
  };
  const createPassword = (e) => {
    // //console.log(password);
    if (!disable()) {
      e.preventDefault();
      let key="iamaboy";
      let enc=AES.encrypt(password.password,key).toString();
      // //console.log(enc);
      addPassword(password.platform, enc, password.email);
      setpassword({ platform: "", email: "", password: "" });
      showAlert("Password Added", "success");
    }
    e.preventDefault();
  };

  const disable = () => {
    if (password.platform.length < 5) {
      showAlert("platform must be atleast 5 characters", "info");
      return true;
    }
    if (password.password.length < 8) {
      showAlert("password must be atleat 8 characters", "info");
      return true;
    }
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!password.email.match(mailformat)) {
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
  return (
    <div style={{marginLeft:"3em"}}>
      <h1>Add a Password</h1>
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
            required
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
            required
            value={password.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type={hidePassword?"password":"text"}
            className="form-control"
            id="password"
            name="password"
            onChange={inputChange}
            required
            value={password.password}
          />
        </div>
        {/* {/* <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="exampleCheck1"
          />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label> *
        </div> */}
        <div class="form-check my-2">
          <input
            class="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
            onClick={handlePassword}
          />
          <label
            className="form-check-label"
            HtmlFor="flexCheckDefault"
            // checked={hidePassword?"false":"true"}
          >
            show password
          </label>
        </div>
        <button
          type="submit"
          className="btn btn-primary"
          onClick={createPassword}
        >
          Add Password
        </button>
        {/* form is submited and button is clicked */}
      </form>
    </div>
  );
}
