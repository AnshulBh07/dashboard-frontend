import React from "react";
import { IAggregate } from "../../data/interface";
import styles from "../../sass/aggregateStyles.module.scss";

interface IProps {
  key: number;
  data: IAggregate;
  index: number;
}

export const AggregateTile: React.FC<IProps> = ({ data }) => {
  return (
    <div className={styles.container}>
      {data.icon}
      <p className={styles.info}>
        <span>{data.value}</span>
        {data.title}
      </p>
    </div>
  );
};
