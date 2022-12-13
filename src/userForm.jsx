import React from "react";
import Radio from "@mui/material/Radio";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { CheckboxWithLabel } from "formik-material-ui";
import {
  Typography,
  Container,
  CssBaseline,
  Grid,
  TextField,
  Button,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  Checkbox,
  FormGroup,
} from "@mui/material";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";
// import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";

const favSports = ["Cricket", "Football", "Basketball", "Running"];

export default function UserForm() {
  const formikProps = {
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      contactNo: "",
      dob: null,
      country: "",
      userState: "",
      city: "",
      address: "",
      gender: "",
      favSports: [],
      acceptTerms: false,
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required("Enter First Name"),
      lastName: yup.string().required("Enter Last Name."),
      email: yup.string().email().required("Enter Email."),
      contactNo: yup.number().required("Please Enter Contact Number."),
      dob: yup
        .date()
        .typeError("Please Date of Birth")
        .required("Please Date of Birth"),
      country: yup.string().required("Please select country"),
      userState: yup.string().required("Please select state"),
      city: yup.string().required("Please select city"),
      address: yup.string().required("Enter your address"),
      gender: yup.string().required("Please select gender"),
      favSports: yup.array().min(1).required("Please select gender"),
      acceptTerms: yup.boolean().equals([true], "Please check agress terms"),
    }),

    onSubmit: (values, { resetForm }) => {
      const userDetails = { ...values };
      userDetails.dob = userDetails.dob.format();
      console.log(userDetails);
      addDoc(collection(db, "userData"), userDetails).then((onSave) => {
        resetForm();
      });
    },
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ boxShadow: 1 }}>
      <CssBaseline />
      <div>
        <Typography component="h1" variant="h5">
          User Form
        </Typography>
        <Formik {...formikProps}>
          {({ values, errors, handleChange, touched, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              {/* <pre>{JSON.stringify(errors, null, 2)}</pre> */}
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.firstName && touched.firstName}
                    autoComplete="fname"
                    name="firstName"
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={values.firstName}
                    id="firstName"
                    label="First Name"
                    autoFocus
                    helperText={
                      touched.firstName && errors.firstName
                        ? errors.firstName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    error={errors.lastName && touched.lastName}
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={values.lastName}
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    autoComplete="lname"
                    helperText={
                      touched.lastName && errors.lastName
                        ? errors.lastName
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.email && touched.email}
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={values.email}
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    helperText={
                      touched.email && errors.email ? errors.email : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    error={errors.contactNo && touched.contactNo}
                    variant="standard"
                    fullWidth
                    onChange={handleChange}
                    value={values.contactNo}
                    id="contactNo"
                    label="Contact Number"
                    name="contactNo"
                    autoComplete="contact"
                    helperText={
                      touched.contactNo && errors.contactNo
                        ? errors.contactNo
                        : null
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    name="gender"
                    value={values.dob}
                    error={touched.dob && Boolean(errors.dob)}
                  >
                    <FormLabel component="legend">Date Of Birth</FormLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DatePicker
                        fullWidth
                        label="Date of Birth"
                        value={values.dob}
                        onChange={(date) => {
                          handleChange({
                            target: { name: "dob", value: date },
                          });
                        }}
                        helperText={touched.dob && errors.dob}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                    {touched.dob && errors.dob && (
                      <FormHelperText>{errors.dob}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    name="gender"
                    value={values.gender}
                    error={touched.gender && Boolean(errors.gender)}
                  >
                    <FormLabel component="legend">Gender</FormLabel>
                    <RadioGroup
                      onChange={(e) =>
                        handleChange({
                          target: { name: "gender", value: e.target.value },
                        })
                      }
                    >
                      <FormControlLabel
                        value="Male"
                        control={<Radio />}
                        label="Male"
                      />
                      <FormControlLabel
                        value="Female"
                        control={<Radio />}
                        label="Female"
                      />
                      <FormControlLabel
                        value="Other"
                        control={<Radio />}
                        label="Other"
                      />
                    </RadioGroup>
                    {touched.gender && errors.gender && (
                      <FormHelperText>{errors.gender}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      Country
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      error={errors.country && touched.country}
                      id="country"
                      name="country"
                      label="Country"
                      onChange={handleChange}
                      value={values.country}
                    >
                      <MenuItem value={"INDIA"}>INDIA</MenuItem>
                      <MenuItem value={"USA"}>USA</MenuItem>
                      <MenuItem value={"UAE"}>UAE</MenuItem>
                      <MenuItem value={"UK"}>UK</MenuItem>
                      <MenuItem value={"CANADA"}>CANADA</MenuItem>
                      <MenuItem value={"RUSSIA"}>RUSSIA</MenuItem>
                      <MenuItem value={"AUSTRALIA"}>AUSTRALIA</MenuItem>
                    </Select>
                    <div>
                      {touched.country && errors.country ? (
                        <div className="errorMessage">{errors.country}</div>
                      ) : null}
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      State
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      error={errors.userState && touched.userState}
                      id="userState"
                      name="userState"
                      label="State"
                      onChange={handleChange}
                      value={values.userState}
                    >
                      <MenuItem value={"Andhra Pradesh"}>
                        Andhra Pradesh
                      </MenuItem>
                      <MenuItem value={"Telangana"}>Telangana</MenuItem>
                      <MenuItem value={"Kerala"}>Kerala</MenuItem>
                      <MenuItem value={"Tamilnadu"}>Tamilnadu</MenuItem>
                      <MenuItem value={"Karnataka"}>Karnataka</MenuItem>
                      <MenuItem value={"Maharashtra"}>Maharashtra</MenuItem>
                      <MenuItem value={"Panjab"}>Panjab</MenuItem>
                    </Select>
                    <div>
                      {touched.userState && errors.userState ? (
                        <div className="errorMessage">{errors.userState}</div>
                      ) : null}
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-helper-label">
                      City
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-helper-label"
                      error={errors.city && touched.city}
                      id="city"
                      name="city"
                      label="City"
                      onChange={handleChange}
                      value={values.city}
                    >
                      <MenuItem value={"Ongole"}>Ongole</MenuItem>
                      <MenuItem value={"Guntur"}>Guntur</MenuItem>
                      <MenuItem value={"Vijayawada"}>Vijayawada</MenuItem>
                      <MenuItem value={"Nellore"}>Nellore</MenuItem>
                      <MenuItem value={"Hyderabad"}>Hyderabad</MenuItem>
                      <MenuItem value={"Munnar"}>Munnar</MenuItem>
                      <MenuItem value={"Chennai"}>Chennai</MenuItem>
                    </Select>
                    <div>
                      {touched.city && errors.city ? (
                        <div className="errorMessage">{errors.city}</div>
                      ) : null}
                    </div>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <TextField
                      error={errors.address && touched.address}
                      id="address"
                      name="address"
                      label="Address"
                      multiline
                      onChange={handleChange}
                      value={values.address}
                      rows={4}
                      variant="standard"
                      helperText={
                        touched.address && errors.address
                          ? errors.address
                          : null
                      }
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <FormControl
                    component="fieldset"
                    style={{ display: "flex" }}
                    error={touched.favSports && Boolean(errors.favSports)}
                  >
                    <FormLabel component="legend">Favourite Sports</FormLabel>
                    <FormGroup>
                      {favSports.map((sport) => (
                        <Field
                          type="checkbox"
                          component={CheckboxWithLabel}
                          name="favSports"
                          key={sport}
                          value={sport}
                          Label={{ label: sport }}
                        />
                      ))}
                    </FormGroup>
                    {touched.favSports && errors.favSports && (
                      <FormHelperText>{errors.favSports}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>

                <Grid item xs={12}>
                  <FormControl
                    error={touched.acceptTerms && Boolean(errors.acceptTerms)}
                  >
                    <FormGroup>
                      <FormControlLabel
                        name="acceptTerms"
                        checked={values.acceptTerms}
                        control={<Checkbox />}
                        value={true}
                        onChange={handleChange}
                        label="I Agree To The Terms And Conditions"
                      />
                    </FormGroup>
                    {touched.acceptTerms && errors.acceptTerms && (
                      <FormHelperText>{errors.acceptTerms}</FormHelperText>
                    )}
                  </FormControl>
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  );
}
