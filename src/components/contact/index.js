import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Alert, Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { sendMessage } from "../../store/utils/Thunks";
import { showToast } from "../utils/Tools";
const Contact = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: "",
      firstname: "",
      lastname: "",
      message: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Sorry , email is required!")
        .email("Sorry , email is invalid!"),
      firstname: yup.string().required("Sorry , firstname is required!"),
      lastname: yup.string().required("Sorry , lastname is required!"),
      message: yup
        .string()
        .required("Sorry , message is required!")
        .max(500, "Sorry, message is too long!"),
    }),
    onSubmit: (values, { resetForm }) => {
      dispatch(sendMessage(values))
        .unwrap()
        .then((resp) => {
          if (resp) {
            showToast("SUCCESS", "Thank you, we will contact you back!");
          }
        })
        .catch((error) => {
          showToast("ERROR", "Sorry, try again later!");
        });
    },
  });
  return (
    <>
      <h1>Contact us</h1>
      <form className="mt-3" onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control mt-1"
            name="email"
            placeholder="exmaple@gmail.com"
            {...formik.getFieldProps("email")}
          />
          {formik.errors.email && formik.touched.email ? (
            <Alert variant="danger">{formik.errors.email}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="firstname">Firstname</label>
          <input
            type="text"
            className="form-control mt-1"
            name="firstname"
            placeholder="Steve"
            {...formik.getFieldProps("firstname")}
          />
          {formik.errors.firstname && formik.touched.firstname ? (
            <Alert variant="danger">{formik.errors.firstname}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="lastname">Last name</label>
          <input
            type="text"
            className="form-control mt-1"
            name="lastname"
            placeholder="McDonald"
            {...formik.getFieldProps("lastname")}
          />
          {formik.errors.lastname && formik.touched.lastname ? (
            <Alert variant="danger">{formik.errors.lastname}</Alert>
          ) : null}
        </div>
        <div className="form-group mt-2">
          <label htmlFor="message">Message</label>
          <textarea
            type="text"
            className="form-control mt-1"
            name="message"
            {...formik.getFieldProps("message")}
          />
          {formik.errors.message && formik.touched.message ? (
            <Alert variant="danger">{formik.errors.message}</Alert>
          ) : null}
        </div>
        <Button variant="outline-dark" type="submit" className="mt-2">
          Send message
        </Button>
      </form>
    </>
  );
};

export default Contact;
