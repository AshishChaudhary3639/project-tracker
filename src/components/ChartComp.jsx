import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import {
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
  Slice
} from "chart.js";

const ChartComp = (department,uniqDepArr) => {
  const chartRef = useRef(null);
  const [uniqueValues, setUniqueValues] = useState();
 console.log('dep',uniqDepArr)
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    Chart.register(BarController, BarElement, LinearScale, CategoryScale);
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: uniqDepArr,
        datasets: [
          {
            label: "data set1",
            data: [12, 13, 12, 11],
            backgroundColor: "blue",
            borderWidth: 1,
          },
          {
            label: "data set1",
            data: [10, 13, 8, 7],
            backgroundColor: "teal",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            type: "linear",
          },
        },
      },
    });
  }, [uniqueValues,uniqDepArr]);
  return <canvas ref={chartRef}></canvas>;
};

export default React.memo(ChartComp);
