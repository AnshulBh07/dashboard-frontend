import { BsFileEarmarkImage } from "react-icons/bs";
import { BsFillTagFill } from "react-icons/bs";
import { BsEmojiHeartEyes } from "react-icons/bs";
import { MdLocationOn } from "react-icons/md";
import { PiGifFill } from "react-icons/pi";
import styles from "../sass/postModalStyles.module.scss";

type addItem = { icon: JSX.Element; title: string };

export const addToItemList: addItem[] = [
  {
    icon: (
      <BsFileEarmarkImage
        className={styles.icon}
        style={{ color: "#31d400" }}
      />
    ),
    title: "photo/video",
  },
  {
    icon: (
      <BsFillTagFill className={styles.icon} style={{ color: "#0058d4" }} />
    ),
    title: "tag people",
  },
  {
    icon: (
      <BsEmojiHeartEyes className={styles.icon} style={{ color: "#d4b400" }} />
    ),
    title: "feeling/activity",
  },
  {
    icon: <MdLocationOn className={styles.icon} style={{ color: "#d42000" }} />,
    title: "share location",
  },
  {
    icon: <PiGifFill className={styles.icon} style={{ color: "#00d4b0" }} />,
    title: "GIF",
  },
];
