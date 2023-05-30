import React from "react";
import btn from "../../assets/ReleasePage/button.png";
import { Link } from "react-router-dom";
import card from "../../assets/ReleasePage/card.png";
import qr from "../../assets/ReleasePage/qr_example.png";

export default function ReleaseIntro() {
  return (
    <div className="bg-[#FEF7F1] relative">
      <img
        src={card}
        alt="card"
        className="h-screen animate-fadeOut animation-delay-2000"
      />
      <p className="absolute text-[#FEF7F1] top-[30%] left-[15%] animate-fadeIn animation-delay-4000">
        qr을 눌러 사진과 편지를 확인하세요!
      </p>
      <Link to="/userproto">
        <img
          src={qr}
          alt="qr"
          className="absolute top-1/4 left-[35%] w-[7rem] animate-slider animation-delay-4000"
        />
      </Link>
      {/* <Link to="/releasecategory" className="flex justify-center">
        <img src={btn} alt="btn" className="w-[33%]" />
      </Link> */}
    </div>
  );
}
