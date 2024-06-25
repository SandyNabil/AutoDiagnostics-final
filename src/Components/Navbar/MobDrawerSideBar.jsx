import Drawer from "@mui/material/Drawer";
import ContentNav from "./ContentNav"; 
import React from "react";

const MobDrawerSideBar = (props) => {
  return (
    <Drawer
      variant="temporary"
      anchor="left"
      open={props.mobileOpen}
      onClose={props.openHandle}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        display: { xs: "block", md: "none" },
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: 240,
        },
      }}
    >
      {/* Ensure ContentNav or MenuNav is correctly integrated */}
      <ContentNav openHandle={props.openHandle} /> {/* Adjust as per your component */}
    </Drawer>
  );
};

export default MobDrawerSideBar;
