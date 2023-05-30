import React, { useState, useEffect, useRef } from "react";
import Flower from "../../../assets/ReleasePage/carnation.jpg";
import styles from "./ReleaseLetterPreview.module.scss";
import { useRecoilState } from "recoil";
import {
  totalTextState,
  letterPaperState,
  letterFontState,
} from "../../../recoil/atom";

export default function ReleaseLetterPreview() {
  const [letterContent, setLetterContent] =
    useRecoilState<string>(totalTextState);
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [letterFont, setLetterFont] = useRecoilState<number>(letterFontState);

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
      {/* <img
        src={Flower}
        alt=""
        className="items-center justify-center p-2 mx-auto"
      /> */}
      <div className={`h-full ${styles[`letterPaper${letterPaper}`]}`}>
        {currentLetter()}
      </div>
    </div>
  );
}
