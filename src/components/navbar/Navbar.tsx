import React from "react";
import styles from "../../sass/navbarStyles.module.scss";
import { navItemsList } from "../../data/navItems";
import { useLocation, useNavigate } from "react-router-dom";

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  return (
    <div className={styles.container}>
      <h1 className={styles.company_name}>SwaySpace</h1>
      {/* map all nav items */}
      <nav>
        <ul className={styles.navItems_wrapper}>
          {navItemsList.map((item, index) => {
            return (
              <li key={index}>
                <button
                  className={styles.navBtn}
                  onClick={() => navigate(item.link)}
                  style={
                    pathname === item.link
                      ? { backgroundColor: "rgba(256, 256, 256, 0.4)" }
                      : {}
                  }
                >
                  {item.icon} {item.name}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
