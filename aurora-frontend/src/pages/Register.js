import React, { useState } from "react";
import {
  Button,
  FormControl,
  InputLabel,
  makeStyles,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import "./Register.css";
import BACKEND_BASE_URL from "../config";
import { countries, validation_schema_register } from "../utilities";
import { useNavigate } from "react-router-dom";
import { Alert, Snackbar } from "@mui/material";

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
    marginTop: "20px",
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

  formControl: {
    display: "flex",
    flexDirection: "row",
    color: "#e3e3e3 !important",
    fontWeight: 500,
    fontSize: "1.05rem",
    padding: "5px 20px",
    border: "solid 1px white",
    borderRadius: "5px",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  select: {},
  selectMenu: {
    backgroundColor: "#181818",
  },
}));

function Register() {
  const navigate = useNavigate();
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const [error, setError] = React.useState("Invalid Input!");

  const handleSubmit = async (values) => {
    try {
      const endpoint_url = BACKEND_BASE_URL + "auth/register";

      console.log("Registering user with values:", values, {
        headers: {
          mode: "no-cors",
        },
      });
      const response = await axios.post(endpoint_url, values);
      localStorage.setItem("jwtToken", response.data.jwtToken);
      navigate("/main");
    } catch (error) {
      setError(error.response.data);
      setOpen(true);
    }
  };

  const login = () => {
    navigate("/login");
  };

  return (
    <div className="register">
      <Snackbar
        open={open}
        autoHideDuration={5000}
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
          firstName: "",
          lastName: "",
          gender: "male",
          country: "India",
          email: "",
          password: "",
        }}
        validationSchema={validation_schema_register}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid }) => (
          <Form>
            <div className="field-row">
              <Field
                as={TextField}
                className={classes.textField}
                name="firstName"
                label="First Name"
                variant="outlined"
                fullWidth
                margin="normal"
                error={errors.firstName && touched.firstName}
              />
              <Field
                as={TextField}
                className={classes.textField}
                name="lastName"
                label="Last Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </div>
            <div className="field-row">
              <Field
                as={Select}
                className={classes.formControl}
                name="gender"
                label="Gender"
                vairant="outlined"
                fullWidth
                margin="normal"
                error={errors.gender && touched.gender}
                MenuProps={{
                  classes: { paper: classes.selectMenu },
                }}
                defaultValue="male"
              >
                <MenuItem key={"male"} value={"male"}>
                  Male
                </MenuItem>
                <MenuItem key={"female"} value={"female"}>
                  Female
                </MenuItem>
                <MenuItem key={"other"} value={"other"}>
                  Other
                </MenuItem>
              </Field>
              <Field
                as={Select}
                className={classes.formControl}
                name="country"
                label="Country"
                vairant="outlined"
                fullWidth
                margin="normal"
                error={errors.country && touched.country}
                MenuProps={{
                  classes: { paper: classes.selectMenu },
                }}
                defaultValue="India"
              >
                {countries.map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </Field>
            </div>
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
                Register
              </Button>
            </div>
          </Form>
        )}
      </Formik>
      <span className="register-login" onClick={login}>
        Already a User? Login Here!
      </span>
    </div>
  );
}

export default Register;
