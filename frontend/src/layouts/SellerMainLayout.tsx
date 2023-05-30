import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";
import Container from "../containers/Container";
import Header from "../components/Common/Header/SellerHeader";
import styles from "./SellerMainLayout.module.scss";
import Modal from "../components/Seller/SideMenu";
import { storeId } from "../recoil/atom";
import { useLocation } from "react-router-dom";

const SellerMainLayout = () => {
  const isLogin = useRecoilValue(storeId);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const handleUnload = () => {
      localStorage.removeItem("storeId");
    };
    window.addEventListener("beforeunload", handleUnload);
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const [showModal, setShowModal] = useState(false);

  const handleMenuClick = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLElement>) => {
    if (showModal && !(e.target as HTMLElement).closest(`.${styles.modal}`)) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (
      !isLogin &&
      location.pathname !== "/seller/login" &&
      location.pathname !== "/seller/proto"
    ) {
      alert("로그인이 필요한 서비스입니다.");
      navigate("/seller/login");
    }

    if (isLogin && location.pathname === "/seller/login") {
      navigate("/seller");
    }
  }, [isLogin, location, navigate]);

  return (
    <div className={styles.body} onMouseDown={handleMouseDown}>
      <Header handleMenuClick={handleMenuClick} />
      {showModal && (
        <div className={styles.bg}>
          <div className={styles.modal}>
            <Modal handleModalClose={handleModalClose} />
          </div>
        </div>
      )}
      <div className={styles.containers}>
        <Container>
          <Outlet />
        </Container>
      </div>
    </div>
  );
};

export default SellerMainLayout;
