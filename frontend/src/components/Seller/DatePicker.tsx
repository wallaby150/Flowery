import React, { useEffect, useRef } from "react";
import Litepicker from "litepicker";
import styles from "./DatePicker.module.scss";
const DatePicker = () => {
  const datepickerRef = useRef(null);

  useEffect(() => {
    if (datepickerRef.current) {
      const picker = new Litepicker({
        element: datepickerRef.current,
        singleMode: false,
        maxDate: new Date(),
        minDate: "2020-01-01",
        tooltipText: {
          one: "night",
          other: "nights",
        },
        tooltipNumber: (totalDays) => {
          return totalDays - 1;
        },
      });

      return () => {
        picker.destroy();
      };
    }
  }, [datepickerRef]);

  return (
    <div className={styles.picker}>
      <input
        ref={datepickerRef}
        type="text"
        id="datepicker"
        placeholder="기간을 설정해주세요"
        className="border-b"
      />
    </div>
  );
};

export default DatePicker;
