import React, { useState } from "react";
import Bar from "./Bar";
import Information from "./Information";
import Devices from "./Devices"; // Import the 'Devices' component

function Dashboard({ activeState, children, data, setData }) {
  return (
    <div className="container-fluid">
      <div className="row gy-auto">
        <Bar activeState={activeState} />
        <Information data={data} setData={setData} />
        
        {children}
      </div>
    </div>
  );
}

export default Dashboard;
