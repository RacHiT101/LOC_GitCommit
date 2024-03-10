// ScheduleResultPage.js

import { Button } from "@mui/base";
import React from "react";


const ResultPage = ({
  daysLeft,
  hoursLeft,
  subjects,
  scheduling,
  setScheduling,
}) => {
  // Render the input values here
  return (
    <div className="">
      <h1 className="text-white text-3xl flex text-center">
        SCHEDULING SYSTEM
      </h1>
      <div className="text-white flex items-center gap-5 bg-[#1e143d]">
        <h4 className="text-xl font-semibold ">Total Hours</h4>
        <h1 className="text-xl">{hoursLeft}</h1>
      </div>
      <div className="text-white flex">
        <p>Days Left: {daysLeft}</p>
        <p>Hours Left: {hoursLeft}</p>
      </div>
      <p>Subjects:</p>
      <Button onClick={() => setScheduling(false)}>Add Schedule</Button>
      <ul>
        {/* {subjects.map((subject, index) => (
          <li key={index}>
            Subject {index + 1}: {subject.name} - {subject.numTopics} topics
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default ResultPage;
