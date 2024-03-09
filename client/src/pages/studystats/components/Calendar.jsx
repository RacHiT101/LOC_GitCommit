import React, { useState } from "react";
import dayjs from "dayjs";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const Calendar = ({ onClose, onSelectDateRange }) => {

  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const today = dayjs();

  const handleMonthChange = (monthsToAdd) => {
    setSelectedDate(selectedDate.add(monthsToAdd, "month"));
  };

  const handleDateClick = (date) => {
    const isBeforeToday =
      date.isBefore(today, "day") || date.isSame(today, "day");
    if (!selectedStartDate && isBeforeToday) {
      setSelectedStartDate(date);
      setSelectedEndDate(null);
    } else if (selectedStartDate && isBeforeToday) {
      if (!selectedEndDate || date.isBefore(selectedStartDate)) {
        setSelectedEndDate(date);
      } else {
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      }
    }
  };

  const handleSubmit = () => {
    onSelectDateRange(selectedStartDate, selectedEndDate);
    onClose();
  };

  const generateMonthMatrix = (date) => {
    const startOfMonth = date.startOf("month").startOf("week");
    const endOfMonth = date.endOf("month");

    const matrix = [];
    let currentRow = [];
    let currentDate = startOfMonth;

    while (
      currentDate.isBefore(endOfMonth) ||
      currentDate.isSame(endOfMonth, "day")
    ) {
      currentRow.push(currentDate.clone());
      if (currentDate.day() === 6 || currentDate.isSame(endOfMonth, "day")) {
        matrix.push(currentRow);
        currentRow = [];
      }
      currentDate = currentDate.add(1, "day");
    }

    return matrix;
  };

  const renderCalendar = () => {
    const monthMatrix = generateMonthMatrix(selectedDate);

    return (
      <div>
        <div className="flex justify-between items-center mb-4">
          <button
            className={`text-gray-600 hover:text-gray-800 `}
            onClick={() => handleMonthChange(-1)}
          >
            <BsChevronLeft />
          </button>
          <h3 className="text-xl font-semibold">
            {selectedDate.format("MMMM YYYY")}
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
          {monthMatrix.map((week, weekIndex) =>
            week.map((date) => {
              const isCurrentMonth = date.month() === selectedDate.month();
              const isToday = date.isSame(today, "day");
              const isBeforeToday = date.isBefore(today, "day");
              const isTodayInCurrentMonth = isToday && isCurrentMonth;
              const isCurrentYear = date.year() === today.year();
              const isLastDayOfMonth = date.isSame(date.endOf("month"), "day"); // Add this line

              return (
                <div
                  key={date.format("YYYY-MM-DD")}
                  className={`rounded-full text-center p-2 cursor-pointer  ${
                    date.isSame(selectedDate, "day")
                      ? ""
                      : isTodayInCurrentMonth
                      ? "bg-yellow-200"
                      : isBeforeToday && !isCurrentMonth
                      ? "dark:text-gray-700 dark:border-gray-700 text-gray-200 border-white"
                      : ""
                  }${
                    (selectedStartDate &&
                      selectedEndDate &&
                      date.isAfter(selectedStartDate, "day") &&
                      date.isBefore(selectedEndDate, "day")) ||
                    date.isSame(selectedStartDate, "day") ||
                    date.isSame(selectedEndDate, "day")
                      ? "bg-blue-200 text-gray-600"
                      : ""
                  } ${date.isSame(selectedDate, "day") ? "" : ""} 
                  ${isToday && !isLastDayOfMonth ? "bg-gray-200" : ""}`}
                  onClick={() => handleDateClick(date)}
                >
                  {date.format("D")}
                </div>
              );
            })
          )}
        </div>
        <div className="mt-4 flex justify-center">
          <button
            className={`px-4 py-2 rounded-md bg-blue-500 text-white`}
            onClick={handleSubmit}
            // disabled={!selectedStartDate || !selectedEndDate}
          >
            OK
          </button>
        </div>
      </div>
    );
  };

  return (
    <>
      <div
        className={`absolute w-80 p-3 top-12 left-0 shadow-lg border ${
          
             "bg-white border-gray-300"
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
