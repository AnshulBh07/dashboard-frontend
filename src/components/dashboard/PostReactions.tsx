import React, { useState } from "react";
import styles from "../../sass/reactionChartStyles.module.scss";
import Wow from "../../assets/images/wow.png";
import Happy from "../../assets/images/happy.png";
import Heart from "../../assets/images/heart.png";
import Sad from "../../assets/images/sad.png";
import Like from "../../assets/images/like.png";
import Angry from "../../assets/images/angry.png";
import { BarChart } from "../charts/BarChart";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

type reactionArr = { icon: string; title: string; value: number };

export const PostReactions: React.FC = () => {
  const [barNo, setBarNo] = useState<number>(0);
  const { posts } = useSelector((state: RootState) => state.post);

  const calculateData = () => {
    // returns an object that contains all the info needed
    let totalLikes = 0,
      totalHearts = 0,
      totalWow = 0,
      totalLaugh = 0,
      totalSad = 0,
      totalAngry = 0;
    const n = posts.length;
    const likeArr = new Array<number>(n).fill(0);
    const heartArr = new Array<number>(n).fill(0);
    const wowArr = new Array<number>(n).fill(0);
    const sadArr = new Array<number>(n).fill(0);
    const happyArr = new Array<number>(n).fill(0);
    const angryArr = new Array<number>(n).fill(0);
    const datesLabel = new Array<string>();

    let i = 0;

    for (const post of posts) {
      if (post.reactions.angry) {
        totalAngry += post.reactions.angry;
        angryArr[i] = post.reactions.angry;
      }

      if (post.reactions.haha) {
        totalLaugh += post.reactions.haha;
        happyArr[i] = post.reactions.haha;
      }

      if (post.reactions.wow) {
        totalWow += post.reactions.wow;
        wowArr[i] = post.reactions.wow;
      }

      if (post.reactions.like) {
        totalLikes += post.reactions.like;
        likeArr[i] = post.reactions.like;
      }

      if (post.reactions.love) {
        totalHearts += post.reactions.love;
        heartArr[i] = post.reactions.love;
      }

      if (post.reactions.sad) {
        totalSad += post.reactions.sad;
        sadArr[i] = post.reactions.sad;
      }

      datesLabel.push(post.timestamp.split("T")[0]);

      i++;
    }

    const totalReactionArr: reactionArr[] = [
      { icon: Like, title: "likes", value: totalLikes },
      { icon: Heart, title: "love", value: totalHearts },
      { icon: Sad, title: "sad", value: totalSad },
      { icon: Wow, title: "wow", value: totalWow },
      { icon: Happy, title: "happy", value: totalLaugh },
      { icon: Angry, title: "angry", value: totalAngry },
    ];

    return {
      totalArr: totalReactionArr,
      likeArr: likeArr,
      happyArr: happyArr,
      sadArr: sadArr,
      wowArr: wowArr,
      angryArr: angryArr,
      heartArr: heartArr,
      datesLabel: datesLabel,
    };
  };

  return (
    <div className={styles.container}>
      <p>Avg post reactions</p>

      <ul className={styles.total_wrapper}>
        {calculateData().totalArr.map((item, index) => {
          return (
            <li key={index}>
              <button
                className={styles.reactionBtn}
                onClick={() => setBarNo(index)}
              >
                <img src={item.icon} alt="emoji" />
              </button>
              <p>{item.title}</p>
              <p className={styles.value}>{item.value}</p>
            </li>
          );
        })}
      </ul>

      {barNo === 0 && (
        <BarChart
          labels={calculateData().datesLabel}
          dataArr={calculateData().likeArr}
          color="#3683ff"
          maxVal={Math.max(...calculateData().likeArr)}
        />
      )}

      {barNo === 1 && (
        <BarChart
          labels={calculateData().datesLabel}
          dataArr={calculateData().heartArr}
          color="#ff8a8a"
          maxVal={Math.max(...calculateData().heartArr)}
        />
      )}

      {barNo === 2 && (
        <BarChart
          labels={calculateData().datesLabel}
          dataArr={calculateData().sadArr}
          color="#ffeb8a"
          maxVal={Math.max(...calculateData().sadArr)}
        />
      )}

      {barNo === 3 && (
        <BarChart
          labels={calculateData().datesLabel}
          dataArr={calculateData().wowArr}
          color="#59ff7d"
          maxVal={Math.max(...calculateData().wowArr)}
        />
      )}

      {barNo === 4 && (
        <BarChart
          labels={calculateData().datesLabel}
          dataArr={calculateData().happyArr}
          color="#b175ff"
          maxVal={Math.max(...calculateData().happyArr)}
        />
      )}

      {barNo === 5 && (
        <BarChart
          labels={calculateData().datesLabel}
          dataArr={calculateData().angryArr}
          color="#cc0000"
          maxVal={Math.max(...calculateData().angryArr)}
        />
      )}
    </div>
  );
};
