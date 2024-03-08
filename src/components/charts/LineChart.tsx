import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { IChartData } from "../../data/interface";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface IProps {
  chartData: IChartData;
}

export const LineChart: React.FC<IProps> = ({ chartData }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: 10,
          },
        },
      },
      y: {
        min: 0,
        max: 350,
        ticks: {
          stepSize: 50,
        },
      },
    },
  };

  const labels = chartData.labels;

  const data = {
    labels,
    datasets: chartData.datasets.map((item) => {
      return {
        data: item.data,
        borderColor: item.borderColor,
        backgroundColor: item.backgroundColor,
      };
    }),
  };

  return <Line options={options} data={data} />;
};
