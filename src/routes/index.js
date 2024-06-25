import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "../Pages/Home";
import Introduction from "../Pages/Introduction";
import Details from "../Pages/Details";

export const AppRouter = () => {


  return (
    <Router>
      <Routes>
        <Route path="" element={<HomePage />}>
          <Route path="/" element={<Introduction />} />
          <Route path="/details" element={<Details />} />
          {/* <Route path="/:area" element={<Platform />} />
          <Route
            path="/:area/Keys"
            element={
              <PrivateRoute>
                <Keys />
              </PrivateRoute>
            }
          />
          <Route
            path="/:area/usage"
            element={
              <PrivateRoute>
                <Usage />
              </PrivateRoute>
            }
          /> */}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
