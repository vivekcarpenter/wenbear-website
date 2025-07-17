import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import { FaRegNewspaper } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { closeMobileSidebar } from "../../store/features/CommonSlice";

const menuItems = [
  // { text: "Admin Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "All Blogs", icon: <FaRegNewspaper />, path: "/admin/blogs" },
  { text: "All Enquiries", icon: <GroupIcon />, path: "/admin/enquiries" },
];

const drawerWidth = 280;
const collapsedWidth = 80;

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const common = useSelector((state) => state.common);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const drawerContent = (
    <>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: "#555879" }}>
          {common.menu && !isMobile && "Wen Bear"}
        </Typography>
      </Toolbar>
      <Box sx={{ overflow: "auto" }}>
        <List>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItem
                button
                key={item.text}
                onClick={() => {
                  navigate(item.path);
                  if (isMobile) dispatch(closeMobileSidebar());
                }}
                sx={{
                  py: 1.5,
                  px: 3,
                  borderBottom: "1px solid #f0f0f0",
                  backgroundColor: isActive ? "#555879" : "#fff",
                  color: isActive ? "#fff" : "#333",
                  "&:hover": {
                    backgroundColor: isActive ? "#533051" : "#f5f5f5",
                  },
                }}
              >
                <ListItemIcon sx={{ color: isActive ? "#fff" : "#5b3d91", minWidth: 36 }}>
                  {item.icon}
                </ListItemIcon>
                {common.menu && !isMobile && (
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      fontSize: 14,
                      fontWeight: isActive ? 600 : 500,
                    }}
                  />
                )}
              </ListItem>
            );
          })}
        </List>
      </Box>
    </>
  );

  return isMobile ? (
    <Drawer
      anchor="left"
      open={common.mobileSidebar}
      onClose={() => dispatch(closeMobileSidebar())}
      ModalProps={{ keepMounted: true }}
      sx={{ "& .MuiDrawer-paper": { width: drawerWidth } }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      sx={{
        width: common.menu ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: common.menu ? drawerWidth : collapsedWidth,
          transition: "width 0.3s ease",
          boxSizing: "border-box",
          backgroundColor: "#fff",
          borderRight: "1px solid #e0e0e0",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
