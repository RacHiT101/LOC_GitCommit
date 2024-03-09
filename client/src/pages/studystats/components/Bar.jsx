import React from 'react';
import Chart from 'react-apexcharts';

const Bar = () => {

  const series = [{
    name: 'Investment',
    data: [23, 44, 55, 57, 56, 61, 58, 63, 60, 66, 69, 73]
  }];

  const options = {
    chart: {
      type: 'bar',
      background:"transparent",
      height: 350,
      toolbar: {
        show: false,
      }
    },
 
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      title: {
        text: 'Months'
      },
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    },
    yaxis: {
      title: {
        text: '₹ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "₹ " + val + " thousands"
        }
      }
    }
  }

  return (
    <div className='object-contain' id="monthly-investment">
      <Chart options={options} series={series} type="bar" height={380} />
    </div>
  )
}

export default Bar;