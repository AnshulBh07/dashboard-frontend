import React from "react";
import styles from "../../sass/profileSectionStyles.module.scss";
import { BsPatchCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { MdOutlineCreate } from "react-icons/md";
import { AppDispatch } from "../../store";
import { useDispatch } from "react-redux";

export const ProfileSection: React.FC = () => {
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  return (
    <section className={styles.container}>
      <h2>my profile</h2>
      <div className={styles.img_container}>
        <img
          src="https://assets7.lottiefiles.com/avatars/300_profile-photo-1683838415909.jpeg"
          alt="profile"
        />
      </div>

      <p className={styles.tag}>
        anshul bhardwaj
        <span>
          pro account <BsPatchCheckFill className={styles.icon} />
        </span>
      </p>

      <button className={styles.viewBtn} onClick={() => navigate("/account")}>
        view full profile
      </button>

      <button
        className={styles.createPostBtn}
        onClick={() => dispatch({ type: "post/showModal" })}
      >
        <MdOutlineCreate className={styles.icon} />
      </button>
    </section>
  );
};
