import { IAggregate, ISocialMediaPost } from "./interface";
import { FaEye } from "react-icons/fa6";
import { PiTarget } from "react-icons/pi";
import { FaThumbsUp } from "react-icons/fa";
import { HiCursorClick } from "react-icons/hi";
import { getAggregates } from "../helper-functions/averagesCalculator";
import styles from "../sass/aggregateStyles.module.scss";

export const getAggregatesDataList: (
  arr: ISocialMediaPost[]
) => IAggregate[] = (posts) => {
  const avgArr = getAggregates(posts);

  let aggregatesList = new Array<IAggregate>();
  const colors = ["#6982ff", "#bf9f28", "#ff69b4", "#69ffc5"];

  aggregatesList = [
    {
      title: "Avg impressions",
      icon: <FaEye className={styles.icon} style={{ color: colors[0] }} />,
      value: `${avgArr[0]}`,
    },
    {
      title: "Avg reach ",
      icon: <PiTarget className={styles.icon} style={{ color: colors[1] }} />,
      value: `${avgArr[1]}`,
    },
    {
      title: "Avg engagement rate ",
      icon: <FaThumbsUp className={styles.icon} style={{ color: colors[2] }} />,
      value: `${avgArr[2]}%`,
    },
    {
      title: "Avg CTR",
      icon: (
        <HiCursorClick className={styles.icon} style={{ color: colors[3] }} />
      ),
      value: `${avgArr[3]}%`,
    },
  ];

  return aggregatesList;
};
