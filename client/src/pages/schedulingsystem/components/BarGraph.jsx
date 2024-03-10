import React from "react";
import Chart from "react-apexcharts";

const BarGraph = ({ taskExpenses, categories ,progress}) => {
  // Fixed values for Expected Investment
  const expectedInvestment = [0]; // Adjust according to your categories

  const series = [
    {
      name: "No. of Topics",
      data: taskExpenses,
    },
    {
      name: "Topics Covered",
      data: progress,
    },
  ];

  const options = {
    chart: {
      type: "bar",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: categories,
    },
    yaxis: {
      title: {
        text: "₹ (thousands)",
      },
    },
    colors: ["#868CFF", "#432CF3"],
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val + " thousands";
        },
      },
    },
  };

  return (
    <div className="object-contain" id="monthly-investment">
      <Chart options={options} series={series} type="bar" height={380} />
    </div>
  );
};

export default BarGraph;
