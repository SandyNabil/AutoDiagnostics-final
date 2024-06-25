import React from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import theme from "./utils/theme";
import { Box } from "@mui/system";
import Home from "./Pages/Home";
import IntakeManifoldPressure from "./Pages/IntakeManifoldPressure";
import EnginePower from "./Pages/EnginePower";
import IntakeAirTemp from "./Pages/IntakeAirTemp";
import Introduction from "./Pages/Introduction";
import SignUp from "./Pages/SignUp"; // Import the SignUp component
import Login from "./Pages/Login"; // Import the Login component
import TopNav from "./Components/Navbar/TopNav"; // Import the TopNav component
import EngineLoad from "./Pages/EngineLoad";
import EngineRPM from "./Pages/EngineRPM";
import TimingAdvance from "./Pages/TimingAdvance";
import ThrottlePosition from "./Pages/ThrottlePosition";
import EngineCoolTemp from "./Pages/EngineCoolTemp";
import MyMap from "./Pages/MyMap";

const customTheme = createTheme(theme);

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/" replace />;
};

export default function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          bgcolor: "colors.bgColor",
          color: "colors.text",
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<SignUp />} />{" "}
            {/* Default route to SignUp */}
            <Route path="/login" element={<Login />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <>
                    <TopNav />
                    <Home />
                  </>
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/introduction" replace />} />
              <Route path="introduction" element={<Introduction />} />
              <Route
                path="intake-mainfold-pressure"
                element={<IntakeManifoldPressure />}
              />
              <Route path="engine-power" element={<EnginePower />} />
              <Route path="intake-air-temp" element={<IntakeAirTemp />} />
              <Route path="engine-load" element={<EngineLoad />} />
              <Route path="engine-rpm" element={<EngineRPM />} />
              <Route path="timing-advance" element={<TimingAdvance />} />
              <Route path="throttle-position" element={<ThrottlePosition />} />
              <Route path="engine-coolant-temp" element={<EngineCoolTemp />} />
              <Route path="maps" element={<MyMap />} />
              {/* Add other sensor routes similarly */}
            </Route>
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}
