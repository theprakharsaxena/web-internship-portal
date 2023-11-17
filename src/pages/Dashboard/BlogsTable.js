// src/components/Table.js
import React, { useState } from "react";
import {
  Button,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";
import Editor from "../../components/Editor";
import { toast } from "react-hot-toast";
import createBlog from "../../services/blog/createBlog";
import CircularProgressIndicator from "../../common/Loadable/CircularProgressIndicator";
import uploadImage from "../../services/cloud/UploadImage";
import updateBlog from "../../services/blog/updateBlog";
import deleteBlog from "../../services/blog/deleteBlog";
import { useQueryClient } from "@tanstack/react-query";

const BlogsTable = () => {
  const allBlogs = useSelector((state) => state.blog.value);
  const user = useSelector((state) => state.user.value);
  const [editId, setEditId] = useState(null);
  const [newData, setNewData] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [tempData, setTempData] = useState({
    title: "",
    image: "",
    description: "",
  });
  const [loading, setLoading] = useState(false);

  const queryClient = useQueryClient();

  const handleEditClick = (item) => {
    setEditId(item._id);
    setNewData({
      title: item.title,
      image: item.image,
      description: item.description,
    });
    handleOpenDialogEdit();
  };

  const handleDeleteClick = async (id) => {
    try {
      const data = deleteBlog({ id });
      if (data?.success) {
        toast.success(data?.message);
        queryClient.invalidateQueries(["all-blogs"]);
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setTempData({ title: "", image: "", description: "" });
    setOpenDialog(false);
  };

  const [openDialogEdit, setOpenDialogEdit] = useState(false);

  const handleOpenDialogEdit = () => {
    setOpenDialogEdit(true);
  };

  const handleCloseDialogEdit = () => {
    setNewData({ title: "", image: "", description: "" });
    setOpenDialogEdit(false);
  };

  const handleImageUpload = async (e, type) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "utmou7yo");
    try {
      const data = await uploadImage({
        cloudName: "dhpm2tifg",
        tempFormData: formData,
      });
      if (data?.asset_id) {
        console.log("Data", data);
        setLoading(false);
        if (type === "ADD") {
          setTempData({ ...tempData, image: data?.secure_url });
        }
        if (type === "EDIT") {
          setNewData({ ...newData, image: data?.secure_url });
        }
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      const data = await createBlog({
        title: tempData.title,
        description: tempData.description,
        image: tempData.image,
        user: user?._id,
      });
      if (data?.success) {
        queryClient.invalidateQueries(["all-blogs"]);
        setLoading(false);
        toast.success("Blog Created Successfully");
        handleCloseDialog();
        setTempData({ title: "", image: "", description: "" });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleCloseDialog();
      setTempData({ title: "", image: "", description: "" });
    }
  };

  console.log("USER", user?._id);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const data = await updateBlog({
        title: newData.title,
        description: newData.description,
        image: newData.image,
        user: editId,
      });
      if (data?.success) {
        queryClient.invalidateQueries(["all-blogs"]);
        setLoading(false);
        toast.success("Blog Update Successfully");
        handleCloseDialogEdit();
        setNewData({ title: "", image: "", description: "" });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      handleCloseDialogEdit();
      setNewData({ title: "", image: "", description: "" });
    }
  };

  return (
    <div>
      <CircularProgressIndicator loading={loading} />
      <h2>Create New Data</h2>
      <Button variant="outlined" onClick={handleOpenDialog}>
        Create New Data
      </Button>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="xl">
        <DialogTitle>Create New Data</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={tempData.title}
            onChange={(e) =>
              setTempData({ ...tempData, title: e.target.value })
            }
            margin="normal"
          />
          <input
            accept="image/*"
            type="file"
            onChange={(e) => handleImageUpload(e, "ADD")}
          />
          {tempData.image !== "" && (
            <div>
              <h2>Image Preview:</h2>
              <img src={tempData.image} alt="Preview" height={100} />
            </div>
          )}
          <Editor
            value={tempData.description}
            onChange={(value) =>
              setTempData({ ...tempData, description: value })
            }
          />
        </DialogContent>
        <div style={{ padding: "16px" }}>
          <Button
            onClick={(e) => {
              setLoading(true);
              handleCreate(e);
            }}
          >
            Create
          </Button>
          <Button onClick={handleCloseDialog}>Cancel</Button>
        </div>
      </Dialog>
      <Dialog
        open={openDialogEdit}
        onClose={handleCloseDialogEdit}
        maxWidth="xl"
      >
        <DialogTitle>Edit Blog Data</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            fullWidth
            value={newData.title}
            onChange={(e) => setNewData({ ...newData, title: e.target.value })}
            margin="normal"
          />
          <input
            accept="image/*"
            type="file"
            onChange={(e) => handleImageUpload(e, "EDIT")}
          />
          {newData.image !== "" && (
            <div>
              <h2>Image Preview:</h2>
              <img src={newData.image} alt="Preview" height={100} />
            </div>
          )}
          <Editor
            value={newData.description}
            onChange={(value) => setNewData({ ...newData, description: value })}
          />
        </DialogContent>
        <div style={{ padding: "16px" }}>
          <Button
            onClick={(e) => {
              setLoading(true);
              handleUpdate(e);
            }}
          >
            UPDATE
          </Button>
          <Button onClick={handleCloseDialogEdit}>Cancel</Button>
        </div>
      </Dialog>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allBlogs?.blogs.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>
                  <img src={item.image} alt={item.name} height={100} />
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      handleEditClick(item);
                    }}
                  >
                    Edit
                  </Button>
                  <Button onClick={() => handleDeleteClick(item._id)}>
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogsTable;
