import React from "react";
import styles from "../../sass/postModalStyles.module.scss";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";
import { addToItemList } from "../../data/addToPostData";
import { IoClose } from "react-icons/io5";

export const PostModal: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const getCurrDateTime = () => {
    let date: string | Date = new Date();
    // console.log(date);
    date = date.toISOString();

    const dateArr = date.split("T");
    const x = dateArr[0]; //date

    return x;
  };

  return (
    <div className={styles.container}>
      <div className={styles.modal_wrapper}>
        <div className={styles.top}>
          <h2>create post</h2>
          <button
            className={styles.closeBtn}
            onClick={() => dispatch({ type: "post/showModal" })}
          >
            <IoClose className={styles.close_icon} />
          </button>
        </div>

        <div className={styles.bottom}>
          <div className={styles.content}>
            <div className={styles.profile}>
              <div className={styles.img_wrapper}>
                <img
                  src="https://assets7.lottiefiles.com/avatars/300_profile-photo-1683838415909.jpeg"
                  alt="profile"
                />
              </div>

              <p className={styles.name}>
                anshul bhardwaj
                <span>{getCurrDateTime()}</span>
              </p>
            </div>

            <label htmlFor="description" className={styles.text_input}>
              <textarea
                name="description"
                id="description"
                rows={8}
                maxLength={500}
                className={styles.input}
                placeholder={`What's on your mind, Anshul?`}
              ></textarea>
              <span>0/500</span>
            </label>
          </div>

          <div className={styles.addToPost}>
            <p>Add to your post</p>

            <ul className={styles.options_wrapper}>
              {addToItemList.map((item, index) => {
                return (
                  <li key={index}>
                    <button className={styles.optionBtn}>
                      {item.icon} <span>{item.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          <button className={styles.postBtn}>post</button>
        </div>
      </div>
    </div>
  );
};
