import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
} from "@mui/material";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";
import CloseIcon from "@mui/icons-material/Close";

const DeleteModal = ({ open, onClose, onDelete, blogTitle }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="xs"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2, p: 1 },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <WarningAmberIcon color="error" />
        Delete Blog
        <IconButton
          onClick={onClose}
          sx={{ ml: "auto" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="body1">
          Are you sure you want to delete{" "}
          <strong>{blogTitle}</strong>?
        </Typography>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, display:"flex", justifyContent:"space-between" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
        >
          Cancel
        </Button>
        <Button
          onClick={onDelete}
          variant="contained"
          color="error"
        >
          Yes, Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
