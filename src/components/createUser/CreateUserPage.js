import React from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import FormField from "./FormField";
import "./CreateUser.css";

//setting the initial values
const initialValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  password: "",
  confirmPassword: "",
};

//creating the validation schema
const validationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("FirstName is required")
    .min(3, "Name must be at least 3 characters")
    .max(10, "Name must not be greater than 10 characters")
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z]+$/.test(value);
    }),
  lastName: yup
    .string()
    .required("Last is required")
    .min(3, "Name must be at least 3 characters")
    .max(10, "Name must not be greater than 10 characters")
    .test("alphabets", "Name must only contain alphabets", (value) => {
      return /^[A-Za-z]+$/.test(value);
    }),
  phone: yup
    .number()
    .required("phone number is required")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .test("phone", "invalid phone number", (value) => {
      return /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/.test(
        value
      );
    }),
  email: yup.string().email().required("Email is a required field"),
  password: yup
    .string()
    .required("Please enter your password")
    .matches(
      /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
      "Password must contain at least 8 characters, one uppercase, one number and one special case character"
    ),
  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .when("password", {
      is: (password) => (password && password.length > 0 ? true : false),
      then: yup.string().oneOf([yup.ref("password")], "Password doesn't match"),
    }),
});

const CreateUser = ({ onSubmit }) => {
  //using useFormik
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  //using formik.getFieldProps for input fields
  const firstNameProps = formik.getFieldProps("firstName");
  const lastNameProps = formik.getFieldProps("lastName");
  const phoneProps = formik.getFieldProps("phone");
  const emailProps = formik.getFieldProps("email");
  const passwordProps = formik.getFieldProps("password");
  const confirmPasswordProps = formik.getFieldProps("confirmPassword");

  return (
    <div className=" mx-auto">
      <div className="flex justify-center px-12 my-10">
        <div className="max-w-lg rounded-lg lg:rounded-l-none flex">
          <form
            onSubmit={formik.handleSubmit}
            className="px-4 pt-6 bg-white rounded"
          >
            <FormField
              label="firstName"
              type="text"
              placeholder="Please Enter your FirstName"
              {...firstNameProps}
            />
            {formik.touched.firstName && formik.errors.firstName ? (
              <div className="input-feedback">{formik.errors.firstName}</div>
            ) : null}
            <FormField
              label="lastName"
              type="text"
              {...lastNameProps}
              placeholder="Please Enter your LastName"
            />
            {formik.touched.lastName && formik.errors.lastName ? (
              <div className="input-feedback">{formik.errors.lastName}</div>
            ) : null}
            <FormField
              label="Phone"
              type="telephone"
              placeholder="Please Enter your phone number"
              {...phoneProps}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="input-feedback">{formik.errors.phone}</div>
            ) : null}
            <FormField
              label="Email"
              type="email"
              placeholder="Please Enter your email"
              {...emailProps}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="input-feedback">{formik.errors.email}</div>
            ) : null}
            <FormField
              label="Password"
              type="password"
              placeholder="Please Enter your password"
              {...passwordProps}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="input-feedback">{formik.errors.password}</div>
            ) : null}
            <FormField
              label="Confirm Password"
              type="password"
              placeholder="Please Confirm your password"
              {...confirmPasswordProps}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className="input-feedback">
                {formik.errors.confirmPassword}
              </div>
            ) : null}
            <div className="mb-6 text-center">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                type="submit"
                isabled={
                  formik.isValid && formik.dirty ? initialValues : undefined
                }
              >
                Register Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
