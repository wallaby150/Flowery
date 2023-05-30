import React from "react";
import SalesList from "../../../components/Seller/SalesList";
import DoughNutList from "../../../components/Seller/DoughNutList";
import SellAmount from "../../../components/Seller/SellAmount";
export default function SellerAnalyzePage() {
  return (
    <div>
      <SellAmount />
      <SalesList />
      <DoughNutList />
    </div>
  );
}
