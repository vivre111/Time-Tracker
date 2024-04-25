import { useState } from "react";
import "./projectTable.css";

export const ProjectTable = ({ projectData }) => {
  return (
    <table
      style={{
        borderCollapse: "collapse",
        border: "2px solid black",
        width: "70%",
      }}
    >
      <thead>
        <tr>
          <>
            <th></th> {/* Placeholder for expand/collapse button */}
            <th>Project Name</th>
            <th>Total Duration (hrs)</th>
            <th>Description</th>
            <th>Created At</th>
          </>
        </tr>
      </thead>
      <tbody>
        {projectData.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </tbody>
    </table>
  );
};

const ProjectRow = ({ project }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <tr className="project-row">
        <td
          onClick={() => setIsOpen(!isOpen)}
          style={{ cursor: "pointer", textAlign: "center" }}
        >
          {isOpen ? "-" : "+"}
        </td>
        <td>{project.name}</td>
        <td>{project.totalDurationHours}</td>
        <td>{project.description}</td>
        <td>{new Date(project.createdAt).toLocaleDateString()}</td>
      </tr>
      {isOpen && (
        <tr>
          <td colSpan={5}>
            <table style={{ width: "100%", border: "1px solid black" }}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Description</th>
                  <th>Start At</th>
                  <th>Duration (Hours)</th>
                </tr>
              </thead>
              <tbody>
                {project.timeEntries.map((entry) => (
                  <tr key={entry.id} className="project-row">
                    <td>{entry.id}</td>
                    <td>{entry.description}</td>
                    <td>{new Date(entry.startAt).toLocaleString()}</td>
                    <td>{entry.durationInHours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </td>
        </tr>
      )}
    </>
  );
};
