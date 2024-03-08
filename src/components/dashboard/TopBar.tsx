import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import styles from "../../sass/topBarStyles.module.scss";

export const TopBar: React.FC = () => {
  const [searchKey, setSearchKey] = useState<string>("");
  const [showSearch, setShowSearch] = useState<boolean>(false);

  return (
    <div className={styles.top_bar}>
      <p className={styles.name}>
        <span>hello,</span>anshul
      </p>
      <button className={styles.notificationBtn}>
        <FaBell className={styles.bell_icon} />
      </button>
      <div className={styles.search_bar}>
        {showSearch && (
          <input
            type="text"
            name="search-bar"
            id="search-bar"
            placeholder="search here"
            className={styles.input_field}
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
        )}
        <IoSearch
          className={styles.search_icon}
          onClick={() =>
            setShowSearch((prevVal) => {
              return !prevVal;
            })
          }
        />
      </div>
    </div>
  );
};
