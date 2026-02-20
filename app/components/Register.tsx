import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import axios from "axios";

const registerSchema = Yup.object({
  fullname: Yup.string().required("Full name is required !"),
  username: Yup.string().required("Username is required !"),
  email: Yup.string()
    .email("Your email address is invalid !")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .matches(/[!@#$%^&*(),.?":{}|<>]/, "must include a special character")
    .required("Password is required!"),
});

export const Register = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Register</h2>

          <Formik
            initialValues={{
              fullname: "",
              username: "",
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              try {
                const response = await axios.post(
                  "http://localhost:3000/auth/register",
                  values,
                );
                navigate("/");
              } catch (error) {
                console.log(error);
              }
            }}
            validationSchema={registerSchema}
          >
            <Form className={styles.form}>
              <div className={styles.fieldGroup}>
                <label htmlFor="fullname" className={styles.label}>
                  Full Name
                </label>
                <Field
                  name="fullname"
                  type="text"
                  placeholder="Enter your full name"
                  className={styles.input}
                />
                <ErrorMessage
                  name="fullname"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="username" className={styles.label}>
                  Username
                </label>
                <Field
                  name="username"
                  type="text"
                  placeholder="Choose a username"
                  className={styles.input}
                />
                <ErrorMessage
                  name="username"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="email" className={styles.label}>
                  Email Adress
                </label>
                <Field
                  name="email"
                  type="email"
                  placeholder="Email"
                  className={styles.input}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.error}
                />
              </div>
              <div className={styles.fieldGroup}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <Field
                  name="password"
                  type="password"
                  placeholder="Password"
                  className={styles.input}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className={styles.error}
                />
              </div>
              <button type="submit" className={styles.button}>
                Register
              </button>
              <div className={styles.linkText}>
                Already have an account? <a href="/">login</a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};
