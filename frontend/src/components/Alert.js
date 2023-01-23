import React from 'react'
import AlertContext from '../context/alert/alertContext';
import { useContext } from 'react';
export default function Alert() {
  const alertContext=useContext(AlertContext);
  let {alert}=alertContext;
  return (
    <div style={{ height: "50px" }}>
    {alert && (
      <div
        className={`alert alert-${alert.type} alert-dismissible fade show`}
        role="alert"
      >
        <strong>{alert.type}</strong>:{alert.msg}.
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    )}
  </div>
  )
}
