import React, { useEffect, useRef, useState } from "react";
import { Chart } from "chart.js";
import {
  BarController,
  BarElement,
  LinearScale,
  CategoryScale,
} from "chart.js";
import { useDispatch, useSelector } from "react-redux";
import { getProjects } from "../redux/action";

const ChartComp = (department) => {
  const chartRef = useRef(null);
  const projects = useSelector((store) => store.appReducer.projects);
  const [uniqueValues, setUniqueValues] = useState();
  const dispatch = useDispatch();
 console.log('dep',department)
  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");
    Chart.register(BarController, BarElement, LinearScale, CategoryScale);
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ['strategy','B','C','D'],
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
  }, [uniqueValues]);
  return <canvas ref={chartRef}></canvas>;
};

export default React.memo(ChartComp);
