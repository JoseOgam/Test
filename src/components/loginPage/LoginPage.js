import React from "react";

import { Formik } from "formik";
import * as EmailValidator from "email-validator";
import "./LoginPage.css";

const LoginPage = () => (
  <Formik
    validate={(values) => {
      let errors = {};
      if (!values.email) {
        errors.email = "Email address is Required";
      } else if (!EmailValidator.validate(values.email)) {
        errors.email = "Email address is invalid.";
      }
      return errors;
    }}
    initialValues={{ email: "", password: "" }}
    onSubmit={(values, { setSubmitting }) => {
      setTimeout(() => {
        console.log("Logging in", values);
        setSubmitting(false);
      }, 500);
    }}
  >
    {(props) => {
      const {
        values,
        touched,
        errors,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      } = props;

      return (
        <div>
          <h1>User Login</h1>
          <div className="flex justify-center px-2 my-4 mx-auto">
            <div className="w-full rounded-lg lg:rounded-l-none flex">
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded px-6 pt-6"
              >
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="text"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={errors.email && touched.email && "error"}
                />
                {errors.email && touched.email && (
                  <div className="input-feedback">{errors.email}</div>
                )}
                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                />
                <div className="mb-6 text-center">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Login
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      );
    }}
  </Formik>
);

export default LoginPage;
