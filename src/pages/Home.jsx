import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosApi from "../utils/axiosApi";
import { getAllUsers } from "./TimeEntry/service";
import User from "./User";

function Home() {
  useEffect(() => {
    // TODO: calling getAllUsers() here is just to call a protected API, so the user can be redirected to the login page if not authorized.
    // current user's credential should be stored in useContext instead
    getAllUsers();
  }, []);
  return (
    <div>
      <h1>Welcome to the Project and Task Manager</h1>
      <User/>
      <h2 style={{paddingTop:'30px'}}>
        You can View and Create Projects and Time Entries using the link below
      </h2>
      <div>
        <Link to="/projects" style={{ marginRight: "10px" }}>
          View/Create Projects
        </Link>
        <Link to="/time-entries">View/Create Time Entries</Link>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
}

export default Home;
