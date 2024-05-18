import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import BACKEND_BASE_URL from "../config";
import { validation_schema_login } from "../utilities";
import "./Login.css";
import { Alert, Snackbar } from "@mui/material";

//TODO : Move same Register adn Login code to a common file
const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#242424",
    color: "#e3e3e3 !important",
    fontWeight: 500,
    fontSize: "1.05rem",
    padding: "5px 20px",
    border: "solid 1px #121212",
    borderRadius: "5px",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
    marginTop: "10px",
    "&:hover": {
      backgroundColor: "#282828",
      color: "white !important",
    },
    "&.Mui-disabled": {
      opacity: 0.5,
      pointerEvents: "none",
    },
  },
  textField: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#e3e3e3",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-error fieldset": {
        borderColor: "#e3e3e3",
      },
    },
    "& .MuiFormLabel-root.Mui-focused": {
      color: "#e3e3e3",
    },
  },
}));

function Login() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("Invalid Input!");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const register = () => {
    navigate("/register");
  };

  //TODO : Check expiry on server-side
  useEffect(() => {
    verifyToken();
  }, []);

  const handleSubmit = async (values) => {
    logIn(values);
  };

  const verifyToken = async () => {
    const jwtToken = localStorage.getItem("jwtToken");
    if (jwtToken && jwtToken !== undefined) {
      try {
        console.log("Token found. Verifying token...");
        const endpoint_url = `${BACKEND_BASE_URL}auth/verify-token?token=${jwtToken}`;
        const response = await axios.get(endpoint_url);

        if (response.data === true) {
          console.log("Token is valid. Redirecting to main page.");
          navigate("/main");
        } else {
          console.error("Token is invalid. Please log in again.");
          localStorage.removeItem("jwtToken");
          navigate("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        localStorage.removeItem("jwtToken");
        navigate("/login");
      }
    } else {
      console.log("No token found. Please log in.");
    }
  };

  const logIn = async (values) => {
    const endpoint_url = BACKEND_BASE_URL + "auth/authenticate";
    axios
      .post(endpoint_url, values)
      .then((response) => {
        localStorage.setItem("jwtToken", response.data.jwtToken);
        navigate("/main");
      })
      .catch((error) => {
        setError(error.response.data);
        setOpen(true);
      });
  };

  return (
    <div className="login">
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
      <img src="./aurora-logo.webp" alt="Aurora logo" />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validation_schema_login}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <div className="field-row">
              <Field
                as={TextField}
                className={classes.textField}
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.email && touched.email}
                helperText={errors.email && touched.email && errors.email}
              />
            </div>
            <div className="field-row">
              <Field
                as={TextField}
                className={classes.textField}
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.password && touched.password}
                helperText={
                  errors.password && touched.password && errors.password
                }
              />
            </div>
            <div className="field-row">
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit"
                disabled={!isValid}
              >
                Login
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <span className="login-register" onClick={register}>
        New User? Register Here!
      </span>
    </div>
  );
}
export default Login;
