import React, { useState, useEffect, useRef } from "react";
import ImageInput from "../../components/User/Writing/ImageInput";
import LetterPaper from "../../components/User/Writing/LetterPaper";
import LetterFont from "../../components/User/Writing/LetterFont";
import LetterContent from "../../components/User/Writing/LetterContent";
import VideoInput from "../../components/User/Writing/VideoInput";
import CardPreview from "../../components/User/Writing/CardPreview";
import PreviewModal from "../../components/User/Writing/PreviewModal";
import SubmitModal from "../../components/User/Writing/SubmitModal";
import Card0 from "../../assets/Card0.png";
import Card1 from "../../assets/Card1.png";
import Flowery from "../../assets/logo.png";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardContent,
  cardImgFileState,
  cardName,
  cardState,
  dateState,
  imageState,
  isCardContent,
  isCardName,
  letterFontState,
  letterPaperState,
  reservationDayState,
  reservationTimeState,
  timeState,
  totalTextState,
  userIdState,
  userStoreIdState,
  videoState,
} from "../../recoil/atom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function WritingPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showLetterInput, setShowLetterInput] = useState<boolean>(false);
  const [showImageInput, setShowImageInput] = useState<boolean>(false);
  const [card, setCard] = useRecoilState<number>(cardState);
  const name = useRecoilValue<string>(cardName);
  const content = useRecoilValue<string>(cardContent);
  const [isName, setIsName] = useRecoilState<boolean>(isCardName);
  const [isContent, setIsContent] = useRecoilState<boolean>(isCardContent);
  const [isDrag, setIsDrag] = useState(false);
  const letter = useRecoilValue<string>(totalTextState);
  const letterFont = useRecoilValue<number>(letterFontState);
  const letterPaper = useRecoilValue<number>(letterPaperState);
  const image = useRecoilValue<Array<File>>(imageState);
  const video = useRecoilValue<File | null>(videoState);
  const [loading, setLoading] = useState(false);
  const [reservationConfirm, setReservationConfirm] = useState<boolean>(false);
  const reservationDay = useRecoilValue<String>(reservationDayState);
  const reservationTime = useRecoilValue<String>(reservationTimeState);
  const [time, setTime] = useRecoilState<String>(timeState);
  const [date, setDate] = useRecoilState<String>(dateState);

  useEffect(() => {
    let resTime = reservationTime;
    if (reservationTime.length === 3) {
      resTime = "0" + reservationTime;
    }

    const reservateDate = `${reservationDay.slice(
      6,
      10
    )}-${reservationDay.slice(0, 2)}-${reservationDay.slice(
      3,
      5
    )}T${reservationTime.slice(0, 2)}:${reservationTime.slice(2)}:00`;
    setDate(reservateDate);

    const revervateTime = `${reservationDay.slice(
      0,
      2
    )}월 ${reservationDay.slice(3, 5)}일 ${resTime.slice(0, 2)}:${resTime.slice(
      2
    )}`;
    setTime(revervateTime);
  }, [reservationDay, reservationTime]);

  const navigate = useNavigate();

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Modal 이외의 곳을 클릭 하면 Modal 닫힘
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowModal(false);
    }
  };

  // esc를 누르면 Modal 닫힘
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setShowModal(false);
    }
  };

  // Drag시 배경 어두워지게
  const handleDragOverPage = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(true);
    event.currentTarget.classList.add("cursor-no-drop");
  };

  const handleDropPage = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDrag(false);
    event.currentTarget.classList.remove("cursor-no-drop");
  };

  // 다음으로 버튼
  const submitButton = () => {
    window.scrollTo({ top: 0 });
    if (name && content) {
      setShowModal(true);
    } else {
      if (!name) {
        setIsName(false);
      }
      if (!content) {
        setIsContent(false);
      }
    }
  };

  // 제출하기 버튼
  const handleReservationConfirm = () => {
    window.scrollTo({ top: 0 });
    if (name && content) {
      setReservationConfirm(true);
    } else {
      if (!name) {
        setIsName(false);
      }
      if (!content) {
        setIsContent(false);
      }
    }
  };

  return (
    // 전체 페이지
    <div
      onDragOver={handleDragOverPage}
      onDragLeave={handleDropPage}
      onDrop={handleDropPage}
      className={`${isDrag ? "bg-gray-300" : "bg-user_beige"}`}
      onDragStart={(event) => event.preventDefault()}
      // draggable="false"
    >
      {/* 미리보기 모달 */}
      {showModal && (
        <PreviewModal ref={modalRef} onClose={() => setShowModal(false)} />
      )}

      {/* 제출하기 모달 */}
      {reservationConfirm && (
        <SubmitModal
          onClose={() => setReservationConfirm(false)}
          ref={modalRef}
        />
      )}
      <div>
        {/* 페이지 내용 */}
        <div>
          <div className="flex">
            <img src={Flowery} alt="" className="w-1/3 mx-auto p-7" />
          </div>
          <p className="mx-auto mt-1 text-sm text-center font-nasq font-bold">
            카드 디자인을 선택해주세요.
          </p>
          <h2>
            <div className="flex justify-center ">
              {[Card0, Card1].map((card, i: number) => (
                <div key={i} className="">
                  <img
                    src={card}
                    onClick={() => setCard(i)}
                    className="w-[100px] p-4 cursor-pointer"
                  />
                </div>
              ))}
            </div>
            <div className="p-16 pt-0 mx-auto sm:w-[150px] md:w-[300px] lg:w-[450px]">
              <CardPreview />
            </div>
          </h2>
          <h2 className="">
            <p className="pl-2 mb-4 text-[1rem] text-center font-nasq font-bold">
              꽃을 받으실 분께 편지를 써보세요
            </p>
            <button
              type="button"
              onClick={() => {
                setShowLetterInput(!showLetterInput);
              }}
              className="flex items-center justify-between w-full p-5 font-medium text-left shadow-lg text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 hover:bg-gray-100"
            >
              <span className="flex items-center font-nasq font-bold">
                {showLetterInput ? (
                  <img
                    src={require("../../assets/letters/letter_open.png")}
                    alt=""
                    className="w-5 mr-2 shrink-0"
                    style={{ border: "1px solid black" }}
                  />
                ) : (
                  <img
                    src={require("../../assets/letters/letter_close.png")}
                    alt=""
                    className="w-5 mr-2 shrink-0"
                    style={{ border: "1px solid black" }}
                  />
                )}
                편지입력
              </span>
              <svg
                className={`w-6 h-6 shrink-0 ${
                  showLetterInput && "rotate-180"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          {showLetterInput && (
            <div>
              <LetterPaper />
              <div className="pb-2">
                <LetterFont />
              </div>
              <div className="">
                <LetterContent />
              </div>
              <hr className="" />
            </div>
          )}
          <h2>
            <p className="mx-auto p-4 text-[1rem] text-center font-nasq font-bold">
              사진이나 영상도 보낼 수 있습니다
            </p>
            <button
              type="button"
              onClick={() => {
                setShowImageInput(!showImageInput);
              }}
              className="flex items-center justify-between w-full p-5 font-medium text-left shadow-lg bg-white text-gray-500 border border-b border-gray-200 focus:ring-4 focus:ring-gray-200 hover:bg-gray-100"
            >
              <span className="flex items-center ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="48"
                  height="48"
                  viewBox="0 0 48 48"
                  className="w-5 h-5 mr-2 shrink-0"
                >
                  <g fill="none">
                    <path
                      fill="#000"
                      d="M44 24C44 22.8954 43.1046 22 42 22C40.8954 22 40 22.8954 40 24H44ZM24 8C25.1046 8 26 7.10457 26 6C26 4.89543 25.1046 4 24 4V8ZM39 40H9V44H39V40ZM8 39V9H4V39H8ZM40 24V39H44V24H40ZM9 8H24V4H9V8ZM9 40C8.44772 40 8 39.5523 8 39H4C4 41.7614 6.23857 44 9 44V40ZM39 44C41.7614 44 44 41.7614 44 39H40C40 39.5523 39.5523 40 39 40V44ZM8 9C8 8.44772 8.44771 8 9 8V4C6.23858 4 4 6.23857 4 9H8Z"
                    />
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M6 35L16.6931 25.198C17.4389 24.5143 18.5779 24.4953 19.3461 25.1538L32 36"
                    />
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M28 31L32.7735 26.2265C33.4772 25.5228 34.5914 25.4436 35.3877 26.0408L42 31"
                    />
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M30 12L42 12"
                    />
                    <path
                      stroke="#000"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                      d="M36 6V18"
                    />
                  </g>
                </svg>
                사진/동영상 첨부
              </span>
              <svg
                className={`w-6 h-6 shrink-0 ${showImageInput && "rotate-180"}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </h2>
          {showImageInput && (
            <div className="p-4 overflow-y-auto">
              <div className="space-y-4">
                <div className="card m-2  border-gray-400 rounded-lg transform transition-all duration-200">
                  <div className="m-3">
                    {/* 이미지 업로드 */}
                    <div className="mb-2">
                      <ImageInput />
                    </div>
                    {/* 영상 업로드 */}
                    <div className="mb-7">
                      <VideoInput />
                    </div>
                  </div>
                </div>
              </div>
              <hr />
            </div>
          )}
        </div>

        {/* 페이지 이동 */}
        <div className="relative h-[15vh]">
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="flex">
              <div className="cursor-pointer font-bold font-nasq border bg-user_green text-white py-2 pb-2 px-4 mx-4 rounded-full ">
                <input
                  type="button"
                  defaultValue="미리보기"
                  onClick={submitButton}
                  className="cursor-pointer"
                ></input>
              </div>
              <div className="cursor-pointer font-bold bg-user_green text-white font-nasq border py-2 pb-2 px-4 mx-4 rounded-full">
                <input
                  type="button"
                  defaultValue="제출하기"
                  onClick={() => {
                    handleReservationConfirm();
                  }}
                  className="cursor-pointer"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
