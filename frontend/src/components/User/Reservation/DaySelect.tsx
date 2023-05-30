import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from "date-fns/esm/locale";
import "./DaySelect.modules.scss";
import moment from "moment";

type DayselectProps = {
  getDay: (x: string) => void;
};

export default function Dayselect({ getDay }: DayselectProps) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleDateChange = (date: any) => {
    if (date && date <= maxDate) {
      const formattedDate = date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      setSelectedDate(date);
      getDay(formattedDate);
      setShowPopup(false);
    } else {
      setShowPopup(true);
    }
  };
  const today = moment();
  const maxDate = moment(today).add(14, "days").toDate();

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };
  return (
    <>
      <div className="flex flex-col items-center justify-center pb-[1%]">
        <p className="font-nasq pt-[10%] font-bold text-center text-[1.3rem] text-user_green pb-[10%]">
          예약 일자 선택
        </p>
        <DatePicker
          selected={selectedDate}
          shouldCloseOnSelect={false}
          onChange={handleDateChange}
          minDate={today.add(1, "days").toDate()}
          maxDate={maxDate}
          locale={ko}
          dateFormat="yyyy-MM-dd"
          inline
          className="DaySelect.modules.scss"
        />
      </div>
      <p className="font-namyeong font-bold text-center text-[0.5rem] text-[gray] pb-[10%]">
        ※ 예약은 오늘 기준 다음날부터 2주 후까지 가능합니다
      </p>
    </>
  );
}
