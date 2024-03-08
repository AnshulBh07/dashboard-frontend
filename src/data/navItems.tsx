import { INavItem } from "./interface";
import { ImStatsDots } from "react-icons/im";
import styles from "../sass/navbarStyles.module.scss";
import { IoMdSettings } from "react-icons/io";
import { BsFillFilePostFill } from "react-icons/bs";
import { MdAccountBox } from "react-icons/md";

export const navItemsList: INavItem[] = [
  {
    name: "dashboard",
    icon: <ImStatsDots className={styles.icon} />,
    link: "/",
  },
  {
    name: "posts",
    icon: <BsFillFilePostFill className={styles.icon} />,
    link: "/posts",
  },
  {
    name: "account",
    icon: <MdAccountBox className={styles.icon} />,
    link: "/account",
  },
  {
    name: "settings",
    icon: <IoMdSettings className={styles.icon} />,
    link: "/settings",
  },
];
