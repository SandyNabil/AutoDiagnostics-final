import React from "react";
import { Box, List, ListItem, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const ContentNav = (props) => {
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

  return (
    <Box
      sx={{
        width: 240,
        mt: "9vh", // Adjust this value as needed for your top margin
        overflowY: "auto",
      }}
    >
      <List>
        <Link to="/home/introduction" style={{ textDecoration: "none" }}>
          <Paper
            sx={{
              mb: 2,
              p: 2,
              textAlign: "center",
              bgcolor: "#5f7d8a",
              color: "white",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            <Typography variant="body1">Overview</Typography>
          </Paper>
        </Link>

        {sensors.map((sensor) => (
          <ListItem key={sensor.path} disablePadding>
            <Link
              to={`/home/${sensor.path}`}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Paper sx={paperStyle}>
                <Typography variant="body1">{sensor.name}</Typography>
              </Paper>
            </Link>
          </ListItem>
        ))}
        <Link to="/home/maps" style={{ textDecoration: "none" }}>
          <Paper
            sx={{
              mb: 2,
              p: 2,
              textAlign: "center",
              bgcolor: "#5f7d8a",
              color: "white",
              "&:hover": {
                bgcolor: "secondary.dark",
              },
            }}
          >
            <Typography variant="body1">Road Side Assistance</Typography>
          </Paper>
        </Link>
      </List>
    </Box>
  );
};

export default ContentNav;
