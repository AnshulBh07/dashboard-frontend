import React from "react";
import styles from "../../sass/loginLayoutStyles.module.scss";
import { Outlet } from "react-router-dom";
import { Toast } from "../toast/Toast";

export const Layout: React.FC = () => {
  return (
    <React.Fragment>
      <section className={styles.container}>
        <Outlet />
      </section>

      <Toast />
    </React.Fragment>
  );
};
