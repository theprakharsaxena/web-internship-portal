import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import loginapi from "../services/authentication/loginapi";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slice/userSlice";
import { toast } from "react-hot-toast";
import CircularProgressIndicator from "../common/Loadable/CircularProgressIndicator";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <a color="inherit" href="https://mui.com/">
        Your Website
      </a>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function SignIn() {
  const userValue = useSelector((state) => state.user.value);
  const uid = userValue?._id;
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginapi({
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        setLoading(false);
        toast.success("User Login Successfully");
        dispatch(addUser(data?.user));
        navigate("/dashboard");
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {}, []);

  return (
    <>
      <CircularProgressIndicator loading={loading} />
      {!uid ? (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Link to="/admin">ADMIN</Link>
            <Box
              component="form"
              onSubmit={(e) => {
                setLoading(true);
                handleSubmit(e);
              }}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                type="email"
                autoComplete="email"
                value={inputs.email}
                onChange={handleChange}
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                value={inputs.password}
                onChange={handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link to="/register" variant="body2">
                    Register?
                  </Link>
                </Grid>
                {/* <Grid item>
                  <a href="https://zoho.com" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </a>
                </Grid> */}
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      ) : (
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",height:"100vh",flexDirection:"column"}}>
          <Link to="/">BACK TO HOME PAGE</Link>
          <Link style={{marginTop:"20px"}} to="/dashboard">GO TO DASHBOARD PAGE</Link>
        </Box>
      )}
    </>
  );
}
