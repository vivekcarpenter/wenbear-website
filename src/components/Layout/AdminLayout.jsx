import React from "react";
import { Box, Grid } from "@mui/material";
import Sidebar from "../admin/SideBar";
import Topbar from "../admin/TopBar";
import { Outlet } from "react-router-dom";

const drawerWidth = 280; // Keep this consistent with Sidebar and Topbar

const Adminlayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
  <Topbar />
  <Sidebar />
  <Box component="main" sx={{ flexGrow: 1, mt: "64px", p: 2 }}>
    <Outlet /> {/* or <Routes> */}
  </Box>
</Box>
  );
};

export default Adminlayout;
