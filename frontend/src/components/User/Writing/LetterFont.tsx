import React, { useState, useEffect, useRef } from "react";
import styles from "./LetterFont.module.scss";
import { useRecoilState } from "recoil";
import { letterFontState } from "../../../recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LetterFont() {
  const [letterFont, setLetterFont] = useRecoilState<number>(letterFontState);
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleFontsCount = 4;

  // 글씨체 종류
  const letterFonts: string[] = [
    "김정철명조",
    "조선100년체",
    "가나초콜릿체",
    "스위트체",
    "거친둘기마요",
    "함박눈체",
  ];

  const settings = {
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: false,
    pauseOnHover: true,
    draggable: true,
  };

  return (
    <div className="flex justify-center">
      {/* 글씨체 고르기 */}
      <div className="flex justify-between p-2 ">
        {/* 왼쪽 화살표 */}
        {/* {startIndex !== 0 ? (
          <input
            type="button"
            value="&lt;"
            onClick={() => setStartIndex(startIndex - 1)}
            className="cursor-pointer"
          ></input>
        ) : (
          <div></div>
        )} */}
        {/* 글씨체 목록 */}
        <Slider {...settings} className="w-[300px] justify-center flex">
          {letterFonts.map((font: string, i: number) => (
            <div
              key={i}
              onClick={() => {
                setLetterFont(startIndex + i + 1);
              }}
              className="p-1 text-center text-sm md:text-base align-middle justify-center"
            >
              <div
                className={`cursor-pointer ${
                  styles[`letterFont${startIndex + i + 1}`]
                } `}
              >
                {font}
              </div>
            </div>
          ))}
        </Slider>
        {/* 오른쪽 화살표 */}
        {/* {startIndex + visibleFontsCount < letterFonts.length ? (
          <input
            type="button"
            value="&gt;"
            onClick={() => setStartIndex(startIndex + 1)}
            className="cursor-pointer"
          ></input>
        ) : (
          <div></div>
        )} */}
      </div>
    </div>
  );
}
