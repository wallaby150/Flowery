import React, { useEffect } from "react";
import ManagePrint from "../../../components/Seller/ManagePrintProto";
import { useRecoilState } from "recoil";
import { storeId } from "../../../recoil/atom";

export default function SellerMainPage() {
  const [myStoreId, setStoreId] = useRecoilState<number>(storeId);
  useEffect(() => {
    setStoreId(4);
  });
  return (
    <div>
      <ManagePrint />
    </div>
  );
}
