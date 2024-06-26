import React, { useContext, useEffect, useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Tooltip from "@mui/material/Tooltip";

import { Link } from "react-router-dom";
import "./Bar.scss";
import { UserContext } from "../../context/ContextProvider";
function Bar({ activeState }) {
  const userContext = useContext(UserContext);

  const handleSignOut = () => {
    userContext.setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="bg-body-tertiary col-lg-auto col-sm-1 d-flex flex-column justify-content-between min-vh-100 border border-right px-0 pe-md-1">
      <div className="container-fluid">
        <Link to="/">
          <Navbar.Brand className="d-flex justify-content-center mt-3">
            <Tooltip title="Logo" placement="right">
              <img alt="logo" src={require("../../logo1.png")} width="40" />
            </Tooltip>
          </Navbar.Brand>
        </Link>

        <hr />
        <ul
          className="nav nav-pills flex-column flex-column-shrink-0"
          id="v-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <li className="nav-item">
            <Tooltip title="Vị trí - thiết bị" placement="right">
              <Link
                to={"/dashboard"}
                className={`nav-link d-flex justify-content-center ${activeState === 1 ? "active" : null}`}
                aria-current="page"
                role="tab"
                aria-selected="true"
              >
                <i className="bi bi-house"></i>
              </Link>
            </Tooltip>
          </li>
          <li className="nav-item">
            <Tooltip title="Dự báo thời tiết - AQI" placement="right">
              <Link
                to={"/dashboard/devices"}
                className={`nav-link d-flex justify-content-center ${activeState === 2 ? "active" : null}`}
                aria-current="page"
                role="tab"
                aria-selected="false"
              >
                <i className="bi  bi-table"></i>
              </Link>
            </Tooltip>
          </li>
          <li className="nav-item">
            <Tooltip title="Thông tin người dùng" placement="right">
              <Link
                to={"/dashboard/credential"}
                className={`nav-link d-flex justify-content-center ${activeState === 3 ? "active" : null}`}
                aria-current="page"
                role="tab"
                aria-selected="false"
              >
                <i className="bi bi-database"></i>
              </Link>
            </Tooltip>
          </li>
        </ul>
      </div>
      <div className="dropdown-center open d-flex flex-shrink-0 mb-3 mx-auto" data-bs-theme="dark">
        <a
          className="member text-decoration-none dropdown-toggle"
          type="button"
          id="triggerId"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i className="bi bi-person-circle"></i>
        </a>
        <div className="dropdown-menu " aria-labelledby="triggerId">
          <a className="dropdown-item" href="#">
            New project...
          </a>
          <a className="dropdown-item " href="#">
            Settings
          </a>
          <a className="dropdown-item" href="#">
            Profile
          </a>
          <a className="dropdown-item border-top text-warning" href="#" onClick={handleSignOut}>
            Sign out
          </a>
        </div>
      </div>
    </div>
  );
}

export default Bar;
