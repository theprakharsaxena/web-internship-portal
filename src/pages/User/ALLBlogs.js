import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AllBlogsNavbar from "../../components/AllBlogsNavbar";

const ALLBlogs = () => {
  const allBlogs = useSelector((state) => state.blog.value);
  const navigate = useNavigate();

  return (
    <>
      <AllBlogsNavbar />
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
    </>
  );
};

export default ALLBlogs;
