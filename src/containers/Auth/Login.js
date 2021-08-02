import React from "react";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { injectIntl } from "react-intl";
import InputField from "../../components/Controls/InputField";
import ButtonComponent from "../../components/Controls/Button";
import EmailIcon from "../../assets/images/icons/envelope.svg";
import PasswordIcon from "../../assets/images/icons/lock.svg";

const Login = (props) => {
  const { messages } = props.intl;
  const schema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Required"),
    password: yup.string().required("Required"),
  });

  return (
    <div style={{ width: "400px", margin: "auto" }}>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={schema}
        onSubmit={(values) => {
          let payload = {
            email: values.email,
            password: values.password,
          };
          console.log(payload);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <Form>
            <InputField
              name="email"
              type="text"
              // label={"Email address"}
              value={values.email}
              error={errors.email && touched.email}
              handleChange={handleChange}
              helperText={errors.email && touched.email && errors.email}
              placeholder="Email address"
              variant="standard"
              startIcon={EmailIcon}
            />
            <InputField
              name="password"
              type="password"
              // label={"Password"}
              value={values.password}
              error={errors.password && touched.password}
              handleChange={handleChange}
              helperText={
                errors.password && touched.password && errors.password
              }
              // isRequired={true}
              placeholder="Password"
              variant="standard"
              startIcon={PasswordIcon}
            />
            <div className="d-flex justify-content-end mt-3">
              <ButtonComponent
                content="Sign in"
                fullWidth
                handleClick={handleSubmit}
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default injectIntl(Login);
