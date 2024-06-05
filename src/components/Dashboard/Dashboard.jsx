import React, { useState } from "react";
import Bar from "./Bar";
import Information from "./Information";
import Devices from "./Devices"; // Import the 'Devices' component
import Credential from "./Credential"; // Import the 'Credential' component
function Dashboard({ activeState, children, data, setData }) {
  // get the data and setData from the parent components by props

  return (
    <div className="Dashboard container-fluid">
      <div className="row gy-auto">
        <Bar activeState={activeState} />
        <Information data={data} setData={setData} />
        <div className="right-side col p-0">
          {" "}
          {/* This div will take the full width */}
          {children}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
