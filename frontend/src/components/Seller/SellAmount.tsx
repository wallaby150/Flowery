import React, { useState, useEffect } from "react";
import styles from "./SellAmount.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";

export default function SellAmount() {
  const myStoreId = useRecoilValue(storeId);
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // 월은 0부터 시작하므로 1을 더해줍니다.
  const [money, setMoney] = useState<number>(0);
  // 월을 두 자리로 만들기 위해 1자리 수인 경우 앞에 0을 추가합니다.
  const formattedMonth = month < 10 ? `0${month}` : month;

  const formattedDate = `${year}-${formattedMonth}-01T00:00:00`;
  const [startDate, setStartDate] = useState(formattedDate);
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0] + "T00:00:00"
  );

  useEffect(() => {
    axios
      .get(
        `https://host 명/api/sales/total?storeId=${myStoreId}&startDate=${startDate}&endDate=${endDate}`
      )
      .then((res) => {
        setMoney(res.data);
      });
  });
  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%]">
          <p className={styles.font2}>{startDate.slice(0, 7)} 판매 금액</p>
          <p className={styles.font1}>{money}원</p>
        </div>
      </div>
    </div>
  );
}
