import React from "react";
import styles from "./LoadingSpin.module.scss";

const LoadingSpinner = () => {
  return (
    <>
      (
      <div className={styles.loadingspinner}>
        <div className={styles.spinner}></div>
      </div>
      )
    </>
  );
};

export default LoadingSpinner;
