import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
// import layout from "../../../assets/UserMain/flower_layout.png";
import howto from "../../../assets/UserMain/howto.jpg";
import store from "../../../assets/UserMain/shop_select.png";
import reservation from "../../../assets/UserMain/t_d_select.png";
import product from "../../../assets/UserMain/product_select.png";
import card_input from "../../../assets/UserMain/card_input.png";
import file_input from "../../../assets/UserMain/file_input.png";
import letter_input from "../../../assets/UserMain/letter_input.png";
import final from "../../../assets/UserMain/final.png";

export default function HowTo() {
  AOS.init();
  return (
    <div className="w-[100%] flex justify-center overflow-hidden">
      <div className="flex flex-col w-[90%]">
        <div
          data-aos="zoom-in"
          data-aos-delay="200"
          className="h-[80vh] mt-[10%] bg-white m-4 flex justify-center"
        >
          {/* feedback 노란색이미지가 배경과 어울리지 않는다는 의견 고칠것 */}
          <img src={howto} alt="howto" className="w-full h-full" />
          <p className="absolute bottom-[25%] text-[2.4rem] text-white font-nasq font-bold">
            How To Use
          </p>
          <p className="absolute bottom-[10%] text-[3.6rem] text-user_pink font-ballet ">
            Flowery
          </p>
        </div>
        <div
          id="how to section"
          className="flex flex-col w-[100%] gap-10 pt-[10%] h-[fit-content]"
        >
          <div className="h-[60vh] flex justify-start items-center overflow-x-hidden">
            <img
              data-aos="fade-right"
              src={store}
              alt="sf"
              className="w-[50%] ml-[5%]"
            />
            <div
              data-aos="fade-left"
              className="flex flex-col pl-2 mr-[0%] items-center overflow-x-hidden"
            >
              <p className="font-nasq font-bold">예약할 가게를</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">선택</span>
                합니다
              </p>
            </div>
          </div>
          <div className="h-[60vh] flex justify-end items-center overflow-x-hidden">
            <div
              data-aos="fade-right"
              className="flex flex-col pr-4 ml-[0%] items-center overflow-hidden"
            >
              <p className="font-nasq font-bold">시간과 날짜를</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">선택</span>
                합니다
              </p>
            </div>
            <img
              data-aos="fade-left"
              src={reservation}
              alt="sf"
              className="w-[50%] mr-[5%]"
            />
          </div>
          <div className="h-[60vh] flex justify-start items-center overflow-x-hidden">
            <img
              data-aos="fade-right"
              src={product}
              alt="sf"
              className="w-[50%] ml-[0%]"
            />
            <div
              data-aos="fade-left"
              className="flex flex-col mr-[0%] pl-4 items-center overflow-hidden"
            >
              <p className="font-nasq font-bold">예약할 상품을</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">선택</span>
                합니다
              </p>
            </div>
          </div>
          <div className="h-[60vh] flex justify-end items-center overflow-x-hidden">
            <div
              data-aos="fade-right"
              className="flex flex-col ml-[0%] items-center overflow-hidden pr-5"
            >
              <p className="font-nasq font-bold text-[0.8rem]">
                카드에 표시될 코멘트를
              </p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">작성</span>
                합니다
              </p>
            </div>
            <img
              data-aos="fade-left"
              src={card_input}
              alt="sf"
              className="w-[50%] mr-[5%]"
            />
          </div>
          <div className="h-[60vh] flex justify-start items-center overflow-x-hidden">
            <img
              data-aos="fade-right"
              src={letter_input}
              alt="sf"
              className="w-[50%] ml-[0%]"
            />
            <div
              data-aos="fade-left"
              className="flex flex-col mr-[0%] pl-5 items-center overflow-hidden"
            >
              <p className="font-nasq font-bold">편지를</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">작성</span>
                합니다
              </p>
            </div>
          </div>
          <div className="h-[60vh] flex justify-end items-center overflow-x-hidden">
            <div
              data-aos="fade-right"
              className="flex flex-col ml-[0%] pr-5 items-center overflow-hidden"
            >
              <p className="font-nasq font-bold">사진과 동영상을</p>
              <p className="font-nasq font-bold">
                <span className="text-[3rem] text-user_pink">첨부</span>
                합니다
              </p>
            </div>
            <img
              data-aos="fade-left"
              src={file_input}
              alt="sf"
              className="w-[50%] mr-[5%]"
            />
          </div>
        </div>
        <div data-aos="flip-right" className="pt-[10%]">
          <img src={final} alt="sad" />
        </div>
        <div className="flex flex-col justify-center pt-[10%]">
          <p className="font-nasq font-bold text-center">
            예약한 가게에서
            <span className="text-[3rem] text-user_pink">꽃다발</span>과
          </p>
          <p className="text-center font-nasq font-bold">
            준비한 <span className="text-[3rem] text-user_pink">카드</span>를
            받으면 끝!
          </p>
        </div>
        <Link to="/reservation">
          <div className="flex justify-center pt-[10%]">
            <button className="w-[10rem] h-30 bg-user_pink shadow-lg rounded-xl text-white font-nasq font-bold">
              예약하기
            </button>
          </div>
        </Link>
      </div>
    </div>
  );
}
