import React, { useState } from "react";
import { IReactions, ISocialMediaPost, ITreeItem } from "../../data/interface";
import styles from "../../sass/postCardStyles.module.scss";
import { MdOutlineMoreHoriz } from "react-icons/md";
import Wow from "../../assets/images/wow.png";
import Happy from "../../assets/images/happy.png";
import Heart from "../../assets/images/heart.png";
import Sad from "../../assets/images/sad.png";
import Like from "../../assets/images/like.png";
import Angry from "../../assets/images/angry.png";
import { AiOutlineLike } from "react-icons/ai";
import { MdOutlineModeComment } from "react-icons/md";
import { TbShare3 } from "react-icons/tb";
import { ReactionsBar } from "../modal/ReactionsBar";

interface IProps {
  data: ISocialMediaPost;
  comments: ITreeItem[];
}

export const PostCard: React.FC<IProps> = ({ data, comments }) => {
  // here we will need a local state as well for reactions modal
  const [showReactions, setShowReactions] = useState<boolean>(false);

  const getReactions = (reactionsObj: IReactions) => {
    // create a map for reactions
    const emojiMap = new Map<string, string>();
    emojiMap.set("like", Like);
    emojiMap.set("love", Heart);
    emojiMap.set("haha", Happy);
    emojiMap.set("sad", Sad);
    emojiMap.set("angry", Angry);
    emojiMap.set("wow", Wow);

    const ans = new Array<string>();
    const arr = Object.entries(reactionsObj); //gives an array of [key,value] entries

    // iterate over [key,value] arr
    for (const [key, val] of arr) {
      if (typeof val === "number") ans.push(emojiMap.get(key)!);
    }

    // console.log(ans);

    return ans;
  };

  const reactionArr = getReactions(data.reactions);

  return (
    <React.Fragment>
      <section className={styles.container__main}>
        <div className={styles.top}>
          <div className={styles.img_wrapper}>
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
              alt="profile"
            />
          </div>

          <p className={styles.details}>
            {data.username}
            <span>{data.timestamp.split("T")[0]}</span>
          </p>

          <button className={styles.moreBtn}>
            <MdOutlineMoreHoriz className={styles.icon} />
          </button>
        </div>

        <div className={styles.content}>
          <p className={styles.text}>{data.post_content}</p>

          {/* display media if it exists */}
          {data.media && (
            <div className={styles.media_container}>
              {data.media_type === "photo" ? (
                <div className={styles.img_wrapper}>
                  <img
                    src={data.media}
                    alt="media-photo"
                    className={styles.bg}
                  />

                  <img
                    src={data.media}
                    alt="media-photo"
                    className={styles.photo}
                  />
                </div>
              ) : (
                ""
              )}
            </div>
          )}
        </div>

        <div className={styles.bottom}>
          <div className={styles.info}>
            <div className={styles.reactions_wrapper}>
              {reactionArr.map((item, index) => {
                return <img key={index} src={item} alt="emoji" />;
              })}
            </div>
            <p className={styles.values}>
              {`${comments.length} comments`}
              <span>{`${data.shares} shares`}</span>
            </p>
          </div>

          <hr className={styles.separator} />

          <div className={styles.actions_wrapper}>
            <ReactionsBar
              showReactions={showReactions}
              setFn={setShowReactions}
            />
            <button
              className={styles.optionBtn}
              onMouseEnter={() => setShowReactions(true)}
              onMouseLeave={() => setShowReactions(false)}
            >
              <AiOutlineLike className={styles.icon} />
              like
            </button>
            <button className={styles.optionBtn}>
              <MdOutlineModeComment className={styles.icon} /> comment
            </button>
            <button className={styles.optionBtn}>
              <TbShare3 className={styles.icon} /> share
            </button>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
