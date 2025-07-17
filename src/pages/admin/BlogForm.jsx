import React, { useState } from "react";
import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box,
  Typography,
} from "@mui/material";
import TitleIcon from "@mui/icons-material/Title";
import DescriptionIcon from "@mui/icons-material/Description";
import DeleteIcon from "@mui/icons-material/Delete";
import ImageIcon from "@mui/icons-material/Image";

/*************  ✨ Windsurf Command ⭐  *************/
/**
 * BlogForm - A form for creating and editing blog posts.
 * 
/*******  1c97ad70-2094-4970-9c6a-1c9c150f0398  *******/
const BlogForm = ({
  initialData = {
    title: "",
    content: "",
    images: [], 
    category: "",
  },
  onSubmit,
}) => {
  // Unified image list: type = 'existing' or 'new'
  const [images, setImages] = useState(
    (initialData.images || []).map((img) => ({
      type: "existing",
      value: img,
    }))
  );

  const [form, setForm] = useState({
    title: initialData.title,
    content: initialData.content,
    category: initialData.category,
    authorId: initialData.authorId,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    const newImages = files.map((file) => ({
      type: "new",
      value: file,
    }));

    setImages((prev) => [...prev, ...newImages]);
  };

  const handleImageDelete = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userId =   localStorage.getItem("userId");
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("content", form.content);
    formData.append("category", form.category || "");
    formData.append("authorId", userId || "");

    images.forEach((imgObj) => {
      if (imgObj.type === "new") {
        formData.append("images", imgObj.value); // field for new images
      } else if (imgObj.type === "existing") {
        formData.append("existingImages", imgObj.value); // field for old images (URL)
      }
    });

    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 max-w-lg mx-auto">
      <TextField
        label="Title"
        name="title"
        value={form.title}
        onChange={handleChange}
        required
        fullWidth
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Content"
        name="content"
        value={form.content}
        onChange={handleChange}
        required
        fullWidth
        multiline
        rows={4}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
      />

      {/* Image Upload */}
      <Box>
        <Button variant="outlined" component="label" startIcon={<ImageIcon />}>
          Select Images
          <input
            type="file"
            accept="image/*"
            hidden
            multiple
            onChange={handleImageSelect}
          />
        </Button>
      </Box>

      {/* Image Previews */}
      {images.length > 0 && (
        <Box>
          <Typography fontWeight={500}>Selected Images:</Typography>
          {images.map((img, idx) => (
            <Box key={idx} display="flex" alignItems="center" gap={1} mt={1}>
              <img
                src={
                  img.type === "existing"
                    ? img.value
                    : URL.createObjectURL(img.value)
                }
                alt="preview"
                width={60}
                height={60}
                style={{ objectFit: "cover", borderRadius: 4 }}
              />
              <IconButton onClick={() => handleImageDelete(idx)} color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          ))}
        </Box>
      )}

      <TextField
        label="Category"
        name="category"
        value={form.category}
        onChange={handleChange}
        fullWidth
      />

     
      <Button
        type="submit"
        variant="contained"
        size="large"
        fullWidth
        sx={{
          backgroundColor: "#456882",
          "&:hover": { backgroundColor: "#5fa2d5" },
        }}
      >
        Save
      </Button>
    </form>
  );
};

export default BlogForm;
