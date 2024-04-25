import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import axiosApi from "../utils/axiosApi";
import { getAllUsers } from "./TimeEntry/service";
import User from "./User";

function Home() {
  // todo: if not logged in, go to login page.
  useEffect(() => {
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
          View Projects
        </Link>
        <Link to="/time-entries">View Time Entries</Link>
      </div>
      <div style={{ marginTop: "30px" }}>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
}

export default Home;
