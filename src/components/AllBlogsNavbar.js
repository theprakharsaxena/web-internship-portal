import { AppBar, Toolbar, Typography, Box } from "@mui/material";
import { Link } from "react-router-dom";

const AllBlogsNavbar = () => {
  return (
    <AppBar position="static" color="inherit">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            to="/"
          >
            <img src="/logo.jpeg" height={50} alt="logo" />
            <Typography
              variant="h6"
              color="black"
              fontWeight="900"
              marginTop="2px"
              marginLeft="1rem"
            >
              Internship Portal
            </Typography>
          </Link>
        </Typography>
        <Box sx={{ display: "flex", textDecoration: "none" }}>
          <Link style={{ marginLeft: "20px", color: "black" }} to="/">
            HOME
          </Link>
          <a
            style={{ marginLeft: "20px", color: "black" }}
            href="https://www.linkedin.com/in/prakhar-saxena-ps/"
            target="_blank"
            rel="noreferrer"
          >
            FollowUs
          </a>
          <Link style={{ marginLeft: "20px", color: "black" }} to="/allblogs">
            JOBS | INTERNSHIPS
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default AllBlogsNavbar;
