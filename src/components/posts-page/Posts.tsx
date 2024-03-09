import React from "react";
import styles from "../../sass/postsStyles.module.scss";
import { ProfileSection } from "../dashboard/ProfileSection";
import { RiLiveFill } from "react-icons/ri";
import { IoMdPhotos } from "react-icons/io";
import { BsEmojiLaughing } from "react-icons/bs";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";
import { PostCard } from "./PostCard";
import { useSelector } from "react-redux";

export const Posts: React.FC = () => {
  // console.log(commentsMap);
  const dispatch: AppDispatch = useDispatch();
  const { posts } = useSelector((state: RootState) => state.post);

  return (
    <section className={styles.container__main}>
      {/* displays posts with postData */}
      <div className={styles.container__posts}>
        <div className={styles.posts_wrapper}>
          {/* top posts creation bar */}
          <div className={styles.topBar_wrapper}>
            <div className={styles.create}>
              <div className={styles.img_wrapper}>
                <img
                  src="https://assets7.lottiefiles.com/avatars/300_profile-photo-1683838415909.jpeg"
                  alt="profile pic"
                />
              </div>

              <button
                className={styles.createBtn}
                onClick={() => dispatch({ type: "post/showModal" })}
              >
                What's on your mind, Anshul?
              </button>
            </div>

            <hr />

            <div className={styles.features_wrapper}>
              <button className={styles.optionBtn}>
                <RiLiveFill
                  className={styles.icon}
                  style={{ color: "#d42000" }}
                />
                live video
              </button>
              <button className={styles.optionBtn}>
                <IoMdPhotos
                  className={styles.icon}
                  style={{ color: "#31d400" }}
                />
                photo/video
              </button>
              <button className={styles.optionBtn}>
                <BsEmojiLaughing
                  className={styles.icon}
                  style={{ color: "#d4b400" }}
                />
                feeling/activity
              </button>
            </div>
          </div>

          {/* start displaying all the posts here */}
          {posts.map((item, index) => {
            return <PostCard key={index} data={item} index={index} />;
          })}
        </div>
      </div>

      {/* profile section and create button */}
      <ProfileSection />
    </section>
  );
};
