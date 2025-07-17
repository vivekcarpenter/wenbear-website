import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MarkEmailReadIcon from "@mui/icons-material/MarkEmailRead";
import ReplyIcon from "@mui/icons-material/Reply";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import {
  useGetAllEnquiriesQuery,
  useMarkEnquiryAsReadMutation,
  useReplyToEnquiryMutation,
} from "../../store/services/enquiryApi";
import { toast } from "react-toastify";

const AllEnquiriesPage = () => {
  const { data, isLoading } = useGetAllEnquiriesQuery();
  const [markAsRead] = useMarkEnquiryAsReadMutation();
  const [replyToEnquiry] = useReplyToEnquiryMutation();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [replyDialog, setReplyDialog] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [replyMessage, setReplyMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleReply = (enquiry) => {
    setReplyTo(enquiry);
    setReplyMessage("");
    setReplyDialog(true);
  };

  const handleSendReply = async () => {
    if (replyTo && replyMessage.trim()) {
      try {
        setIsSending(true);
        await replyToEnquiry({ id: replyTo._id, message: replyMessage });
        if (!replyTo.read) await markAsRead(replyTo._id);

        toast.success("Reply sent successfully!");
        setReplyDialog(false);
      } catch (error) {
        toast.error("Failed to send reply.");
        console.error("Reply error:", error);
      } finally {
        setIsSending(false);
      }
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await markAsRead(id);
      toast.success("Marked as read");
    } catch (error) {
      toast.error("Failed to mark as read");
    }
  };

  const handleExportExcel = async () => {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Enquiries");

    worksheet.columns = [
      { header: "ID", key: "id", width: 10 },
      { header: "Name", key: "name", width: 30 },
      { header: "Email", key: "email", width: 30 },
      { header: "Message", key: "message", width: 50 },
      { header: "Status", key: "status", width: 15 },
    ];

    (data?.data || []).forEach((enquiry, i) => {
      worksheet.addRow({
        id: i + 1,
        name: enquiry.name,
        email: enquiry.email,
        message: enquiry.message,
        status: enquiry.read ? "Read" : "Unread",
      });
    });

    const buffer = await workbook.xlsx.writeBuffer();
    const blob = new Blob([buffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, "Enquiries.xlsx");

    toast.success("Excel file downloaded");
  };

  const filteredEnquiries = (data?.data || []).filter((enquiry) => {
    const matchesSearch =
      enquiry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enquiry.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === "all" ||
      (filterStatus === "read" && enquiry.read) ||
      (filterStatus === "unread" && !enquiry.read);

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <Box p={4} textAlign="center">
        <Typography>Loading enquiries...</Typography>
      </Box>
    );
  }

  return (
    <Box p={2}>
      <Typography variant="h5" mb={2} fontWeight={600}>
        All Enquiries
      </Typography>

      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems={{ xs: "stretch", sm: "center" }}
        justifyContent="space-between"
        mb={2}
      >
        <TextField
          fullWidth={isMobile}
          placeholder="Search by name or email"
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{ startAdornment: <SearchIcon sx={{ mr: 1 }} /> }}
        />
        <TextField
          select
          label="Filter"
          size="small"
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
        >
          <MenuItem value="all">All</MenuItem>
          <MenuItem value="read">Read</MenuItem>
          <MenuItem value="unread">Unread</MenuItem>
        </TextField>
        <Button
          variant="outlined"
          startIcon={<FileDownloadIcon />}
          onClick={handleExportExcel}
        >
          Export Excel
        </Button>
      </Stack>

      <TableContainer component={Paper}>
        <Table size="small">
          <TableHead sx={{ background: "#f9f9f9" }}>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Name</TableCell>
              {!isMobile && <TableCell>Email</TableCell>}
              <TableCell>Message</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredEnquiries.map((enquiry, index) => (
              <TableRow
                key={enquiry._id}
                sx={{
                  backgroundColor: enquiry.read ? "#f9f9f9" : "inherit",
                }}
              >
                <TableCell>{index + 1}</TableCell>
                <TableCell>{enquiry.name}</TableCell>
                {!isMobile && <TableCell>{enquiry.email}</TableCell>}
                <TableCell sx={{ maxWidth: 200 }}>
                  {enquiry.message.length > 60
                    ? enquiry.message.slice(0, 60) + "..."
                    : enquiry.message}
                </TableCell>
                <TableCell>
                  {enquiry.read ? (
                    <Chip label="Read" color="success" size="small" />
                  ) : (
                    <Chip label="Unread" color="warning" size="small" />
                  )}
                </TableCell>
                <TableCell align="center">
                  {!enquiry.read && (
                    <IconButton
                      onClick={() => handleMarkRead(enquiry._id)}
                      color="success"
                    >
                      <MarkEmailReadIcon />
                    </IconButton>
                  )}
                  <IconButton
                    onClick={() => handleReply(enquiry)}
                    color="primary"
                  >
                    <ReplyIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
            {filteredEnquiries.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No enquiries found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Reply Dialog */}
      <Dialog
        open={replyDialog}
        onClose={() => setReplyDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>Reply to {replyTo?.name}</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 1 }}>
            Email: {replyTo?.email}
          </DialogContentText>
          <TextField
            label="Your Reply"
            fullWidth
            multiline
            rows={4}
            value={replyMessage}
            onChange={(e) => setReplyMessage(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReplyDialog(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={isSending || !replyMessage.trim()}
            sx={{
              backgroundColor: "#456882",
              ":hover": { backgroundColor: "#5fa2d5" },
            }}
            onClick={handleSendReply}
          >
            {isSending ? "Sending..." : "Send"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AllEnquiriesPage;
