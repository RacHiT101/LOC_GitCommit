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
  const totalTopics = NumTopics.reduce((acc, curr) => acc + curr, 0); // Calculate total number of topics
  const totalHours = daysLeft * hoursLeft;
  const hoursPerTopic = (totalHours / totalTopics).toFixed(2); // Round to two decimal places

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
      <h1 className="text-white text-4xl text-center font-bold">
        SCHEDULING SYSTEM
      </h1>
      <div className="bg-[#1e143d] px-5 rounded-lg flex items-center justify-between mt-5">
        <div className="flex items-center gap-5   rounded-lg my-4">
          <h4 className="text-xl font-semibold text-white">Total Hours</h4>
          <h1 className="text-xl text-white">{totalHours}</h1>
        </div>
        <div className="text-white flex ">
          <p className="mr-4">Days Left: {daysLeft}</p>
          <p>Hours Left: {hoursLeft}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8 mt-5">
        <div className="bg-[#1e143d] rounded-lg col-span-2 ">
          <BarGraph
            taskExpenses={NumTopics}
            categories={NameArray}
            progress={progress}
          />
        </div>
        <div className="bg-[#1e143d] rounded-lg flex justify-center items-center mx-auto w-full h-full">
          <div className="">
            <PieGraph taskExpenses={NumTopics} categories={NameArray} />
            <h1 className="flex items-center justify-center text-white mt-5">
              SUBJECT DISTRIBUTION
            </h1>
          </div>
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
                const hours = hoursPerTopic; // Use the same hours per topic for all topics
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
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 mt-5"
        >
          Add Schedule
        </Button>
      </div>
    </div>
  );
};

export default ResultPage;