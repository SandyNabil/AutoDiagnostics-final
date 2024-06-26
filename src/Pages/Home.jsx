import React, { useState } from "react";
import { Box, Stack, Paper, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import TopNav from "../Components/Navbar/TopNav";
import MobDrawerSideBar from "../Components/Navbar/MobDrawerSideBar";
import { Outlet } from "react-router-dom";

function Home() {
  const [mobileOpen, setMobileOpen] = useState(false); // Changed initial state to false

  const openHandle = () => {
    setMobileOpen(!mobileOpen);
  };

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

  return (
    <>
      <TopNav openHandle={openHandle} style={{ zIndex: 2 }} />
      <Stack direction="row" sx={{ flexGrow: 1, height: "100vh", pt: "9vh" }}>
        <MobDrawerSideBar mobileOpen={mobileOpen} openHandle={openHandle} /> {/* Passed mobileOpen and openHandle */}
        <Stack
          direction="row"
          spacing={2}
          sx={{ flexGrow: 1, maxHeight: "100%", overflowY: "hidden" }}
        >
<Box
  sx={{
    width: { md: "30%", lg: "20%", xl: "15%" },
    borderRadius: 2,
    bgcolor: "primary.bgColor",
    p: 3,
    maxHeight: "100%",
    overflowY: "auto",
    display: { xs: mobileOpen ? "block" : "none", md: "block" },
  }}
>
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
              <Link
                to={`/home/${sensor.path}`}
                style={{ textDecoration: "none" }}
                key={sensor.path}
              >
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
                  <Typography variant="body1">{sensor.name}</Typography>
                </Paper>
              </Link>
            ))}
            <Link to="/admin" style={{ textDecoration: "none" }}>
              {/* <Paper
                sx={{
                  mt: 2,
                  p: 2,
                  textAlign: "center",
                  bgcolor: "#5f7d8a",
                  color: "white",
                  "&:hover": {
                    bgcolor: "secondary.dark",
                  },
                }}
              >
                <Typography variant="body1">Admin</Typography>
              </Paper> */}
            </Link>
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
          </Box>
          <Box
            sx={{
              width: { md: "70%", lg: "80%", xl: "85%" },
              maxHeight: "100%",
              overflowY: "auto",
              pr: 2,
            }}
          >
            <Outlet />
          </Box>
        </Stack>
      </Stack>
    </>
  );
}

export default Home;
