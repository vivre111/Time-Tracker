import React, { useEffect, useState } from "react";
import { getUserProjectData } from "./service";
import { ProjectTable } from "./ProjectTable";
import TimeEntryForm, {
  calculateTotalHour,
} from "../TimeEntry/CreateTimeEntry";

function User() {
  const [projectData, setProjectData] = useState([]);
  const fetchData = async () => {
    const userProjectData = await getUserProjectData();
    setProjectData(userProjectData);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const currentWeekProjectData = projectData
    .map((project) => {
      // TODO: unit test it
      // Get the date of the current Monday (00:00am)
      const mondayThisWeek = new Date();
      mondayThisWeek.setHours(0, 0, 0, 0);
      mondayThisWeek.setDate(
        mondayThisWeek.getDate() - ((mondayThisWeek.getDay() + 6) % 7)
      );

      // Get the date of the next Monday (00:00am)
      const mondayNextWeek = new Date(mondayThisWeek);
      mondayNextWeek.setDate(mondayNextWeek.getDate() + 7);
      const timeEntries = project.timeEntries;
      return {
        ...project,
        timeEntries: timeEntries.filter(
          (timeEntryEle) =>
            new Date(timeEntryEle.startAt) > mondayThisWeek &&
            new Date(timeEntryEle.startAt) < mondayNextWeek
        ),
      };
    })
    .filter((project) => project.timeEntries.length !== 0);
  // we have 2 data-arrays to display: historicalProjectData and currentWeekProjectData
  const historicalProjectData = projectData;

  // calculate total hour for each data
  const historicalTotal = calculateTotalHour(historicalProjectData);
  const thisWeekTotal = calculateTotalHour(currentWeekProjectData);

  // sort each data on project that take longest appears first
  historicalProjectData.sort(
    (a, b) => b.totalDurationHours - a.totalDurationHours
  );
  currentWeekProjectData.sort(
    (a, b) => b.totalDurationHours - a.totalDurationHours
  );

  return (
    <div>
      <TimeEntryForm reload={fetchData}></TimeEntryForm>
      <h2>Your Projects this week: {`${thisWeekTotal}hrs`}</h2>
      <ProjectTable projectData={currentWeekProjectData}></ProjectTable>
      <h2 style={{ paddingTop: "20px" }}>
        Your historical Projects: {`${historicalTotal}hrs`}
      </h2>
      <ProjectTable projectData={historicalProjectData}></ProjectTable>
    </div>
  );
}
export default User;
