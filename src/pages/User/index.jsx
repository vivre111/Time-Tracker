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
  console.log(projectData);

  const currentWeekProjectData = projectData
    .map((project) => {
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

  const historicalProjectData = projectData;
  calculateTotalHour(historicalProjectData);
  calculateTotalHour(currentWeekProjectData);

  console.log(currentWeekProjectData, historicalProjectData);

  return (
    <div>
      <TimeEntryForm reload={fetchData}></TimeEntryForm>
      <h2>Your Projects this week</h2>
      <ProjectTable projectData={currentWeekProjectData}></ProjectTable>
      <h2>Your historical Projects</h2>
      <ProjectTable projectData={historicalProjectData}></ProjectTable>
    </div>
  );
}
export default User;
