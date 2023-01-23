import React from "react";
import AlertContext from "./alertContext";
import { useState } from "react";
export default function AlertState(props) {
  const [alert, setalert] = useState(null);
  const showAlert = (message, type) => {
    setalert({ msg: message, type: type });
    setTimeout(() => {
      setalert(null);
    }, 1500);
  };
  return (
    <AlertContext.Provider value={{alert, showAlert}}>
      {props.children}
    </AlertContext.Provider>
  );
}
