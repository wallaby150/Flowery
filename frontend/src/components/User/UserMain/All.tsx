import React from "react";
import { tabState } from "../../../recoil/atom";
import { useRecoilState } from "recoil";
import { Link } from "react-router-dom";
import card1 from "../../../assets/UserMain/introcard_res.jpg";
import card2 from "../../../assets/UserMain/howto_res.jpg";
import card3 from "../../../assets/UserMain/ai_res.jpg";

export default function All() {
  const [tab, setTab] = useRecoilState(tabState);

  return (
    <div id="card" className="flex flex-col items-center pt-[10%] gap-5">
      <div className="h-[300px] w-[85%] flex justify-center items-center overflow-hidden border-b rounded-2xl">
        <Link to="/reservation">
          <div className="w-full h-full relative">
            <img src={card1} alt="card1" className="w-full " />
            <div className="absolute inset-0 bg-gradient-to-t opacity-[.8] from-[#90C1B0] to-transparent"></div>
            <p className="absolute bottom-10 right-0 p-3 text-[2rem] font-namyeong text-white">
              예약
            </p>
            <p className="absolute bottom-7 right-0 p-3 text-[0.5rem] font-namyeong text-white">
              flowery 서비스를 제공하는 근처 가게 예약
            </p>
          </div>
        </Link>
      </div>
      <div
        onClick={() => {
          setTab("howto");
          window.scrollTo(0, 0);
        }}
        className="h-[300px] w-[85%] flex justify-center items-center overflow-hidden border-b rounded-2xl"
      >
        <div className="w-full h-full relative">
          <img src={card2} alt="card1" className="w-full " />
          <div className="absolute inset-0 bg-gradient-to-t opacity-[.8] from-[#FFD9DC] to-transparent"></div>
          <p className="absolute bottom-10 right-0 p-3 text-[2rem] font-namyeong text-white">
            가이드
          </p>
          <p className="absolute bottom-7 right-0 p-3 text-[0.5rem] font-namyeong text-white">
            flowery 서비스를 이용하는 방법
          </p>
        </div>
      </div>
      <div
        onClick={() => {
          setTab("try");
          window.scrollTo(0, 0);
        }}
        className="h-[300px] w-[85%] flex justify-center items-center overflow-hidden border-b rounded-2xl"
      >
        <div className="w-full h-full relative">
          <img src={card3} alt="card1" className="w-full " />
          <div className="absolute inset-0 bg-gradient-to-t opacity-[.8]     from-[#C9C0EC] to-transparent"></div>
          <p className="absolute bottom-10 right-0 p-3 text-[2rem] font-namyeong text-white">
            AI 객체인식
          </p>
          <p className="absolute bottom-7 right-0 p-3 text-[0.5rem] font-namyeong text-white">
            flowery 서비스에서 제공하는 기술을 체험
          </p>
        </div>
      </div>
    </div>
  );
}
