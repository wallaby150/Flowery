import React from "react";
import styles from "./SideMenu.module.scss";
import reserve from "../../assets/reserve_logo.png";
import analysis from "../../assets/analysis_logo.png";
import manage from "../../assets/manage_logo.png";
import logout from "../../assets/logout_logo.png";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { storeId } from "../../recoil/atom"; // recoil storeId atom
interface ModalProps {
  handleModalClose: () => void;
}

export default function Modal(props: ModalProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [myStoreId, setStoreId] = useRecoilState(storeId);
  const navigate = useNavigate();
  function handleNavigate() {
    setStoreId(0);
    navigate("/seller/login");
  }
  function handleBook() {
    navigate("/seller/book");
  }

  function handleManage() {
    navigate("/seller/manage");
  }

  function handleAnalyze() {
    navigate("/seller/analyze");
  }

  return (
    <div className={styles.bg} onClick={props.handleModalClose}>
      <div className={styles.menuItem} onClick={handleBook}>
        <img src={reserve} alt="" width="16"></img> <span>예약관리</span>
      </div>
      <div className={styles.menuItem} onClick={handleAnalyze}>
        <img src={analysis} alt="" width="16"></img> <span>판매분석</span>
      </div>
      <div className={styles.menuItem} onClick={handleManage}>
        <img src={manage} alt="" width="16"></img> <span>매장관리</span>
      </div>
      <hr />
      <div className={styles.menuItem} onClick={handleNavigate}>
        <img src={logout} alt="" width="16"></img> <span>로그아웃</span>
      </div>
    </div>
  );
}
