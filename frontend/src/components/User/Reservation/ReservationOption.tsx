import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Timeselect from "./TImeSelect";
import Dayselect from "./DaySelect";
import OptionHeader from "./OptionHeader";
import ShopInfo from "./ShopInfo";
import OrderPage from "./OrderPage";
import {
  shopDataState,
  reservationTimeState,
  reservationDayState,
} from "../../../recoil/atom";
import { useRecoilState, useRecoilValue } from "recoil";

export default function ReservationOption() {
  const location = useLocation();
  const [reservationDay, setReservationDay] =
    useRecoilState(reservationDayState);
  const [reservationTime, setReservationTime] =
    useRecoilState(reservationTimeState);
  const [showPopup, setShowPopup] = useState(false);

  const shopData = useRecoilValue(shopDataState);

  const getDay = (x: string) => {
    setReservationDay(x);
  };
  const getTime = (x: string) => {
    setReservationTime(x);
  };
  const handleNextClick = () => {
    if (reservationDay === null || reservationTime === null) {
      setShowPopup(true);
    }
  };

  // console.log(reservationDay, "here");
  return (
    <div className="flex flex-col bg-user_beige">
      <OptionHeader />
      <div className="flex flex-col items-center pt-[3%]">
        <div className="w-[95%] mb-[10%] shadow-xl bg-white ">
          <ShopInfo shopData={shopData} />
          <Dayselect getDay={getDay} />
          <Timeselect getTime={getTime} />
        </div>
        <Link
          to="/reservationorder"
          state={{
            reservationDay: { reservationDay },
            reservationTime: { reservationTime },
          }}
        >
          <button className="w-[10rem] h-30 bg-user_green shadow-lg rounded-xl text-white font-nasq font-bold">
            다음단계
          </button>
        </Link>
      </div>
      {showPopup && (
        <div className="popup">
          <p className="popup-message">
            예약 날짜와 예약 시간을 확인한 후 다시 시도해주세요.
          </p>
          <button className="popup-close" onClick={() => setShowPopup(false)}>
            닫기
          </button>
        </div>
      )}
    </div>
  );
}
