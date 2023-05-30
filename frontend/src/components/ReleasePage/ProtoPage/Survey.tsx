import React from "react";
import surveyicon from "../../../assets/ReleasePage/survey_icon.png";
import { Link } from "react-router-dom";

export default function Survey() {
  return (
    <div className="h-[10rem] flex flex-col mt-[10%] ml-5 mb-[30%] pl-2 pr-2">
      <p className="text-[3rem] text-[#8D8E90] font-namyeong">Survey</p>
      <p className="text-[2rem] font-namyeong">설문조사</p>
      <p className="text-[0.9rem] text-[#82877C] font-namyeong pt-2 mb-4">
        좀 더 나은 서비스를 위해 설문조사에 참여해 주세요
      </p>
      <Link
        to="https://docs.google.com/forms/d/12A10S-J8Xq3Nyt7fJMSRkFrnHIkubND_9_aRqYtjVvE/edit"
        className="flex justify-center mt-[20%]"
      >
        <img src={surveyicon} className="w-1/4 " />
      </Link>
    </div>
  );
}
