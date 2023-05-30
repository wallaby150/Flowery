import React, { useState } from "react";
import styles from "./SellerHeader.module.scss";
import Logo from "../../../assets/Seller_logo.png";
import scan from "../../../assets/scan_logo.png";
import menu from "../../../assets/menu_logo.png";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import NotSale from "../../Seller/NotSale";
interface HeaderProps {
  handleMenuClick: () => void;
}

export default function Header(props: HeaderProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [showModal33, setShowModal33] = useState(false);
  function handleModal33() {
    setShowModal33(true); // 모달을 열기 위해 상태를 true로 변경합니다.
  }

  function closeModal33() {
    setShowModal33(false); // 모달을 닫기 위해 상태를 false로 변경합니다.
  }
  function handlenavigate() {
    navigate("/seller");
  }
  if (location.pathname === "/seller/login") {
    return (
      <header className={styles.header}>
        <div>
          <img src={Logo} alt="" className={styles.logo} />
        </div>
      </header>
    );
  } else if (location.pathname === "/seller/proto") {
    return (
      <header className={styles.header}>
        <img src={Logo} alt="" className={styles.logo} />
      </header>
    );
  }

  function openmodal() {
    handleModal33();
  }
  return (
    <header className={styles.header}>
      <div>
        <img
          src={Logo}
          alt=""
          onClick={handlenavigate}
          className={styles.logo}
        />
      </div>
      <div>
        <img src={scan} alt="" className={styles.scan} onClick={openmodal} />
        <img
          src={menu}
          alt=""
          className={styles.menu}
          onClick={props.handleMenuClick}
        />
      </div>
      {showModal33 && <NotSale closeModal33={closeModal33} />}
    </header>
  );
}
