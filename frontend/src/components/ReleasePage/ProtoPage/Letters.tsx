import React, { useState, useEffect, useRef } from "react";
import letterClose from "../../../assets/ReleasePage/letter_close.png";
import ReleaseLetterPreviewModal from "../Writing/ReleaseLetterPreviewModal";
import ReleaseLetterPreview from "../Writing/ReleaseLetterPreview";

export default function Letters(props: any) {
  // const nickname = "창근";

  const { letterData } = props; // 구조 분해 할당으로 letterData에 접근

  if (!letterData) {
    return null; // letterData가 없을 경우 컴포넌트를 렌더링하지 않음
  }

  return (
    <div className=" flex flex-col mt-[15%] mb-[15%]">
      <div className="h-[10rem] flex flex-col mt-[10%] ml-5 pl-2 pr-2">
        <p className="text-[3rem] text-[#8D8E90] font-namyeong">Letter</p>
        <p className="text-[2rem] font-namyeong">편지</p>
        <p className="text-[0.8rem] text-[#82877C] font-namyeong pt-2">
          소중한 사람이 선물한 꽃다발과 편지입니다.
        </p>
      </div>
      {/* <ReleaseLetterPreview /> */}
    </div>
  );
}
