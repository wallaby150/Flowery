import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { letterPaperState } from "../../../recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LetterPaper() {
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleFontsCount = 3;

  // 편지지 종류 갯수
  const letterPapers: number[] = [];
  for (let i = 1; i <= 5; i++) {
    letterPapers.push(i);
  }

  const settings = {
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    dots: false,
    pauseOnHover: true,
    draggable: true,
  };

  return (
    <div className="flex justify-center border-t h-[150px]">
      {/* 글씨체 고르기 */}
      <div className="flex justify-center items-center p-2 ">
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
        <Slider
          {...settings}
          className="w-[300px] "
        >
          {letterPapers.map((i: number) => (
            <div key={i} className="flex">
              <img
                src={require(`../../../assets/letters/Letter${i}.png`)}
                onClick={() => setLetterPaper(i)}
                className="w-[100px] p-2 cursor-pointer mx-auto justify-center items-center"
              />
            </div>
          ))}
        </Slider>

        {/* 오른쪽 화살표 */}
        {/* {startIndex + visibleFontsCount < letterPapers.length ? (
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
