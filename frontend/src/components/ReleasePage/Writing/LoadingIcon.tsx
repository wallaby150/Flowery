import React from "react";
import styles from "./LoadingIcon.module.scss";

const Loading = () => {
  return (
    <div className={styles.loadingWrapper}>
      <div className={styles.animate}>
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
