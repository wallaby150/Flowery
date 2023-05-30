import React, { useState, useEffect, useRef } from "react";
import ReleaseLetterPreview from "./ReleaseLetterPreview";
import { useRecoilValue } from "recoil";
import { cardName } from "../../../recoil/atom";

export default function ReleaseLetters() {
  const name = useRecoilValue<string>(cardName);
  
  return (
    <div className=" flex flex-col mt-[15%] mb-[15%]">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5 pl-2 pr-2">
        <p className="text-[3rem] text-[#8D8E90] font-namyeong">Letter</p>
        <p className="text-[2rem] font-namyeong">편지</p>
        <p className="text-[0.8rem] text-[#82877C] font-namyeong pt-2">
          {name}님이 선물한 편지입니다.
        </p>
      </div>
      <ReleaseLetterPreview />
    </div>
  );
}
