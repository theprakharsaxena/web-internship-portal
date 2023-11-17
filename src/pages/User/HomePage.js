import { useNavigate } from "react-router-dom";
import NavBar from "../../components/NavBar";
import { useSelector } from "react-redux";
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

const HomePage = () => {
  const allBlogs = useSelector((state) => state.blog.value);
  const navigate = useNavigate();

  return (
    <>
      <NavBar />
      <Grid container spacing={5} marginY={2} marginX={1}>
        <Grid item xs={7}>
          <Grid container marginRight={5}>
            <Grid item xs={4}>
              <img src="/slider1.png" height={250} alt="slider1"/>
            </Grid>
            <Grid item xs={8} height={250}>
              <Typography height="100%" display="flex" justifyContent="start" alignItems="center" fontSize="24px" fontWeight="900">
                Your one-stop solution for all your jobs and internship-related
                queries.
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <a
            href="https://topmate.io/shivam_raghuvanshi"
            target="_blank"
            rel="noreferrer"
          >
            <img src="/topmate.jpeg" height={200} alt="topmate"/>
          </a>
        </Grid>
      </Grid>
      <Grid container spacing={5} marginY={2} marginX={1}>
        {allBlogs?.blogs.map((item, index) => (
          <Grid
            item
            xs={4}
            key={index}
            onClick={() => navigate(`/blog/${item._id}`)}
          >
            <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="140"
                  image={item.image}
                  alt="green iguana"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {item.title}
                  </Typography>
                  <Typography color="text.secondary">
                    Posted On -{" "}
                    {item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : ""}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
      <div id="aboutus">
        <Box display="flex" justifyContent="center" marginY="40px">
          <Box width="700px" textAlign="center">
            <Typography variant="h4" fontWeight="bold">
              About US
            </Typography>
            <Typography>
              We are a group of Engineers helping others to win in life by
              providing the best mentorship and guidance for internships and
              placements in Top MNCs and Fortune 500 companies by conducting
              FREE Mock Interviews, 1:1 Sessions, Resume reviews, Coding
              Contests and Personal Mentoring.
            </Typography>
          </Box>
        </Box>
      </div>
      <div id="contactus">
        <Box display="flex" justifyContent="center" marginY="40px">
          <Box width="700px" textAlign="center">
            <Typography variant="h4" fontWeight="bold">
              Get in touch
            </Typography>
            <Typography color="gray">
              LinkedIn :{" "}
              <a
                href="https://www.linkedin.com/company/connect-with-mind/"
                target="_blank"
                rel="noreferrer"
              >
                MIND-Mentoring In New Dimensions
              </a>
            </Typography>
            <Typography>
              <Button>Send Message</Button>
            </Typography>
          </Box>
        </Box>
      </div>
    </>
  );
};

export default HomePage;
