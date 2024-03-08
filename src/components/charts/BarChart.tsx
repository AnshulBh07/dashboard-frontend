import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  labels: string[];
  dataArr: number[];
  color: string;
  maxVal: number;
}

export const BarChart: React.FC<IProps> = ({
  labels,
  dataArr,
  color,
  maxVal,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        min: 0,
        max: maxVal + 10,
        ticks: {
          stepSize: maxVal <= 10 ? 1 : 10,
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: dataArr,
        borderColor: color,
        backgroundColor: color,
      },
    ],
  };

  return (
    <div style={{ width: "100%", height: "50%" }}>
      <Bar options={options} data={data}></Bar>
    </div>
  );
};
