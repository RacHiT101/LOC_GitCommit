import React, { useState } from "react";
import dayjs from "dayjs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Calendar = ({ selectedMonth }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs(selectedMonth));

  const today = dayjs();

  // Function to generate a random date in the past
  const generateRandomPastDate = () => {
    const randomPastDate = today.subtract(Math.floor(Math.random() * 365), "day");
    return randomPastDate;
  };

  // Function to generate an array of random past dates with green dots
  const generateRandomPastDates = () => {
    const randomDates = [];
    for (let i = 0; i < 5; i++) {
      randomDates.push(generateRandomPastDate());
    }
    return randomDates;
  };

  const handleMonthChange = (increment) => {
    setCurrentMonth(currentMonth.add(increment, "month"));
  };

  const renderCalendar = () => {
    const randomDates = generateRandomPastDates();

    return (
      <div className="border border-red-700">
        <div className="flex justify-between items-center mb-4">
          <button
            className={`text-gray-600 hover:text-gray-800 `}
            onClick={() => handleMonthChange(-1)}
          >
            <BsChevronLeft />
          </button>
          <h3 className="text-xl font-semibold">
            {currentMonth.format("MMMM YYYY")}
          </h3>
          <button
            className={`text-gray-600 hover:text-gray-800 `}
            onClick={() => handleMonthChange(1)}
          >
            <BsChevronRight />
          </button>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="text-center font-bold">
              {day}
            </div>
          ))}
          {[...Array(currentMonth.startOf("month").startOf("week").daysInMonth()).keys()].map((index) => {
            const date = currentMonth
              .startOf("month")
              .startOf("week")
              .date(index + 1);
            const isToday = date.isSame(today, "day");
            const isPastDate = date.isBefore(today, "day");
            const isCompleted = randomDates.some((randomDate) =>
              date.isSame(randomDate, "day")
            );

            // Logic to check streak (minimum 5 per week)
            const streak = randomDates.filter((randomDate) =>
              date.isAfter(randomDate.startOf("week")) &&
              date.isBefore(randomDate.endOf("week"))
            ).length >= 5;

            return (
              <div
                key={index}
                className={`relative rounded-full text-center p-2 cursor-pointer ${
                  isToday ? "bg-yellow-200" : streak ? "bg-green-200" : ""
                }`}
              >
                {date.format("D")}
                {isCompleted && (
                  <span className="absolute top-0 right-0 w-2 h-2 bg-green-500 rounded-full"></span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`absolute w-80 p-3 top-12 left-0 shadow-lg border ${
          "text-white border-gray-300"
        }`}
        style={{
          transform: "translate(829.6px, 78.4px);",
          zIndex: "40",
          willChange: "transform",
          borderRadius: "0.5rem",
        }}
      >
        {renderCalendar()}
      </div>
    </>
  );
};

export default Calendar;
