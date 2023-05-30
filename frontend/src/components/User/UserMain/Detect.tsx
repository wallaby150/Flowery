import React, { useState, useEffect } from "react";
import axios from "axios";
import imageButton from "../../../assets/UserMain/inputStyle.png";
import MeanCard from "./MeanCard";
import icon from "../../../assets/UserMain/card_icon.png";
import arrow from "../../../assets/UserMain/arrow_up.png";
import api from "../../../axios/AxiosInterceptor";
// interface ResultData {
//   flower_object: Dict; // 실제 응답 데이터 구조에 맞게 타입을 조정합니다.
// }

export default function Detect() {
  const [result, setResult] = useState<any | null>(null);
  const [activeWord, setActiveWord] = useState();
  const [inputImage, setInputImage] = useState<string | null>(null);
  const [errorPopup, setErrorPopup] = useState(false); // 에러 팝업 상태 관리

  const handleWordClick = (word: any) => {
    setActiveWord(word);
  };

  // 이미지를 업로드하는 함수
  const uploadImage = async (file: any) => {
    try {
      // FormData 객체 생성
      const formData = new FormData();
      formData.append("file", file); // 파일 추가
      // POST 요청 보내기
      const response = await axios.post(
        "https://host 명/flask/landing/objectDetect",
        formData
      );
      const imageURL = URL.createObjectURL(file);
      setInputImage(imageURL);
      // 요청이 성공하면 처리할 코드 작성
      console.log(response.data.flower_object);
      const flowerObject = response.data.flower_object;
      if (Object.keys(flowerObject).length === 0) {
        // 응답 데이터가 빈 객체인 경우
        setErrorPopup(true); // 에러 팝업 표시
        setInputImage(null);
      } else {
        setResult(flowerObject);
      }
    } catch (error) {
      // 요청이 실패하면 처리할 코드 작성
      console.error(error);
      console.error("sdf");
      setErrorPopup(true); // 에러 팝업 표시
      setInputImage(null);
    }
  };

  //   console.log(result.스토크);
  // result+, "hlsssldd");

  // 사용 예시
  const fileInputOnChange = (event: any) => {
    const file = event.target.files[0];
    uploadImage(file);
  };

  return (
    <div>
      <div className="flex justify-center pt-[10%]">
        <input type="file" onChange={fileInputOnChange} className="hidden" />
        {inputImage === null ? (
          <img
            src={imageButton}
            alt=""
            className="w-4/5"
            onClick={() => {
              const fileInput = document.querySelector('input[type="file"]');
              if (fileInput) {
                fileInput.dispatchEvent(new MouseEvent("click"));
              }
            }}
          />
        ) : (
          <div className="flex flex-col justify-center p-4">
            <img
              src={inputImage}
              alt="inputImage"
              onClick={() => {
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) {
                  fileInput.dispatchEvent(new MouseEvent("click"));
                }
              }}
            />
            <div className="flex justify-center">
              <p className="font-bold font-nasq text-[gray] text-[0.7rem] pt-2">
                이미지를 다시 터치하면 다른 꽃다발을 분석할 수 있어요!
              </p>
            </div>
          </div>
        )}
      </div>
      {errorPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-md">
            <p>꽃다발을 인식할 수 없습니다.</p>
            <button
              onClick={() => setErrorPopup(false)}
              className="mt-2 px-4 py-2 bg-user_green text-white rounded-md"
            >
              확인
            </button>
          </div>
        </div>
      )}
      <div className="pt-[10%] flex justify-center font-nasq font-bold">
        {result ? (
          <div>
            <div className="flex flex-col text-center">
              <p>업로드 해주신 꽃다발의 ai 객체 인식 결과</p>
              <p>해당 꽃다발은 다음과 같은 꽃들로 구성되어있습니다</p>
              <div className="flex flex-col justify-center items-center p-5">
                <p className="text-[gray] text-[0.7rem] pb-[5%]">
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
        <div className="flex flex-col justify-center"></div>
        {result ? (
          <div className="flex justify-center items-center">
            {Object.entries(result).map(([flower, mean]) => {
              if (activeWord === flower) {
                return (
                  <div className="flex flex-col gap-2 w-[80%]" key={flower}>
                    {Array.isArray(mean)
                      ? mean.map((item: string) => (
                          <div
                            className="flex items-center justify-center w-full h-[4rem] text-center rounded-md bg-white"
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
    </div>
  );
}
