import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import Devices from "./components/Dashboard/Devices";
import Credential from "./components/Dashboard/Credential";
import Createroom from "../src/components/Crudtable/Createroom";
import Room from "./components/Dashboard/Room";
import Portfolio from "./components/portfolio/Portfolio";
import Loginpage from "./components/Loginpage";
import { UserContext } from "./context/ContextProvider";
import RegisterPage from "./components/RegisterPage";
import FaceIdPage from "./components/FaceId";
import DetailsPage2 from "./components/DetailsPage2";

// import Register from "./components/Register";
const ProtectedRoute = () => {
  const userContext = useContext(UserContext);
  return userContext?.user !== null ? (
    <>
      <Outlet />
    </>
  ) : (
    <Navigate to="/auth" />
  );
};
const UnprotectedRoute = () => {
  const userContext = useContext(UserContext);
  return userContext?.user === null ? <Outlet /> : <Navigate to="/dashboard" />;
};

function App() {
  const [Dataroom, setDataroom] = useState(null);
  const [data, setData] = useState([]); // Add this line to define 'setDataroom'

  useEffect(() => {
    console.log(data);
  }, [data]); // This effect runs whenever `data` changes
  console.log(Dataroom);
  return (
    <div className="App">
      {/* <Faceregconite /> */}
      <Routes>
        <Route path="/" element={<Portfolio />} />

        <Route path="/auth" element={<UnprotectedRoute />}>
          <Route path="" element={<Loginpage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="faceid" element={<FaceIdPage />} />
        </Route>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route path="">
            <Route
              path=""
              element={
                <Dashboard
                  data={data}
                  setData={setData}
                  activeState={1}
                  setDataroom={setDataroom}
                  children={
                    <Room
                      data={data}
                      setData={setData}
                      setDataroom={setDataroom}
                    />
                  }
                />
              }
            />

            <Route
              path="createroom"
              activeState={0}
              element={<Dashboard activeState={1} children={<Createroom />} />}
            />
            <Route
              path=":id"
              activeState={0}
              element={
                <Dashboard
                  activeState={1}
                  children={
                    <DetailsPage2
                      Dataroom={Dataroom}
                      data={data}
                      setData={setData}
                    />
                  }
                />
              }
            />
          </Route>
          <Route
            path="devices"
            element={
              <>
                <Dashboard activeState={2} children={<Devices data={data} />} />
              </>
            }
          />
          <Route
            path="credential"
            element={
              <>
                <Dashboard
                  activeState={3}
                  children={<Credential data={data} />}
                />
              </>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
