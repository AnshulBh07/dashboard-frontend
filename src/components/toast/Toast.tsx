import React from "react";
import styles from "../../sass/toastStyles.module.scss";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { RiErrorWarningFill } from "react-icons/ri";
import { IoMdCloseCircle } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { useDispatch } from "react-redux";

export const Toast: React.FC = () => {
  const { status, message, state } = useSelector(
    (state: RootState) => state.toast
  );
  const dispatch: AppDispatch = useDispatch();

  // function to decide what icon to display and what color
  const handleToast: () => [JSX.Element, string] = () => {
    switch (status) {
      case "success":
        return [
          <IoMdCheckmarkCircle
            className={styles.icon}
            style={{ color: "#6beb34" }}
          />,
          "#6beb34",
        ];
      case "error":
        return [
          <IoMdCloseCircle
            className={styles.icon}
            style={{ color: "#eb3434" }}
          />,
          "#eb3434",
        ];
      case "warning":
        return [
          <RiErrorWarningFill
            className={styles.icon}
            style={{ color: "#ebc934" }}
          />,
          "#ebc934",
        ];

      default:
        return [<RiErrorWarningFill className={styles.icon} />, ""];
    }
  };

  return (
    <section
      className={`${styles.container} ${state === "open" ? styles.show : ""} ${
        state === "close" ? styles.hide : ""
      }`}
    >
      <div
        className={styles.tip}
        style={{ backgroundColor: handleToast()[1] }}
      ></div>

      <div className={styles.info}>
        {/* icon */}
        {handleToast()[0]}

        <p className={styles.text}>
          <span>{status}</span>
          {message}
        </p>
      </div>

      <button
        className={styles.close_btn}
        onClick={() => dispatch({ type: "toast/hide" })}
      >
        <MdOutlineClose className={styles.close_icon} />
      </button>
    </section>
  );
};
