import React from "react";
import { useContext } from "react";
import PasswordContext from "../../context/passwords/passwordContext";
import AlertContext from "../../context/alert/alertContext";
import AES from "crypto-js/aes";
import enc from "crypto-js/enc-utf8";
 
// import ENC from "crypto-js/enc-utf8";


export default function PasswordItem(props) {
  const alertContext = useContext(AlertContext);
  let { showAlert } = alertContext;
  const passwordContext = useContext(PasswordContext);
  let { deletePassword } = passwordContext;
  let { password, toggleUpdate } = props;
  let key = "iamaboy";
  return (
    <>
      <div className="col-md-4">
        <div className="card my-3" id="password-card">
          <div className="card-body">
            <h5 className="card-title">{password.email}</h5>
            <span className="badge bg-success">{password.platform}</span>
            <p className="card-text">
              {password.password?AES.decrypt(password.password, key).toString(enc):""}
            </p>
            <i
              className="fa-solid fa-pen-to-square mx-2"
              onClick={() => {
                toggleUpdate(password);
              }}
            ></i>

            <i
              className="fa-solid fa-trash-can mx-2"
              onClick={() => {
                deletePassword(password._id);
                showAlert("Password Deleted Successfully", "success");
              }}
            ></i>
          </div>
        </div>
      </div>
    </>
  );
}

