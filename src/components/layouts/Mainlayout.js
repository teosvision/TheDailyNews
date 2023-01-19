import React from "react";
import { Container } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Mainlayout = (props) => {
  return (
    <Container className="mt-5 mb-5">
      {props.children}
      <ToastContainer />
    </Container>
  );
};

export default Mainlayout;
