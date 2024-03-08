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
  dataset: number[][];
  colors: string[];
  legends: string[];
  datesLabel: string[];
}

export const Histogram: React.FC<IProps> = ({
  datesLabel,
  dataset,
  legends,
  colors,
}) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
    scales: {
      x: {
        display: false,
      },
      y: {
        min: 0,
        max: 300,
        ticks: {
          stepSize: 10,
        },
      },
    },
  };
  const labels = datesLabel;

  const data = {
    labels,
    datasets: dataset.map((item, index) => {
      return {
        label: legends[index],
        data: item,
        borderColor: colors[index],
        backgroundColor: colors[index],
      };
    }),
  };
  return <Bar options={options} data={data}></Bar>;
};
