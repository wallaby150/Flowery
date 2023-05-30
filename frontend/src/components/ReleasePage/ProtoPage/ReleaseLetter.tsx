import React, { useState, useEffect, useRef } from "react";
import Flower from "../../../assets/ReleasePage/flower_release.jpg";
import styles from "./ReleaseLetter.module.scss";
import { useRecoilState } from "recoil";
import {
  totalTextState,
  letterPaperState,
  letterFontState,
} from "../../../recoil/atom";

export default function ReleaseLetter(props: any) {
  const { letterData } = props; // 구조 분해 할당으로 letterData에 접근

  if (!letterData) {
    return null; // letterData가 없을 경우 컴포넌트를 렌더링하지 않음
  }
  const letterContent = letterData.message;
  const letterPaper = letterData.papers;
  const letterFont = letterData.font;

  // 편지 내용
  const currentLetter = () => {
    return (
      <textarea
        disabled
        value={letterContent}
        className={`${styles[`letterContent${letterPaper}`]} ${
          styles[`letterFont${letterFont}`]
        }`}
      ></textarea>
    );
  };

  return (
    // 전체 페이지
    <div className="">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5">
        <p className="text-[3rem] text-[#8D8E90] font-namyeong">Letter</p>
        <p className="text-[2rem] font-namyeong">편지</p>
        <p className="text-[1rem] text-[#82877C] font-namyeong pt-2">
          소중한 사람이 선물한 꽃다발과 편지입니다.
        </p>
      </div>
      <img
        src={props.flowerData}
        alt=""
        className="items-center justify-center p-10 pb-2 mx-auto"
      />
      {letterData.message && (
        <div className={`h-full ${styles[`letterPaper${letterPaper}`]}`}>
          {currentLetter()}
        </div>
      )}
    </div>
  );
}
