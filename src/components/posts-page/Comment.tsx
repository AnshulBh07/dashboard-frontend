import React, { useState } from "react";
import styles from "../../sass/commentStyles.module.scss";
import { ITreeItem } from "../../data/interface";
import { TreeNode } from "../../helper-functions/nAryTree";

interface IProps {
  data: ITreeItem;
  children: TreeNode<ITreeItem>[];
}

export const Comment: React.FC<IProps> = ({ data, children }) => {
  // each comment will have a local state that will be used to view replies if any exists
  // replies are also comments in the end so we can produce them recursively using the
  // comments tree for each post
  const [showReplies, setShowReplies] = useState<boolean>(false);
  // console.log(data.level);

  return (
    <div
      className={styles.container}
      style={{ marginLeft: `${data.level! * 4}rem` }}
    >
      <div className={styles.comment_wrapper}>
        <div className={styles.img_wrapper}>
          <img
            src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
            alt="profile"
          />
        </div>

        <div className={styles.info_wrapper}>
          <p className={styles.text}>
            <span>{data.username}</span> {data.comment_text}
          </p>

          {children.length > 0 && (
            <button
              className={styles.repliesBtn}
              onClick={() =>
                setShowReplies((prevVal) => {
                  return !prevVal;
                })
              }
            >
              {`View all ${children.length} replies`}
            </button>
          )}
        </div>
      </div>

      {/* display children comments if showReplies is set */}
      {showReplies &&
        children.map((item, index) => {
          return (
            <Comment data={item.data!} children={item.children} key={index} />
          );
        })}
    </div>
  );
};
