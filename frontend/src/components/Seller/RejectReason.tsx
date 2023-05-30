import React, { useState } from "react";
import styles from "./RejectReason.module.scss";

type RejectReasonProps = {
  onReasonChange: (newReason: string) => void;
};

export default function RejectReason(props: RejectReasonProps) {
  const [reason, setReason] = useState<string>("");

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newReason = event.target.value;
    setReason(newReason);
    props.onReasonChange(newReason);
  };

  return (
    <div className={styles.stepone}>
      <p>거절 사유를 선택해주세요</p>
      <div className="max-w-lg mx-auto mt-8">
        <fieldset>
          <div className="flex items-center mb-4">
            <label
              htmlFor="country-option-1"
              className="inline-flex items-center"
            >
              <input
                id="country-option-1"
                type="radio"
                name="countries"
                value="재고 소진"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                aria-labelledby="country-option-1"
                aria-describedby="country-option-1"
                defaultChecked
                onChange={handleRadioChange}
              />
              <span className="text-sm font-medium text-gray-900 ml-2 block">
                재고 소진
              </span>
            </label>
          </div>

          <div className="flex items-center mb-4">
            <label
              htmlFor="country-option-2"
              className="inline-flex items-center"
            >
              <input
                id="country-option-2"
                type="radio"
                name="countries"
                value="매장 사정"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                aria-labelledby="country-option-2"
                aria-describedby="country-option-2"
                onChange={handleRadioChange}
              />
              <span className="text-sm font-medium text-gray-900 ml-2 block">
                매장 사정
              </span>
            </label>
          </div>

          <div className="flex items-center mb-4">
            <label
              htmlFor="country-option-3"
              className="inline-flex items-center"
            >
              <input
                id="country-option-3"
                type="radio"
                name="countries"
                value="기타"
                className="h-4 w-4 border-gray-300 focus:ring-2 focus:ring-blue-300"
                aria-labelledby="country-option-3"
                aria-describedby="country-option-3"
                onChange={handleRadioChange}
              />
              <span className="text-sm font-medium text-gray-900 ml-2 block">
                기타
              </span>
            </label>
          </div>

          <div className="flex items-center">
            <label
              htmlFor="option-disabled"
              className="inline-flex items-center"
            ></label>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
