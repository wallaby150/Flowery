import React, { useState } from "react";
import styles from "./More.module.scss";
import flowerSrc from "../../../assets/ReleasePage/flowerSrc.png";
import cardSrc1 from "../../../assets/ReleasePage/cardSrc1.jpg";
import icon from "../../../assets/UserMain/card_icon.png";
import arrow from "../../../assets/UserMain/arrow_up.png";

export default function More(props: any) {
  const { letterData } = props;
  const [activeWord, setActiveWord] = useState();
  const [flowerName, setFlowerName] = useState<string | undefined>(() => {
    if (letterData && Object.keys(letterData.flowerAndMeaning).length > 0) {
      return Object.keys(letterData.flowerAndMeaning)[0];
    }
    return undefined;
  });

  if (!letterData) {
    return null;
  }
  const flowerMean = letterData.flowerAndMeaning[`${flowerName}`][0];
  const result = letterData.flowerAndMeaning;

  const handleWordClick = (word: any) => {
    setActiveWord(word);
  };

  console.log(letterData);

  return (
    <div className=" flex flex-col pb-[5%] mt-[30%]">
      <div className="h-[10rem] flex flex-col  ml-5  pl-2 pr-2">
        <p className="text-[3rem] text-[#8D8E90] font-namyeong">More</p>
        <p className="text-[2rem] font-namyeong">더 보기</p>
        <p className="text-[0.8rem] w-[90%] text-[#82877C] font-namyeong pt-2 mb-4">
          선물 받으신 꽃다발의 종류와 꽃말, 또 그 꽃말을 이용한 컨텐츠 입니다.
        </p>
      </div>
      <div className="pt-[30%] flex justify-center font-nasq font-bold">
        {result ? (
          <div>
            <div className="flex flex-col text-center">
              <p>선물 받으신 꽃다발의 ai 객체 인식 결과</p>
              <p>해당 꽃다발은 다음과 같은 꽃들로 구성되어있습니다</p>
              <div className="flex flex-col pt-[5%] justify-center items-center p-5">
                <p className="text-[gray] text-[0.7rem] pt-[10%] pb-[5%]">
                  꽃 이름을 클릭하고 꽃말을 확인해보세요!
                </p>
                <img src={arrow} alt="" className="animate-bounce  w-[10%]" />
              </div>
              <div className="flex flex-wrap justify-center pt-[5%] gap-1 pb-[5%]">
                {Object.entries(result).map(([flower]) => (
                  <div className=" ">
                    <div
                      key={flower}
                      onClick={() => handleWordClick(`${flower}`)}
                      className={`${
                        activeWord === flower
                          ? "bg-user_green text-white"
                          : " text-user_green bg-white"
                      } w-full font-nasq font-bold  rounded-lg shadow-md text-[1.5rem] p-2`}
                    >
                      "{flower}"
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
      <div>
        {result ? (
          <div className="flex justify-center items-center">
            {Object.entries(result).map(([flower, mean]) => {
              if (activeWord === flower) {
                return (
                  <div className="flex flex-col gap-2 w-[80%]" key={flower}>
                    {Array.isArray(mean)
                      ? mean.map((item: string) => (
                          <div
                            className="flex items-center justify-center w-full h-[4rem] text-center rounded-md bg-user_beige shadow-lg"
                            key={item}
                          >
                            <div className=" w-[10%]">
                              <img
                                src={icon}
                                alt="icon"
                                className="w-full h-full"
                              />
                            </div>
                            <p className="font-nasq font-bold">{item}</p>
                          </div>
                        ))
                      : null}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ) : null}
      </div>
      <p className="text-[1rem] text-center pt-[20%] pl-2 pr-2 text-user_black font-nasq font-bold  pb-4">
        선물 받은 꽃다발 중 "
        <span className="text-user_pink">{flowerName}</span>" 꽃의 꽃말과 관련
        정보들입니다.
      </p>
      <p className="text-[0.8rem] pl-7 w-[90%] text-[#82877C] font-namyeong pt-2 mb-4">
        ※ 카드에 생성되는 시는 선물받은 꽃의 꽃말을 이용해 ai가 작성한 시입니다.
        시 생성 내용의 정확도와 영화 대사 추출 등 더 나은 서비스는 추후 개발
        예정에 있습니다.
      </p>
      <div className=""></div>
      <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center">
            <div
              className={`h-[200px] absolute w-[85%] flex flex-col justify-center items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl`}
            >
              <span className=" font-namyeong text-[2rem] font-bold text-[#322209]">
                꽃말
              </span>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center pb-4">
            <div className="h-[200px] w-[85%] flex justify-center items-center bg-[#DEBFA1] drop-shadow border-b m-2 rounded-2xl">
              <img
                src={flowerSrc}
                alt="flowersrc"
                className="absoulute h-[95%] pr-3 "
              />
              <div className="h-[80%] border-r border-[#322209] border-r-[3px]"></div>
              <p className="text-[1.5rem]  font-namyeong font-bold pl-4 pr-3 text-[#322209] break-words">
                {flowerMean}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["card"]}>
        <div className={styles["card-front"]}>
          <div className="flex justify-center ">
            <div className="h-[200px] absolute w-[85%]  flex justify-center items-center bg-[#AEBAA3] drop-shadow border-b rounded-2xl">
              <p className="font-namyeong text-[3rem] font-bold text-[#322209]">
                시
              </p>
            </div>
          </div>
        </div>
        <div className={styles["card-back"]}>
          <div className="flex justify-center ">
            <div className="h-[fit-content] min-h-[200px] w-[85%] flex justify-center items-center bg-[#AEBAA3] drop-shadow border-b rounded-2xl">
              <p className=" p-2 overflow-hidden whitespace-pre font-namyeong font-bold text-[#322209]">
                {letterData.poem}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* <div className={styles["card"]}>
        <div className={styles["card-front"]}>
        <div className="flex justify-center">
        <div className="h-[200px] w-[85%] absolute flex justify-center items-center bg-[#CECDC4] drop-shadow border-b m-4 rounded-2xl">
        <p className="font-namyeong text-[3rem] font-bold text-[#322209]">
        명대사
        </p>
        </div>
        </div>
        </div>
        <div className={styles["card-back"]}>
        <div className="flex justify-center">
        <div className="h-[200px] w-[85%] flex justify-center items-center bg-[#CECDC4] drop-shadow border-b m-4 rounded-2xl">
        <p className="absolute font-nasq font-bold text-[#8D8E90] top-[10%] text-[20px] left-0 pl-[20px]  "></p>
        <p className="overflow-hidden whitespace-pre font-namyeong font-bold text-[#322209] hover:animate-typing">
        {line}
        </p>
        </div>
        </div>
        </div>
      </div> */}
    </div>
  );
}
