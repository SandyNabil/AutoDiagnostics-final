import React, { useEffect, useState } from "react";
import { Stack, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useLocation } from "react-router-dom";
import MenuNav from "./MenuNav"; // Import the MenuNav component

const TopNav = (props) => {
  let location = useLocation();
  const [route, setRoute] = useState("");

  useEffect(() => {
    const newRoute = location.pathname
      .slice(1)
      .split("/")[1]
      ?.replaceAll("-", "");

    if (newRoute) {
      setRoute(`sideNav_${newRoute}`);
    } else {
      setRoute("");
    }
  }, [location.pathname]);

  return (
    <Stack
      alignItems="center"
      direction="row"
      justifyContent="space-between"
      sx={{
        bgcolor: "primary.bgColor",
        borderRadius: 2,
        px: 2,
        width: "100%",
        maxWidth: "100vw",
        height: "9vh",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1201,
      }}
    >
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={props.openHandle}
        sx={{ mr: 2, display: { md: "none" } }}
      >
        <MenuIcon />
      </IconButton>
      <img
        src="/last logo.png"
        alt="Logo"
        style={{
          height: "50px",
          margin: "10px",
        }}
      />
      <div style={{ flexGrow: 1 }}></div>
      <MenuNav username={props.username} name={props.name} />{" "}
      {/* Include the MenuNav component */}
    </Stack>
  );
};

export default TopNav;
