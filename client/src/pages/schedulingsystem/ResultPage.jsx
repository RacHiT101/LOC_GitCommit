// ScheduleResultPage.js

import { Button } from "@mui/base";
import React, { useState } from "react";
import BarGraph from "./components/BarGraph";
import PieGraph from "./components/PieGraph";

const ResultPage = ({
  daysLeft,
  hoursLeft,
  subjectDetails,
  scheduling,
  setScheduling,
}) => {
  console.log(subjectDetails);
  const NameArray = subjectDetails.map((obj) => obj.name);
  const NumTopics = subjectDetails.map((obj) => obj.numTopics);
  console.log(NameArray);
  console.log(NumTopics);
  const totalHours = daysLeft * hoursLeft;
  const hoursPerTopic = subjectDetails.map((subject) => {
    // Calculate the total number of topics for the subject
    const totalTopics = subject.numTopics;
    // Calculate the hours per topic
    return totalHours / totalTopics;
  });

  // State to keep track of progress for each subject
  const [progress, setProgress] = useState(subjectDetails.map(() => 0));

  // Function to handle checkbox change
  const handleCheckboxChange = (subjectIndex, topicIndex, isChecked) => {
    const newProgress = [...progress];
    if (isChecked) {
      newProgress[subjectIndex] += 1;
    } else {
      newProgress[subjectIndex] -= 1;
    }
    setProgress(newProgress);
  };

  // Render the input values here
  return (
    <div className="w-full">
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
      <div className="grid grid-cols-3 gap-5 ">
        <div className=" col-span-2 bg-[#1e143d] mx-5 rounded-lg">
          <BarGraph
            taskExpenses={NumTopics}
            categories={NameArray}
            progress={progress}
          />
        </div>
        <div className=" mx-auto bg-[#1e143d] rounded-lg  ">
          <PieGraph taskExpenses={NumTopics} categories={NameArray} />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5 mx-10 mt-10">
        {subjectDetails.map((subject, subjectIndex) => (
          <div
            key={subjectIndex}
            className="bg-[#1e143d] rounded-lg text-white"
          >
            <h1 className="text-2xl text-center">{subject.name}</h1>
            <div className="grid grid-cols-1 gap-2 mx-5 py-5">
              {Array.from({ length: subject.numTopics }, (_, topicIndex) => {
                const topicId = `topic_${subjectIndex}_${topicIndex}`;
                const hours = hoursPerTopic[subjectIndex];
                return (
                  <div key={topicIndex} className="flex items-center">
                    <input
                      type="checkbox"
                      id={topicId}
                      onChange={(e) =>
                        handleCheckboxChange(
                          subjectIndex,
                          topicIndex,
                          e.target.checked
                        )
                      }
                    />
                    <label htmlFor={topicId} className="ml-2">
                      Chapter {topicIndex + 1} - {hours} hrs
                    </label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-1"></div>

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
