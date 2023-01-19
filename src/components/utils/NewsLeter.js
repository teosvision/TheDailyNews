import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import { userEmail } from "../../store/utils/Thunks";
import { showToast } from "./Tools";
import { clearUserById } from "../../store/reducers/Users";
const NewsLeter = () => {
  const textInput = useRef();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = textInput.current.value;

    dispatch(userEmail({ email: value }))
      .unwrap()
      .then((response) => {
        if (response.newsletter === "added") {
          showToast("SUCCESS", "Thank you for subscribe!");
          textInput.current.value = "";
        }
        if (response.newsletter === "failed") {
          showToast("ERROR", "Dude dont try again!");
          textInput.current.value = "";
        }
        dispatch(clearUserById());
      });
  };

  return (
    <div className="newsletter_container">
      <h1>Join our newsletter</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            ref={textInput}
            placeholder="Enter email"
          />
        </Form.Group>

        <Button variant="primary" className="mt-2" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default NewsLeter;
