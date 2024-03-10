import React, { useState } from "react";
import Page from "../../containers/Page";
import ResultPage from "./ResultPage";

const Scheduling = () => {
  const [numSubjects, setNumSubjects] = useState(0);
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [currentStep, setCurrentStep] = useState(1);
  const [scheduling, setScheduling] = useState(false);

  const handleNumSubjectsChange = (event) => {
    const num = parseInt(event.target.value);
    setNumSubjects(num);
    setSubjectDetails(
      Array.from({ length: num }, (_, index) => ({
        name: "",
        numTopics: 0,
      }))
    );
  };

  const handleSubjectNameChange = (index, event) => {
    const newSubjectDetails = [...subjectDetails];
    newSubjectDetails[index].name = event.target.value;
    setSubjectDetails(newSubjectDetails);
  };

  const handleNumTopicsChange = (index, event) => {
    const newSubjectDetails = [...subjectDetails];
    newSubjectDetails[index].numTopics = parseInt(event.target.value);
    setSubjectDetails(newSubjectDetails);
  };

  const subjectQuestions = subjectDetails.map((subject, index) => (
    <div key={index} className="mt-6">
      <h2 className="text-white">Subject {index + 1}</h2>
      <div className="flex flex-col gap-3">
        <label htmlFor={`subjectName${index}`} className="text-white">
          What is the name of Subject {index + 1}?
        </label>
        <input
          type="text"
          id={`subjectName${index}`}
          value={subject.name}
          onChange={(event) => handleSubjectNameChange(index, event)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
      <div className="flex flex-col gap-3 mt-3">
        <label htmlFor={`numTopics${index}`} className="text-white">
          How many topics are there in Subject {index + 1}?
        </label>
        <input
          type="number"
          id={`numTopics${index}`}
          value={subject.numTopics}
          onChange={(event) => handleNumTopicsChange(index, event)}
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
        />
      </div>
    </div>
  ));

  const handleNextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    } else {
      // Handle submission
      setScheduling(true);
    }
  };

  const handleSubmit = () => {
    // Handle submission
    setScheduling(true);
  };

  return (
    <Page title={"Public Room"}>
      {scheduling ? (
        <ResultPage
          daysLeft={daysLeft}
          hoursLeft={hoursLeft}
          subjectDetails={subjectDetails}
          scheduling={scheduling}
          setScheduling={setScheduling}
        />
      ) : (
        <div className="flex justify-center items-center mx-auto h-screen bg-gradient-to-r from-[rgba(50, 0, 60, 0.7)] to-[rgba(0, 0, 20, 0.7)] shadow-xl">
          <div className="p-6 rounded-md shadow-lg">
            <h1 className="text-white text-2xl mb-6 font-bold">
              Scheduling System
            </h1>
            {currentStep === 1 && (
              <>
                <div className="mb-4">
                  <label htmlFor="daysLeft" className="text-white block">
                    Number of Days you want a Schedule for?
                  </label>
                  <input
                    type="number"
                    id="daysLeft"
                    onChange={(e) => setDaysLeft(e.target.value)}
                    className="p-2 border rounded-md"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="hoursLeft" className="text-white block">
                    Number of Hours you can give in a day?
                  </label>
                  <input
                    type="number"
                    id="hoursLeft"
                    onChange={(e) => setHoursLeft(e.target.value)}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="numSubjects" className="text-white block">
                    How many subjects are there?
                  </label>
                  <input
                    type="number"
                    id="numSubjects"
                    value={numSubjects}
                    onChange={handleNumSubjectsChange}
                    className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-400"
                  />
                </div>
              </>
            )}
            {currentStep === 2 && subjectQuestions}
            {currentStep === 3 && (
              <button
                onClick={handleSubmit}
                className="mx-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400"
              >
                Submit
              </button>
            )}
            {currentStep < 3 && (
              <button
                onClick={handleNextStep}
                className="mx-auto bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-400 my-2 mx-auto"
              >
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </Page>
  );
};

export default Scheduling;
