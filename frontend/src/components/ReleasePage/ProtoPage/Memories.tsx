import React, { Component } from "react";
import Video1 from "../../../assets/ReleasePage/Video1.mp4";
import sellerpic from "../../../assets/flower_sample.jpg";
import ErrorImg from "../../../assets/ReleasePage/imageError.png";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Memories(props: any) {
  const { letterData } = props; // 구조 분해 할당으로 letterData에 접근

  if (!letterData) {
    return null; // letterData가 없을 경우 컴포넌트를 렌더링하지 않음
  }

  const handleImageError = (e: any) => {
    e.target.onerror = null;
    e.target.src = ErrorImg;
  };

  return (
    <div className="mb-[30%]">
      {/* <div className="mb-[25%] flex justify-center">
        <img src={sellerpic} alt="s" />
      </div> */}

      <div className="h-[10rem] flex flex-col mt-[25%] ml-5 pl-2 pr-2 mb-[20%]">
        <p className="text-[3rem] text-[#8D8E90] font-namyeong">Memories</p>
        <p className="text-[2rem] font-namyeong">추억</p>
        <p className="text-[0.8rem] text-[#82877C] font-namyeong pt-2">
          소중한 사람이 꽃과 함께 업로드한 추억들입니다.
        </p>
      </div>

      {/* 사용자 input 사진 왼쪽 오른쪽 정렬 */}
      {letterData.pictures &&
        letterData.pictures.map((picture: any, index: any) => (
          <div
            key={index}
            className={`pb-[10%] overflow-hidden ${
              letterData.pictures.length === 1
                ? "flex justify-center items-center"
                : index % 2 === 0
                ? "w-[90%] mr-auto"
                : "w-[90%] ml-auto"
            }`}
          >
            <img src={picture} alt="couple" onError={(e) => handleImageError} />
          </div>
        ))}
      {letterData.video && (
        <div>
          <video src={letterData.video} className="w-[100%]" controls />
        </div>
      )}
    </div>
  );
}
