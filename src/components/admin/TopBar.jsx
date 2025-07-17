// Topbar.js
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  setMenu,
  
} from "../../store/features/CommonSlice.js";
import { Link, useNavigate } from "react-router-dom";

import { toggleMobileSidebar } from "../../store/features/CommonSlice.js";

const Topbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const common = useSelector((state) => state.common);

  const [anchorEl, setAnchorEl] = React.useState(null);

const handleMenuToggle = () => {
  if (isMobile) {
    dispatch(toggleMobileSidebar());
  } else {
    dispatch(setMenu(!common.menu));
  }
};


  const handleAvatarMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: {
          xs: "100%",
          sm: `calc(100% - ${common.menu ? "280px" : "80px"})`,
        },
        ml: {
          xs: 0,
          sm: common.menu ? "280px" : "80px",
        },
        backgroundColor: "#fff",
        color: "#000",
        boxShadow: "none",
        borderBottom: "1px solid #ddd",
        zIndex: theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ px: { xs: 1, sm: 3 } }}>
        {/* Toggle Button */}
        <IconButton
          onClick={handleMenuToggle}
          size="large"
          edge="start"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Title */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            fontSize: { xs: "16px", sm: "18px", md: "20px" },
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          Wen Bear Technologies
        </Typography>

        {/* Notification Icon */}
        <IconButton sx={{ mr: 1 }} color="inherit">
          <NotificationsIcon />
        </IconButton>

        {/* Avatar Menu */}
        <Box>
          <Tooltip title="Account settings">
            <IconButton onClick={handleAvatarMenu} sx={{ p: 0 }}>
              <Avatar alt="Admin" sx={{ width: 32, height: 32 }} />
            </IconButton>
          </Tooltip>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
            onClick={handleMenuClose}
            PaperProps={{
              elevation: 3,
              sx: {
                overflow: "visible",
                mt: 1.5,
                "&:before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            }}
          >
            <Link to={"/admin/profile"}><MenuItem>Profile</MenuItem> </Link>
            <MenuItem>Setting</MenuItem>
            <MenuItem sx={{ color: "red" }} onClick={handleLogout}>
              Logout
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Topbar;
