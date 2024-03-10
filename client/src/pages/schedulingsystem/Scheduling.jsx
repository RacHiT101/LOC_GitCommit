import React, { useState } from "react";
import Page from "../../containers/Page";
import { useNavigate } from "react-router-dom";
import ResultPage from "./ResultPage";

const Scheduling = () => {
  const [numSubjects, setNumSubjects] = useState(0);
  const [subjectDetails, setSubjectDetails] = useState([]);
  const [daysLeft, setDaysLeft] = useState(0);
  const [hoursLeft, setHoursLeft] = useState(0);
  const [scheduling, setScheduling] = useState(false);

  console.log(daysLeft);
  console.log(hoursLeft);
  console.log(subjectDetails)

  const navigate = useNavigate();
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
    <div key={index}>
      <h2>Subject {index + 1}</h2>
      <div className="flex gap-20">
        <label htmlFor={`subjectName${index}`} className="text-white">
          What is Subject {index + 1} name?
        </label>
        <input
          type="text"
          id={`subjectName${index}`}
          value={subject.name}
          onChange={(event) => handleSubjectNameChange(index, event)}
        />
      </div>
      <div className="flex gap-9 mt-5">
        <label htmlFor={`numTopics${index}`} className="text-white">
          How many topics in Subject {index + 1}?
        </label>
        <input
          type="number"
          id={`numTopics${index}`}
          value={subject.numTopics}
          onChange={(event) => handleNumTopicsChange(index, event)}
        />
      </div>
    </div>
  ));
  const handleSubmit = () => {
    // Navigate to the new page and pass the input values as props
    // navigate("/schedule-result", {
    //   state: {
    //     daysLeft: daysLeft,
    //     hoursLeft: hoursLeft,
    //     subjects: subjectDetails,
    //   },
    // });
    setScheduling(true);
  };
  return (
    <>
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
          <>
            <div className="text-white">Scheduling System</div>
            <div>
              <h1 className="text-white">
                Number Of Days you want a Schedule for?
              </h1>
              <input type="number" id="daysLeft" onChange={(e) => {setDaysLeft(e.target.value)}} />
            </div>
            <div>
              <h1 className="text-white">
                Number Of Hours you can give in a day?
              </h1>
              <input type="number" id="hoursLeft" onChange={(e) => {setHoursLeft(e.target.value)}}/>
            </div>
            <div>
              <h1 className="text-white">How many subjects are there?</h1>
              <input
                type="number"
                id="numSubjects"
                value={numSubjects}
                onChange={handleNumSubjectsChange}
              />
            </div>
            {subjectQuestions}
            <button
              onClick={handleSubmit}
              className="text-white bg-black p-2 mt-5 border-white border-3 rounded-lg"
            >
              Submit
            </button>
          </>
        )}
      </Page>
    </>
  );
};

export default Scheduling;
