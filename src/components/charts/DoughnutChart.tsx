import React from "react";
import styles from "../../sass/doughnutStyles.module.scss";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart: React.FC = () => {
  const { posts } = useSelector((state: RootState) => state.post);

  const labels = ["Likes", "Love", "Wow", "Sad", "Happy", "Angry"];

  //   function to get data
  const getData = () => {
    const freqArr = new Array<number>(6).fill(0);

    for (const post of posts) {
      if (post.reactions.like) {
        freqArr[0] += post.reactions.like;
      }
      if (post.reactions.love) {
        freqArr[1] += post.reactions.love;
      }
      if (post.reactions.wow) {
        freqArr[2] += post.reactions.wow;
      }
      if (post.reactions.sad) {
        freqArr[3] += post.reactions.sad;
      }
      if (post.reactions.haha) {
        freqArr[4] += post.reactions.haha;
      }
      if (post.reactions.angry) {
        freqArr[5] += post.reactions.angry;
      }
    }

    return freqArr;
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right" as const,
        labels: {
          font: {
            weight: "bold" as const,
          },
        },
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: "# of Votes",
        data: getData(),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className={styles.container}>
      <div style={{ width: "100%", height: "100%" }}>
        <Doughnut data={data} options={options} />
      </div>
    </div>
  );
};
