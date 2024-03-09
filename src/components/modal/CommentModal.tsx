import React from "react";
import styles from "../../sass/commentModalStyles.module.scss";
import { IoClose } from "react-icons/io5";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PostCard } from "../posts-page/PostCard";
import { Comment } from "../posts-page/Comment";
import { TreeNode } from "../../helper-functions/nAryTree";
import { ITreeItem } from "../../data/interface";

interface IProps {
  commentTree: TreeNode<ITreeItem>;
}

export const CommentModal: React.FC<IProps> = ({ commentTree }) => {
  console.log(commentTree);
  const dispatch: AppDispatch = useDispatch();
  const { posts, index } = useSelector((state: RootState) => state.post);

  const post = posts[index];
  const root = commentTree;

  return (
    <section className={styles.container__main}>
      {/* bg */}
      <div className={styles.bg}></div>

      <div className={styles.modal}>
        {/* heading */}
        <div className={styles.top}>
          <h2 className={styles.post_title}>{`${post.username}'s Post`}</h2>
          <button
            className={styles.closeBtn}
            onClick={() => dispatch({ type: "post/showComment" })}
          >
            <IoClose className={styles.close_icon} />
          </button>
        </div>

        {/* post */}
        <div className={styles.content}>
          <PostCard index={index} data={post} />
          <div className={styles.comments_wrapper}>
            <hr />
            <button className={styles.sortCmntBtn}>most relevant</button>
            {root.children.length > 0 &&
              root.children.map((item, index) => {
                return (
                  <Comment
                    key={index}
                    data={item.data!}
                    children={item.children}
                  />
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
};
