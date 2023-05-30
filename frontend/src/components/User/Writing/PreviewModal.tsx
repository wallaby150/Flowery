import React, { useState, useRef, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardImgFileState,
  imageState,
  reservationConfirmState,
  totalTextState,
  videoState,
} from "../../../recoil/atom";
import { useNavigate } from "react-router-dom";
import PreviewMemories from "./PreviewMemories";
import SubmitModal from "./SubmitModal";
import PreviewMore from "./PreviewMore";
import PreviewProtoIntro from "./PreviewProtoIntro";
import PreviewLetters from "./PreviewLetters";
import Card from "./Card";
import Arrow from "../../../assets/arrow.png";
import QRImg from "../../../assets/ReleasePage/qr_example.png";

const PreviewModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  // const [reservationConfirm, setReservationConfirm] =
  //   useRecoilState<boolean>(reservationConfirmState);
  const [reservationConfirm, setReservationConfirm] = useState<boolean>(false);
  const letter = useRecoilValue<string>(totalTextState);
  const image = useRecoilValue<Array<File>>(imageState);
  const video = useRecoilValue<File | null>(videoState);
  const [clickQR, setClickQR] = useState<boolean>(false);
  const [cardDisplayed, setCardDisplayed] = useState(false);
  const cardImgFile = useRecoilValue<File | null>(cardImgFileState);

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
      setReservationConfirm(false);
    }
  };

  // esc를 누르면 Modal 닫힘
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setReservationConfirm(false);
    }
  };

  const handleCardDisplayed = () => {
    setCardDisplayed(true);
  };
  return (
    <div className="absolute inset-x-0 h-[600%] overflow-y-hidden-scroll bg-opacity-50 bg-black z-[20]">
      <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
        {reservationConfirm && (
          <SubmitModal onClose={() => setReservationConfirm(false)} ref={ref} />
        )}
        <div ref={ref} className="bg-white ">
          {!clickQR ? (
            <div className="w-full relative">
              <div className="">
                {cardImgFile && (
                  <img
                    src={URL.createObjectURL(cardImgFile)}
                    onLoad={handleCardDisplayed}
                  />
                )}
              </div>
              <div className="">
                <div className="absolute top-0 right-0 cursor-pointer bg-white p-1 ">
                  <svg
                    onClick={props.onClose}
                    className="w-3.5 h-3.5  stroke-gray-400 hover:stroke-black"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <div className="absolute flex w-[8%] top-[28.5%] left-[10%]">
                  <p className="mr-2 font-bold text-sm text-red-500">Click!</p>
                  <img src={Arrow} className="" />
                </div>
                <div className="w-full mx-auto flex items-center justify-center">
                  <img
                    src={QRImg}
                    alt="QR"
                    onClick={() => setClickQR(true)}
                    className="absolute mx-auto w-[15%] top-[26%] cursor-pointer z-10 hover:z-30"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute top-0 right-0 cursor-pointer z-40 bg-white p-1">
                <svg
                  onClick={props.onClose}
                  className="w-3.5 h-3.5  stroke-gray-400 hover:stroke-black"
                  width="8"
                  height="8"
                  viewBox="0 0 8 8"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <PreviewProtoIntro />
              {(image.length > 0 || video) && <PreviewMemories />}
              {letter && <PreviewLetters />}
              <PreviewMore />
              <div className="flex justify-center pb-6">
                <span
                  onClick={props.onClose}
                  className="cursor-pointer border rounded-full p-2 px-4 mr-2 font-bold bg-user_green text-white"
                >
                  이전으로
                </span>
                <span
                  onClick={() => {
                    window.scrollTo({ top: 0 });
                    setReservationConfirm(true);
                  }}
                  className="cursor-pointer border rounded-full p-2 px-4 ml-2 font-bold bg-user_green text-white"
                >
                  제출하기
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PreviewModal;
