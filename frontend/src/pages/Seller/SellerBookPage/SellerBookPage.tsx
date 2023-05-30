import React from "react";
import ManagePrint from "../../../components/Seller/ManagePrint";
import WaitingApprove from "../../../components/Seller/WaitingApprove";
import "../../../assets/styles/variable.scss";

export default function SellerBookPage() {
  return (
    <div>
      <WaitingApprove />
      <ManagePrint />
    </div>
  );
}
