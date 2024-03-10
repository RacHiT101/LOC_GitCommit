import React, { useState } from "react";
import BarGraph from "./components/BarGraph";
import PieGraph from "./components/PieGraph";
import { Button } from "@mui/base";

const ResultPage = ({
  daysLeft,
  hoursLeft,
  subjectDetails,
  scheduling,
  setScheduling,
}) => {
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

  return (
    <div className="w-full p-8">
      <h1 className="text-white text-3xl text-center">SCHEDULING SYSTEM</h1>
      <div className="flex items-center gap-5 font-bold bg- p-3 rounded-lg my-4">
        <h4 className="text-xl font-semibold text-white">Total Hours</h4>
        <h1 className="text-xl text-white">{totalHours}</h1>
      </div>
      <div className="text-white flex mb-4">
        <p className="mr-4">Days Left: {daysLeft}</p>
        <p>Hours Left: {hoursLeft}</p>
      </div>
      <p className="text-white font-semibold my-2 text-xl">Subjects:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-[#1e143d] rounded-lg col-span-2 ">
          <BarGraph
            taskExpenses={NumTopics}
            categories={NameArray}
            progress={progress}
          />
        </div>
        <div className="bg-[#1e143d] rounded-lg items-center justify-center flex w-full h-full ">
          <PieGraph taskExpenses={NumTopics} categories={NameArray} className=""/>
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

      <div className="flex justify-center">
        <Button
          onClick={() => setScheduling(false)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
        >
          Add Schedule
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;
