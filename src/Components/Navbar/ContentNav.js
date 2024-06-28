import React from "react";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const ContentNav = ({ openHandle }) => {
  const navigate = useNavigate();
  const sensors = [
    { name: "Intake Manifold Pressure", path: "intake-manifold-pressure" },
    { name: "Engine Power", path: "engine-power" },
    { name: "Intake Air Temperature", path: "intake-air-temp" },
    { name: "Engine Load", path: "engine-load" },
    { name: "Engine RPM", path: "engine-rpm" },
    { name: "Timing Advance", path: "timing-advance" },
    { name: "Throttle Position", path: "throttle-position" },
    { name: "Engine Coolant Temperature", path: "engine-coolant-temp" },
  ];

  const paperStyle = {
    mb: 2,
    p: 2,
    textAlign: "center",
    bgcolor: "#5f7d8a",
    color: "white",
    "&:hover": {
      bgcolor: "secondary.dark",
    },
  };

  const handleNavigation = (path) => {
    navigate(`/home/${path}`);
    openHandle();
  };

  return (
    <Box
      sx={{
        width: 240,
        mt: "9vh", // Adjust this value as needed for your top margin
        overflowY: "auto",
      }}
    >
      <List>
        <ListItem disablePadding>
          <Paper
            sx={paperStyle}
            onClick={() => handleNavigation("introduction")}
            style={{ width: "100%" }}
          >
            <Typography variant="body1">Overview</Typography>
          </Paper>
        </ListItem>
        {sensors.map((sensor) => (
          <ListItem key={sensor.path} disablePadding>
            <Paper
              sx={paperStyle}
              onClick={() => handleNavigation(sensor.path)}
              style={{ width: "100%" }}
            >
              <Typography variant="body1">{sensor.name}</Typography>
            </Paper>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <Paper
            sx={paperStyle}
            onClick={() => handleNavigation("maps")}
            style={{ width: "100%" }}
          >
            <Typography variant="body1">Road Side Assistance</Typography>
          </Paper>
        </ListItem>
      </List>
    </Box>
  );
};

export default ContentNav;
