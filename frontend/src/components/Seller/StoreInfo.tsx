import React, { useState, useEffect } from "react";
import styles from "./StoreInfo.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";
import InputForm from "../Common/InputForm";
import DisableInputForm from "../Common/DisableInputForm";

export default function StoreInfo() {
  const myStoreId = useRecoilValue(storeId);
  const myStoreInfo = useRecoilValue(storeInfo);
  const [myPhone, setMyPhone] = useState<string>(myStoreInfo.storePhone);
  const [mygreet, setMyGreet] = useState<string>(myStoreInfo.info);
  const [info, setInfo] = useRecoilState(storeInfo);
  const myatk = sessionStorage.getItem("atk");
  function handleClick() {
    axios
      .patch(
        `https://host 명/api/stores/${myStoreId}`,
        {
          storePhone: myPhone,
          info: mygreet,
          open: myStoreInfo.open,
          close: myStoreInfo.close,
          image: myStoreInfo.image,
        },
        {
          headers: {
            Authorization: `bearer ${myatk}`,
          },
        }
      )
      .then(() => {
        setInfo({ ...info, storePhone: myPhone, info: mygreet });
        alert("매장 정보 변경이 완료되었습니다");
      })
      .catch((err) => {
        alert("잘못된 입력입니다.");
      });
  }

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className=" w-[100%]">
          <p className={styles.font1}>매장 정보</p>
          <p className={styles.hint}>
            상호명, 주소 변경은 플라워리로 연락바랍니다.
          </p>
        </div>
        <div className="w-[100%]">
          <DisableInputForm
            label="상호명"
            value={myStoreInfo.storeName}
            type="text"
          />
          <DisableInputForm
            label="매장 주소"
            value={myStoreInfo.address}
            type="text"
          />
          <InputForm
            label="전화번호"
            placeholder="ex) 010-1234-1234"
            value={myPhone}
            onChange={(e) => setMyPhone(e.target.value)}
            type="text"
          />
          <InputForm
            label="한 줄 소개"
            placeholder="한 줄 소개를 입력해주세요. (100자이내)"
            value={mygreet}
            onChange={(e) => setMyGreet(e.target.value)}
            type="text"
          />
        </div>
        <button
          className="w-[100%] bg-blue-500 hover:bg-blue-700 text-white"
          onClick={handleClick}
        >
          저장
        </button>
      </div>
    </div>
  );
}
