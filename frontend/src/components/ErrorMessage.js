import React from "react";
import { Alert } from "react-bootstrap";

function ErrorMessage(props) {
  return <Alert variant={props.varient || "info"}>{props.children}</Alert>;
}

export default ErrorMessage;
