import React, { Component } from "react";
import VideoPoster from "../../../assets/play-button.jpg";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useRecoilValue } from "recoil";
import { cardName, imageState, videoState } from "../../../recoil/atom";

export default function PreviewMemories() {
  const images = useRecoilValue<Array<File>>(imageState);
  const video = useRecoilValue<File | null>(videoState);
  const name = useRecoilValue<string>(cardName);

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    // slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 4000,
    speed: 1200,
  };
  console.log(images)
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
      {images.length > 0 &&
        images.map((image: any, index: any) => (
          <div
            key={index}
            className={`pb-[10%] overflow-hidden ${
              images.length === 1
                ? "flex justify-center items-center"
                : index % 2 === 0
                ? "w-[90%] mr-auto"
                : "w-[90%] ml-auto"
            }`}
          >
            <img src={URL.createObjectURL(image)} alt="couple" />
          </div>
        ))}
      {video && (
        <div>
          <video src={URL.createObjectURL(video)} className="w-[100%]" controls/>
        </div>
      )}
    </div>

    // <div>
    //   {/* <div className="mb-[25%] flex justify-center">
    //     <img src={sellerpic} alt="s" />
    //   </div> */}

    //   <div className="h-[10rem] flex flex-col mt-[25%] ml-5">
    //     <p className="text-[3rem] text-[#8D8E90] font-namyeong">Memories</p>
    //     <p className="text-[2rem] font-namyeong">추억</p>
    //     <p className="text-[0.8rem] text-[#82877C] font-namyeong">
    //       {name}님이 꽃과 함께 업로드 해주신 추억들입니다.
    //     </p>
    //   </div>

    //   {/* 사용자 input 사진 왼쪽 오른쪽 정렬 */}
    //   {images.length > 0 &&
    //     images.map((image, index) => (
    //       <div
    //         key={index}
    //         className={`mb-[10%] w-[90%] overflow-hidden ${
    //           index % 2 === 0 ? "mr-auto" : "ml-auto"
    //         }`}
    //       >
    //         <img src={URL.createObjectURL(image)} alt="couple" />
    //       </div>
    //     ))}
    //   {video && (
    //     <div>
    //       <video src={URL.createObjectURL(video)} controls className="w-full" />
    //     </div>
    //   )}
    // </div>
  );
}
