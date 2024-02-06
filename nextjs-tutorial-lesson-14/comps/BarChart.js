// BarChart.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const BarChart = ({ data }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const myChartRef = chartRef.current.getContext("2d");

    const barColors = [
      'rgba(255,99,123,0.2)',
      'rgba(255,159,64,0.2)',
      'rgba(255,205,86,0.2)',
      'rgba(75,99,123,0.2)',
    ];

    // Extract counts for each option
    const counts = data.map((count) => count);

    // Use 'Chart' as a constructor, not 'chartInstance'
    chartInstance.current = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: ["Option 1", "Option 2", "Option 3", "Option 4"],
        datasets: [
          {
            label: "Distribution of answers",
            data: counts,
            backgroundColor: barColors,
          },
        ],
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data]);

  return (
    <>
      <canvas ref={chartRef} />
    </>
  );
};

export default BarChart;