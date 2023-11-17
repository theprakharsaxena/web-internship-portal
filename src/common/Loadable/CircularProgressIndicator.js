import { Box, CircularProgress } from "@mui/material";

const CircularProgressIndicator = ({ loading }) => {
  return (
    <>
      {loading && (
        <Box
          sx={{
            position: "fixed",
            top: "0px",
            width: "100vw",
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "white",
            zIndex: "9",
          }}
        >
          <CircularProgress size={50} />
        </Box>
      )}
    </>
  );
};

export default CircularProgressIndicator;
