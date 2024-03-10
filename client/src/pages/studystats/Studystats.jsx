import React, { useEffect, useRef, useState } from "react";
import { FaHourglass } from "react-icons/fa6";
import { FaCircleInfo } from "react-icons/fa6";
import { IoHourglassOutline } from "react-icons/io5";
import { FcAlarmClock } from "react-icons/fc";
import { BsDoorClosedFill } from "react-icons/bs";
import { IoIosCheckboxOutline } from "react-icons/io";
import Calendar from "./components/Calendar.jsx";
import { MdClose } from "react-icons/md";
import dayjs from "dayjs";
import Bar from "./components/Bar.jsx";
import Page from "../../containers/Page.jsx";

const Studystats = () => {
  const calendarRef = useRef(null);

  const [activeButton, setActiveButton] = useState("monthly");
  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: dayjs(),
    endDate: dayjs().add(3, "month"),
  });

  const handleButtonClick = (buttonType) => {
    setActiveButton(buttonType);
  };
  const handleClickOutside = (event) => {
    event.preventDefault();

    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setShowCalendar(false);
    }
  };

  const handleCalendarClose = () => {
    setShowCalendar(false);
  };

  useEffect(() => {
    if (showCalendar) {
      document.addEventListener("click", handleClickOutside);

      return () => {
        document.removeEventListener("click", handleClickOutside);
      };
    }
  }, [showCalendar]);
  return (
    <>
      <Page title={"Public Room"} horizontalCenter>
        <div className="bg-[#10002b] pt-5 w-full font-Poppins">
          <header className="flex justify-between mx-5">
            <h1 className="text-[#faf3e4] text-2xl">Study Stats</h1>
            <div className="flex gap-2 items-center">
              <div className="text-[#676f8a] text-sm">jan31-dec31</div>
              <div className="segment flex gap-2 ">
                <button
                  className={`button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-500  active:text-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 rounded-lg text-sm ${
                    activeButton === "monthly"
                      ? "bg-gray-400 hover:bg-gray-700/40 text-white dark:bg-gray-500 dark:text-gray-200"
                      : ""
                  }`}
                  onClick={() => handleButtonClick("monthly")}
                >
                  Monthly
                </button>
                <button
                  className={`button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-500 active:text-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 rounded-lg text-sm ${
                    activeButton === "weekly"
                      ? "bg-gray-400 hover:bg-gray-700/40 text-white dark:bg-gray-500 dark:text-gray-200"
                      : ""
                  }`}
                  onClick={() => handleButtonClick("weekly")}
                >
                  Weekly
                </button>
                <button
                  className={`button bg-white border border-gray-300 dark:bg-gray-700 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 active:bg-gray-500 active:text-gray-100 dark:active:bg-gray-500 dark:active:border-gray-500 text-gray-600 dark:text-gray-100 radius-round h-9 px-3 py-2 rounded-lg text-sm ${
                    activeButton === "daily"
                      ? "bg-gray-400 hover:bg-gray-700/40 text-white dark:bg-gray-500 dark:text-gray-200"
                      : ""
                  }`}
                  onClick={() => handleButtonClick("daily")}
                >
                  Daily
                </button>
              </div>
            </div>
          </header>

          <div className="grid grid-cols-5 mt-5 gap-5 mx-5 mb-5">
            <div className="col-span-3 bg-[#1e143d] rounded-lg mb-5 ">
              <div className="px-5 pt-5 flex items-center text-[#faf3e4] gap-3">
                <h1 className="text-2xl">Focus Time</h1>
                <div className="text-xs mt-1">
                  <FaCircleInfo />
                </div>
              </div>
              <h2 className="text-[#676f8a] px-5">
                So far this week, you have studied:
                <span className="text-[#22ab57]"> 2 minutes</span>
              </h2>
              <Bar className="py-5" />
            </div>
            <div className="col-span-2 bg-[#1e143d] rounded-lg mb-5 ">
              <div className="px-5 pt-5 flex items-center text-[#faf3e4] gap-3">
                <h1 className="text-2xl">Study Streak</h1>
                <div className="text-xs mt-1">
                  <FaCircleInfo />
                </div>
              </div>
              <h2 className="text-[#676f8a] px-5">
                You are currently on a
                <span className="text-[#22ab57]"> 0 day streak</span>
              </h2>
              <div ref={calendarRef} className="relative">
                <span className="input-wrapper">
                 
                  <div className="input-suffix-end">
                    {/* <span className="close-btn text-base" role="button">
                      <MdClose />
                    </span> */}
                    <Calendar
                      selectedMonth={selectedDateRange.startDate}
                    />
                  </div>
                </span>
                {/* {showCalendar && (
                
              )} */}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-4 mt-5 gap-5 mx-5">
            <div className="bg-[#1e143d]  h-auto rounded-lg text-[#faf3e4] p-5">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#352c51] h-10 w-10 flex justify-center items-center text-yellow-300">
                  <IoHourglassOutline />
                </div>
                <h1 className="font-semibold">Avg/Day</h1>
                <div className="text-xs">
                  <FaCircleInfo />
                </div>
              </div>
              <h2 className="text-5xl font-semibold">0</h2>
              <h2 className="text-[#676f8a]">hours</h2>
            </div>
            <div className="bg-[#1e143d]  h-auto rounded-lg text-[#faf3e4] p-5">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#352c51] h-10 w-10 flex justify-center items-center">
                  <FcAlarmClock />
                </div>
                <h1 className="font-semibold">Longest Session</h1>
                <div className="text-xs">
                  <FaCircleInfo />
                </div>
              </div>
              <h2 className="text-5xl font-semibold">0</h2>
              <h2 className="text-[#676f8a]">hours</h2>
            </div>
            <div className="bg-[#1e143d] h-auto rounded-lg text-[#faf3e4] p-5">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#352c51] h-10 w-10 flex justify-center items-center text-yellow-400">
                  <BsDoorClosedFill />
                </div>
                <h1 className="font-semibold">Rooms joined</h1>
                <div className="text-xs">
                  <FaCircleInfo />
                </div>
              </div>
              <h2 className="text-5xl font-semibold">0</h2>
              <h2 className="text-[#676f8a]">hours</h2>
            </div>
            <div className="bg-[#1e143d]  h-auto rounded-lg text-[#faf3e4] p-5">
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-[#352c51] h-10 w-10 flex justify-center items-center text-green-700">
                  <IoIosCheckboxOutline />
                </div>
                <h1 className="font-semibold">Tasks Completed</h1>
                <div className="text-xs">
                  <FaCircleInfo />
                </div>
              </div>
              <h2 className="text-5xl font-semibold">0</h2>
              <h2 className="text-[#676f8a]">hours</h2>
            </div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default Studystats;
