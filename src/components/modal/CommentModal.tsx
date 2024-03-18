import React, { useRef, useState } from "react";
import styles from "../../sass/commentModalStyles.module.scss";
import { IoClose } from "react-icons/io5";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { PostCard } from "../posts-page/PostCard";
import { Comment } from "../posts-page/Comment";
import { TreeNode } from "../../helper-functions/nAryTree";
import { ITreeItem } from "../../data/interface";
import { BsSendArrowUp } from "react-icons/bs";

interface IProps {
  commentTree: TreeNode<ITreeItem>;
  setCommentsTree: React.Dispatch<React.SetStateAction<TreeNode<ITreeItem>[]>>;
}

export const CommentModal: React.FC<IProps> = ({ commentTree }) => {
  const dispatch: AppDispatch = useDispatch();
  const { posts, index } = useSelector((state: RootState) => state.post);
  const [comment, setComment] = useState<string>("");

  const post = posts[index];
  const root = commentTree;
  console.log(post);

  const contentRef = useRef<HTMLDivElement>(null);
  console.log(contentRef);

  const handleScroll = () => {
    console.log(contentRef.current?.scrollTop);
  };

  // add comment function
  const handleAddCommentClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    // make a request to server to add the comment to given post,
    // for this we need post id and new comment data
  };

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
        <div
          className={styles.content}
          onScroll={handleScroll}
          ref={contentRef}
        >
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

        {/* comment box */}
        <div className={styles.comment_box}>
          <div className={styles.img_wrapper}>
            <img
              src="https://assets7.lottiefiles.com/avatars/300_profile-photo-1683838415909.jpeg"
              alt="profile"
            />
          </div>

          <label htmlFor="comment" className={styles.input_field}>
            <textarea
              name="comment"
              id="comment"
              rows={3}
              className={styles.input}
              placeholder="type comment here."
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
            />
            <button
              className={styles.post_comment_btn}
              disabled={comment.length === 0}
              onClick={handleAddCommentClick}
            >
              <BsSendArrowUp
                className={styles.post_icon}
                style={
                  comment.length === 0 ? { opacity: "0.3" } : { opacity: "0.6" }
                }
              />
            </button>
          </label>
        </div>
      </div>
    </section>
  );
};
