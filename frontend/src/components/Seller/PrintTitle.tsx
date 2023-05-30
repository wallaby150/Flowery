import React from "react";
import styles from "./PrintTitle.module.scss";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
interface TitleProps {
  num: number;
}

export default function PrintTitle(props: TitleProps) {
  const navigate = useNavigate();
  const location = useLocation();
  function handlenavigate() {
    navigate("/seller/book");
  }

  if (location.pathname === "/seller") {
    return (
      <main>
        <div className={styles.font1}>
          <p>예약 내역</p>
          <p className={styles.font3} onClick={handlenavigate}>
            전체보기
          </p>
        </div>
        <div className={styles.font2}>총 {props.num}건의 예약이 있습니다.</div>
      </main>
    );
  } else {
    return (
      <main>
        <div className={styles.font1}>
          <p>예약 내역</p>
        </div>
        <div className={styles.font2}>총 {props.num}건의 예약이 있습니다.</div>
      </main>
    );
  }
}
