import React, { useState } from "react";
import styles from "./ChangeTime.module.scss";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { storeId, storeInfo } from "../../recoil/atom";

export default function ChangeTime() {
  const myStoreInfo = useRecoilValue(storeInfo);
  const [value1, setValue1] = useState(myStoreInfo.open);
  const [value2, setValue2] = useState(myStoreInfo.close);
  const myStoreId = useRecoilValue(storeId);
  const [info, setInfo] = useRecoilState(storeInfo);
  const myatk = sessionStorage.getItem("atk");
  function convertToTime(value: any) {
    const hours = Math.floor(value / 100);
    const minutes = value % 100;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }

  const convertTimeToNumber = (time: any) => {
    const [hours, minutes] = time.split(":");
    const timeNumber = parseInt(hours + minutes, 10);
    return timeNumber;
  };

  const handleInputChange1 = (event: any) => {
    const timeValue = event.target.value;
    const convertedValue = convertTimeToNumber(timeValue);
    setValue1(convertedValue);
  };

  const handleInputChange2 = (event: any) => {
    const timeValue = event.target.value;
    const convertedValue = convertTimeToNumber(timeValue);
    setValue2(convertedValue);
  };

  const applyChanges = () => {
    if (value1 >= 0 && value2 > 0 && value1 < value2) {
      axios
        .patch(
          `https://host 명/api/stores/${myStoreId}`,
          {
            storePhone: myStoreInfo.storePhone,
            info: myStoreInfo.info,
            open: value1,
            close: value2,
            image: myStoreInfo.image,
            profile: myStoreInfo.profile,
          },
          {
            headers: {
              Authorization: `bearer ${myatk}`,
            },
          }
        )
        .then(() => {
          setInfo({ ...info, open: value1, close: value2 });
          alert("영업시간이 변경되었습니다");
        });
    }
  };

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%]">
          <p className={styles.font1}>영업시간 설정</p>
        </div>
        <div className="w-[100%]">
          <div>
            시작시간 :{" "}
            <input
              type="time"
              onChange={handleInputChange1}
              defaultValue={convertToTime(myStoreInfo.open)}
            ></input>
          </div>
          <div>
            종료시간 :{" "}
            <input
              type="time"
              onChange={handleInputChange2}
              defaultValue={convertToTime(myStoreInfo.close)}
            ></input>
          </div>
        </div>
        <button
          className="w-[100%] bg-blue-500 hover:bg-blue-700 text-white"
          onClick={applyChanges}
        >
          저장
        </button>
      </div>
    </div>
  );
}
