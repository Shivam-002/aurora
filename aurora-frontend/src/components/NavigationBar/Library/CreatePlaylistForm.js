import React from "react";
import "./CreatePlaylistForm.css";
import { Button, makeStyles, TextField } from "@material-ui/core";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { validation_schema_playlist } from "../../../utilities";

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

function CreatePlaylistForm({ onCancel , onCreate }) {
  const classes = useStyles();
  return (
    <div className="create-playlist">
      <h1>Create Playlist</h1>
      <Formik
        initialValues={{
          playlistName: "",
        }}
        validationSchema={validation_schema_playlist}
        onSubmit={onCreate}
      >
        {({ errors, touched, isValid }) => (
          <Form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Field
              as={TextField}
              className={classes.textField}
              name="playlistName"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              error={errors.playlistName && touched.playlistName}
              helperText={
                errors.playlistName &&
                touched.playlistName &&
                errors.playlistName
              }
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
              }}
            >
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                onClick={onCancel}
              >
                Cancel
              </Button>
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                disabled={!isValid}
                type="submit"
              >
                Create
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default CreatePlaylistForm;
