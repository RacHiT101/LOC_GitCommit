import React from "react";
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

  return (
    <div className="w-full p-8">
      <h1 className="text-white text-3xl text-center">SCHEDULING SYSTEM</h1>
      <div className="flex items-center gap-5 bg-purple-900 p-3 rounded-lg my-4">
        <h4 className="text-xl font-semibold text-white">Total Hours</h4>
        <h1 className="text-xl text-white">{hoursLeft}</h1>
      </div>
      <div className="text-white flex mb-4">
        <p className="mr-4">Days Left: {daysLeft}</p>
        <p>Hours Left: {hoursLeft}</p>
      </div>
      <p className="text-white font-semibold my-2 text-xl">Subjects:</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
        <div className="bg-purple-900 rounded-lg col-span-2 ">
          <BarGraph taskExpenses={NumTopics} categories={NameArray} />
        </div>
        <div className="bg-purple-900 rounded-lg">
          <PieGraph taskExpenses={NumTopics} categories={NameArray} />
        </div>
      </div>

      <div className="bg-purple-900 rounded-lg p-4 mb-8">
        <h1 className="text-2xl text-white">Maths</h1>
        <ul className="text-white">
          <li>Topic 1</li>
          <li>Topic 2</li>
          <li>Topic 3</li>
        </ul>
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
