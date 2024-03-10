import React from 'react';
import Chart from 'react-apexcharts';

const PieGraph = ({ taskExpenses, categories }) => {
  // Calculate total expenses
  const totalExpenses = taskExpenses.reduce((acc, expense) => acc + parseFloat(expense), 0);

  // Calculate percentage of total expenses for each category
  const series = taskExpenses.map((expense) => (expense / totalExpenses) * 100);
  // const remainingTopics = taskExpenses.map((totalTopics, index) => {
  //   return totalTopics - progress[index];
  // });
  const options = {
    chart: {
      type: 'donut',
    },
    labels: categories, // Use provided categories as labels
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        size: 100,
        donut: {
          size: '80%',
        },
      },
    },
    annotations: {
      position: 'front',
      points: [
        {
          x: 50,
          y: 50,
          marker: {
            size: 0,
          },
          label: {
            text: 'Center Text',
            offsetY: 0,
            style: {
              fontSize: '18px',
              color: '#000',
            },
          },
        },
      ],
    },
  };

  return (
    <div className='object-contain flex justify-center' id="equity">
      <Chart options={options} series={series} type="donut" height={278.7} width={279} />
    </div>
  );
};

export default PieGraph;
