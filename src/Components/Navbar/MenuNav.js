import {
  IconButton,
  Menu,
  Avatar,
  MenuList,
  Stack,
  ListItemIcon,
  Typography,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useLocation } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MenuNav(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Add a new function to handle logout
  const handleLogout = () => {
    // Check if the current location is the signup or login page
    if (location.pathname !== "/" && location.pathname !== "/login") {
      // Display a confirmation dialog
      if (window.confirm("Are you sure you want to logout?")) {
        localStorage.removeItem("authToken"); // Remove the auth token from local storage
        navigate("/login"); // Redirect to the login page
      }
    }
  };

  return (
    <Stack direction="row" spacing={2} alignItems="center">
      <Typography variant="body1" color="textPrimary">
        {props.username}
      </Typography>
      <IconButton onClick={handleClick}>
        <Avatar sx={iconStyle}>{props.name}</Avatar>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuList>
          <MenuItem onClick={handleLogout}>
            <Typography sx={{ pr: 1 }} variant="inherit">
              Logout
            </Typography>
            <ListItemIcon>
              <LogoutIcon fontSize="small" sx={{ ml: "auto" }} />
            </ListItemIcon>
          </MenuItem>
        </MenuList>
      </Menu>
    </Stack>
  );
}

const iconStyle = {
  color: { xs: "secondary.main", md: "#000" },
  width: 35,
  height: 35,
  textTransform: "uppercase",
};
