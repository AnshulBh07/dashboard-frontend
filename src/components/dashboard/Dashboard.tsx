import React from "react";
import styles from "../../sass/dashboardStyles.module.scss";
import { TopBar } from "./TopBar";
import { getAggregatesDataList } from "../../data/statsData";
import { AggregateTile } from "./AggregateTile";
import { ProfileSection } from "./ProfileSection";
import { LineChart } from "../charts/LineChart";
import { IChartData, dataset } from "../../data/interface";
import { PostReactions } from "./PostReactions";
import { Engagement } from "./Engagement";
import { DoughnutChart } from "../charts/DoughnutChart";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Dashboard: React.FC = () => {
  const { posts } = useSelector((state: RootState) => state.post);
  // console.log(posts);

  //   function that calculates all the data required for all the charts
  //   this function returns a map of 4 items, where each is data for each chart we are gonna make
  const getData = () => {
    const chartsMap = new Map<string, IChartData>();
    // const n = socialMediaPosts.length;

    // 1. for impressions chart
    // first find labels
    const datesLabel = new Array<string>();
    const postViews = new Array<number>();
    for (const post of posts) {
      datesLabel.push(post.timestamp.split("T")[0]);
      postViews.push(post.views);
    }

    const impressionDataset: dataset = {
      label: "impressions",
      data: postViews,
      borderColor: "#ff4f4f",
      backgroundColor: "#ff4f4f",
    };

    const impressionData: IChartData = {
      labels: datesLabel,
      datasets: [impressionDataset],
    };

    chartsMap.set("impressions", impressionData);

    return chartsMap;
  };

  return (
    <section className={styles.container__main}>
      <TopBar />

      <div className={styles.wrapper_stats_profile}>
        <div className={styles.container_stats}>
          {/* contains all the aggregate tiles */}
          <div className={styles.aggregates_wrapper}>
            {getAggregatesDataList(posts).map((item, index) => {
              return <AggregateTile key={index} data={item} index={index} />;
            })}
          </div>

          <div className={styles.chart_wrapper}>
            <div className={styles.impressions}>
              <p>Average impressions per post</p>
              <LineChart chartData={getData().get("impressions")!} />
            </div>

            <PostReactions />

            <div className={styles.engagement}>
              <p>Average Engagement</p>
              <Engagement />
            </div>

            <DoughnutChart />
          </div>
        </div>

        <ProfileSection />
      </div>
    </section>
  );
};
