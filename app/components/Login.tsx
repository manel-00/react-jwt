import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import styles from "./Login.module.css";
import { useNavigate } from "react-router";
import { useContext } from "react";
import { AuthContext } from "~/context/AuthProvider";
import axios from "~/api/axios";


const LoginSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const Login = () => {
  const navigate = useNavigate(); //usenavigate must be used inside the component
  const { setAccessToken,setUser,setAuthenticated } = useContext(AuthContext);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.card}>
          <h2 className={styles.title}>Welcome Back</h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={LoginSchema}
            onSubmit={async (values) => {
              try {
                const response = await axios.post(
                  "/auth/login",
                  values, //these are the values from the user input & being sent in the req body
                );
                const {accessToken,user} = response.data;
                setAccessToken(accessToken);
                setUser(user);
                setAuthenticated(true);
                //console.log("LOGIN RESPONSE:", response.data);
              } catch (error) {
                console.error(error);
              }
             //navigate("/feedbacks");
            //   navigate("/admin")
            }}
          >
            <Form className={styles.form}>
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
                Login
              </button>
              <div className={styles.linkText}>
                Don’t have an account? <a href="/register">Register</a>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </>
  );
};



//submit with console log
/* onSubmit={async (values) => {
             console.log(values); //for the input values in the form
              try {
                const response = await axios.post(
                  "http://localhost:3000/auth/login",
                  values,
                );
                const token = response.data.accessToken;
                setAccessToken(token);

               console.log("Backend response:", response.data);
              } catch (error) {
                console.error(error);
              }
              navigate("/feedbacks");
            }}  */
