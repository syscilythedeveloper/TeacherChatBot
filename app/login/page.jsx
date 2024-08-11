"use client";

import { Container, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "next/link";
import { auth } from "@/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { useUser } from "@/contexts/userContext";

// Validation schema
const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

export default function Login() {
  const { isLoggedIn, isLoading } = useUser();

  const router = useRouter();
  const handleLogin = async (values, actions) => {
    const { email, password } = values;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      actions.setSubmitting(false);
      router.push("/");
    } catch (error) {
      console.error("Error signing in: ", error);
      actions.setFieldError("general", "Invalid email or password");
      actions.setSubmitting(false);
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
    return (
      <Container>
        <Typography>Loading...</Typography>
      </Container>
    );
  }

  return (
    <>
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
        <Box sx={{ width: "392px", height: "240px" }}>
          <Typography
            variant="h1"
            sx={{
              display: { xs: "flex", sm: "flex" },
              textShadow: "8px 2px 4px rgba(213, 159, 23, 0.5)",
              textAlign: "center",
              fontFamily: "Rampart One, Roboto, sans-serif",
            }}
          >
            Rambot AI
          </Typography>
        </Box>

        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({
            errors,
            touched,
            handleChange,
            handleBlur,
            values,
            isSubmitting,
          }) => (
            <Form>
              <Box
                component="div"
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
                  Login
                </Typography>
                <Link
                  href="/signup"
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
                    Don&apos;t have an account?{" "}
                    <span style={{ color: "rgb(221, 178, 60)" }}>Sign up</span>
                  </Typography>
                </Link>

                <TextField
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  autoFocus
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
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
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
                    "&:hover fieldset": {
                      border: "none",
                    },
                    "&.Mui-focused fieldset": {
                      border: "none",
                    },
                    "& .MuiInputBase-input": {
                      padding: "7px 14px",
                    },
                    width: "300px",
                    marginLeft: "30px",
                  }}
                />
                <Typography
                  sx={{
                    fontFamily: "Overpass, Roboto, sans-serif",
                    fontSize: "1rem",
                    fontWeight: "400",
                    marginLeft: "30px",
                  }}
                >
                  <span style={{ color: "rgb(221, 178, 60)" }}>
                    Forgot Password?
                  </span>
                </Typography>
                <Button
                  type="submit"
                  disabled={isSubmitting}
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
                    Login
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
