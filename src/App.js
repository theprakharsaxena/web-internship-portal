import { useEffect } from "react";
import Routes from "./routes/routes";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addAllblogs } from "./redux/slice/blogSlice";
import { useQueryGetAllBlogs } from "./query/getAllBlogs";
import CircularProgressIndicator from "./common/Loadable/CircularProgressIndicator";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import { ContactPage, LinkedIn } from "@mui/icons-material";

// fyhfh

const LinkedInProfileURL =
  "https://www.linkedin.com/in/shivam-raghuvanshi-890b0b160/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app";

const handleLinkedInClick = () => {
  window.open(LinkedInProfileURL, "_blank");
};

const App = () => {
  const dispatch = useDispatch();

  const getAllBlog = useQueryGetAllBlogs();

  useEffect(() => {
    if (!getAllBlog.isLoading) {
      dispatch(addAllblogs(getAllBlog?.data));
    }
  }, [dispatch, getAllBlog]);

  return (
    <>
      <CircularProgressIndicator loading={getAllBlog.isLoading} />
      <Toaster />
      <Routes />
      <SpeedDial
        ariaLabel="SpeedDial basic example"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
        icon={<ContactPage />}
      >
        <SpeedDialAction
          icon={<LinkedIn />}
          tooltipTitle="LinkedIn"
          onClick={handleLinkedInClick}
        ></SpeedDialAction>
      </SpeedDial>
    </>
  );
};

export default App;
