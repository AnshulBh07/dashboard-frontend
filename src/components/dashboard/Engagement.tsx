import React from "react";
import { Histogram } from "../charts/Histogram";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

export const Engagement: React.FC = () => {
  const { posts } = useSelector((state: RootState) => state.post);

  const calculateAvgEngagement = () => {
    const linkClickArr = new Array<number>();
    const EngagementArr = new Array<number>();
    const datesLabel = new Array<string>();

    for (const post of posts) {
      linkClickArr.push(post.link_click);
      datesLabel.push(post.timestamp.split("T")[0]);

      let sum = 0;

      const reactionArr: number[] = Object.values(post.reactions);

      reactionArr.forEach((item) => {
        if (typeof item === "number") return (sum += item);

        return sum;
      });

      EngagementArr.push(sum);
    }

    // console.log(EngagementArr);

    return { arrays: [linkClickArr, EngagementArr], datesLabel: datesLabel };
  };

  return (
    <div style={{ width: "100%", height: "90%" }}>
      <Histogram
        dataset={calculateAvgEngagement().arrays}
        colors={["#3683ff", "#69ffc5"]}
        legends={["Link clicks", "Impressions"]}
        datesLabel={calculateAvgEngagement().datesLabel}
      />
    </div>
  );
};
