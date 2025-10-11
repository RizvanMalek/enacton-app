import React from "react";
import ApplicationRoutes from "./routes/ApplicationRoutes";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  return (
    <>
      <ApplicationRoutes />
       <ToastContainer />
    </>
  );
};

export default App;
