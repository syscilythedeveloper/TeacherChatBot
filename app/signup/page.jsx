"use client";

import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth } from "../firebase";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import Toast from "../components/Toast";
import { toast } from "react-toastify";
import { useUser } from "@/contexts/userContext";
import { createUser } from "../firebase";
// Validation schema
const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Required"),
});

export default function Signup() {
  const router = useRouter();
  const { setUser, isLoggedIn, isLoading } = useUser();
  const handleRegister = async (values, actions) => {
    const { firstName, lastName, email, password } = values;
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      const createUserResponse = await createUser(user);
      console.log("createUserResponse", createUserResponse);

      if (createUserResponse.status === "error") {
        if (createUserResponse.message === "User already exists") {
          return;
        }

        console.error("Error creating user:", createUserResponse.message);
        actions.setFieldError("general", createUserResponse.message);
        return;
      }

      console.log("User registered:", user);
      actions.resetForm();

      toast.success("Registration successful");
      setUser(user);
      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      console.error("Error during registration:", error);
      actions.setFieldError("general", "An error occurred");
    }
  };

  if (isLoading) {
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }
  if (isLoggedIn) {
    router.push("/");
  }

  return (
    <>
      <Toast />
      <Box
        sx={{
          backgroundColor: "rgb(221, 195, 129)",
          width: "100vw",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "392px", height: "100px" }}></Box>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleRegister}
        >
          {({ errors, touched, handleChange, handleBlur, values }) => (
            <Form>
              <Box
                sx={{
                  width: "393px",
                  height: "551px",
                  gap: "0px",
                  borderRadius: "50px",
                  opacity: "0px",
                  backgroundColor: "rgb(240, 246, 232)",
                  display: { xs: "none", sm: "flex" },
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontFamily: "Overpass, Roboto, sans-serif",
                    fontSize: "1.875rem",
                    fontWeight: "400",
                    marginTop: "40px",
                    marginLeft: "30px",
                  }}
                >
                  Create An Account
                </Typography>
                <Link
                  href="/login"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <Typography
                    sx={{
                      fontFamily: "Overpass, Roboto, sans-serif",
                      fontSize: "1rem",
                      fontWeight: "400",
                      marginLeft: "30px",
                      marginBottom: "20px",
                    }}
                  >
                    Already have an account?{" "}
                    <span style={{ color: "rgb(221, 178, 60)" }}>Login</span>
                  </Typography>
                </Link>

                <TextField
                  margin="normal"
                  fullWidth
                  id="first-name"
                  label="First Name"
                  name="firstName"
                  type="text"
                  autoComplete="firstName"
                  autoFocus
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.firstName}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-root": {
                      borderBottom: "2px solid black",
                    },
                    "& .MuiInputBase-input": {
                      padding: "7px 14px",
                    },
                    width: "300px",
                    marginLeft: "30px",
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="last-name"
                  label="Last Name"
                  name="lastName"
                  type="text"
                  autoComplete="lastName"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.lastName}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-root": {
                      borderBottom: "2px solid black",
                    },
                    "& .MuiInputBase-input": {
                      padding: "7px 14px",
                    },
                    width: "300px",
                    marginLeft: "30px",
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-root": {
                      borderBottom: "2px solid black",
                    },
                    "& .MuiInputBase-input": {
                      padding: "7px 14px",
                    },
                    width: "300px",
                    marginLeft: "30px",
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="password"
                  label="Password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  error={touched.password && Boolean(errors.password)}
                  helperText={touched.password && errors.password}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-root": {
                      borderBottom: "2px solid black",
                    },
                    "& .MuiInputBase-input": {
                      padding: "7px 14px",
                    },
                    width: "300px",
                    marginLeft: "30px",
                  }}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="confirm-password"
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  autoComplete="confirm-password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.confirmPassword}
                  error={
                    touched.confirmPassword && Boolean(errors.confirmPassword)
                  }
                  helperText={touched.confirmPassword && errors.confirmPassword}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "& fieldset": {
                        border: "none",
                      },
                    },
                    "& .MuiInputBase-root": {
                      borderBottom: "2px solid black",
                    },
                    "& .MuiInputBase-input": {
                      padding: "7px 14px",
                    },
                    width: "300px",
                    marginLeft: "30px",
                  }}
                />
                <Button
                  type="submit"
                  sx={{
                    width: "209px",
                    height: "42px",
                    borderRadius: "50px",
                    backgroundColor: "rgb(227, 210, 165)",
                    margin: "auto",
                    marginTop: "15px",
                    boxShadow: "0px 4px 10px rgb(221, 195, 128)",
                    "&:hover": {
                      boxShadow: "0px 6px 15px rgb(221, 195, 128)",
                    },
                  }}
                >
                  <span style={{ color: "black", fontWeight: "bold" }}>
                    Sign Up
                  </span>
                </Button>
                {errors.general && (
                  <Typography
                    color="error"
                    sx={{ marginTop: "10px", textAlign: "center" }}
                  >
                    {errors.general}
                  </Typography>
                )}
              </Box>
            </Form>
          )}
        </Formik>
      </Box>
    </>
  );
}
