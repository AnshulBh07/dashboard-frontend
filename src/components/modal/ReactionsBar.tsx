import React from "react";
import styles from "../../sass/reactionBarStyles.module.scss";
import Wow from "../../assets/images/wow.png";
import Happy from "../../assets/images/happy.png";
import Heart from "../../assets/images/heart.png";
import Sad from "../../assets/images/sad.png";
import Like from "../../assets/images/like.png";
import Angry from "../../assets/images/angry.png";

interface IProps {
  showReactions: boolean;
  setFn: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ReactionsBar: React.FC<IProps> = ({ showReactions, setFn }) => {
  const reactionEmoji: string[] = [Like, Happy, Heart, Wow, Sad, Angry];

  return (
    <div
      onMouseEnter={() => setFn(true)}
      onMouseLeave={() => setFn(false)}
      className={`${styles.container} ${showReactions ? styles.active : ""}`}
    >
      {reactionEmoji.map((item, index) => {
        return (
          <button key={index} className={styles.img_wrapper}>
            <img src={item} alt="reaction-logo" />
          </button>
        );
      })}
    </div>
  );
};
