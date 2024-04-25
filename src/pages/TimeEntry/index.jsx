import React, { useState, useEffect } from "react";
import CreateTimeEntryForm from "./CreateTimeEntry";
import { getAllTimeEntries } from "./service";

function TimeEntry() {
  const [timeEntries, setTimeEntries] = useState([]);

  const fetchData = async () => {
    const timeEntries = await getAllTimeEntries();
    setTimeEntries(timeEntries);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <h2>Time Entries</h2>
      <CreateTimeEntryForm reload={fetchData} />
      <table>
        <thead>
          <tr>
            <th>User</th>
            <th>Duration</th>
            <th>Project</th>
            <th>Description</th>
            <th>StartAt</th>
          </tr>
        </thead>
        <tbody>
          {timeEntries.map((timeEntry) => (
            <tr key={timeEntry.id}>
              <td>{timeEntry.user.username}</td>
              <td>{`${timeEntry.durationInHours} hrs`}</td>
              <td>{timeEntry.project.name}</td>
              <td>{timeEntry.description}</td>
              <td>{new Date(timeEntry.startAt).toISOString().slice(0, 16)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TimeEntry;
