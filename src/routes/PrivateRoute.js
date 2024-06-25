import Rejecter from "../Pages/Rejecter";

const PrivateRoute = ({ children }) => {



 return true ? children : <Rejecter />;
};

export default PrivateRoute;