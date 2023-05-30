import React from "react";
import ManagePrint from "../../../components/Seller/ManagePrint";
import MainAnalyzing from "../../../components/Seller/MainAnalyzing";
import WaitingApprove from "../../../components/Seller/WaitingApprove";
import styles from "./SellerMainPage.module.scss";
import "../../../assets/styles/variable.scss";
import { useRecoilValue } from "recoil";
import { storeName } from "../../../recoil/atom";
import axios from "axios";

export default function SellerMainPage() {
  const name = useRecoilValue(storeName);
  return (
    <div>
      <div className={styles.hello}>{name} 사장님 반갑습니다.</div>
      <WaitingApprove />
      <ManagePrint />
      <MainAnalyzing />
    </div>
  );
}
