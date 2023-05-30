import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardContent,
  cardName,
  cardState,
  imageState,
  reservationConfirmState,
  totalTextState,
  userIdState,
  videoState,
  cardImgFileState,
  shopDataState,
  goodsState,
  reservationTimeState,
  reservationDayState,
  timeState,
  dateState,
} from "../../../recoil/atom";
import axios from "axios";
import { letterFontState } from "../../../recoil/atom";
import { letterPaperState } from "../../../recoil/atom";

const SubmitModal = React.forwardRef<HTMLDivElement, any>((props, ref) => {
  const userId = useRecoilValue<number>(userIdState);
  const storeData = useRecoilValue<any>(shopDataState);
  const goods = useRecoilValue<any>(goodsState);
  const letter = useRecoilValue<string>(totalTextState);
  const letterFont = useRecoilValue<number>(letterFontState);
  const letterPaper = useRecoilValue<number>(letterPaperState);
  const image = useRecoilValue<Array<File>>(imageState);
  const video = useRecoilValue<File | null>(videoState);

  const name = useRecoilValue<string>(cardName);
  const content = useRecoilValue<string>(cardContent);
  const card = useRecoilValue<number>(cardState);
  const [loading, setLoading] = useState(false);
  // const [cardUrl, setCardUrl] = useState<string>("");
  const cardImgFile = useRecoilValue<File | null>(cardImgFileState);
  const reservationDay = useRecoilValue<String>(reservationDayState);
  const reservationTime = useRecoilValue<String>(reservationTimeState);
  const [time, setTime] = useRecoilState<String>(timeState);
  const [date, setDate] = useRecoilState<String>(dateState);

  // useEffect(() => {
  //   const resDay = String(reservationDay);
  //   const resTime = String(reservationTime);
  //   console.log("resDay", resDay);
  //   console.log("resTime", resTime);

  //   const reservateDate = `${resDay.slice(0, 10)}T${resTime.slice(
  //     0,
  //     2
  //   )}:${resTime.slice(2)}:00`;
  //   setDate(reservateDate);

  //   const revervateTime = `${resDay.slice(5, 7)}월 ${resDay.slice(
  //     8,
  //     10
  //   )}일 ${resTime.slice(0, 2)}:${resTime.slice(2)}`;
  //   setTime(revervateTime);
  // }, [reservationDay]);

  const navigate = useNavigate();

  // axios
  const submitCardImg = () => {
    const formData = new FormData();

    if (cardImgFile) {
      formData.append("pictures", cardImgFile);
    }

    axios
      .post("https://host 명/api/storage", formData)
      .then((response) => {
        submitReservationInfo(response.data);
      });
  };

  const submitReservationInfo = (cardUrl: string) => {
    const formData = new FormData();

    // const offset = new Date().getTimezoneOffset() * 60000;
    // const date = new Date(Date.now() - offset).toISOString().slice(0, -5);
    // const date = `${reservationDay.slice(0, 10)}T${reservationTime.slice(
    //   0,
    //   2
    // )}:${reservationTime.slice(2)}:00`;
    formData.append("message", letter);

    if (video) {
      formData.append("video", video);
    } else {
      formData.append("video", new Blob(undefined));
    }
    if (image.length > 0) {
      for (let i = 0; i < image.length; i++) {
        formData.append(`pictures`, image[i]);
      }
    } else {
      formData.append(`pictures`, new Blob(undefined));
    }
    formData.append("font", String(letterFont));
    formData.append("paper", String(letterPaper));
    formData.append("date", String(date));

    axios
      .post("https://host 명/api/messages/card", formData)
      .then((response) => {
        submitCardInfo(response.data.messageId, cardUrl);
      })
      .catch((e) => setLoading(false));
  };

  const submitCardInfo = (messageId: string, cardUrl: string) => {
    // const date = `${reservationDay.slice(0, 10)}T${reservationTime.slice(
    //   0,
    //   2
    // )}:${reservationTime.slice(2)}:00`;

    const jsonData = {
      userId: userId,
      storeId: storeData.storeId,
      messageId: messageId,
      goodsName: goods.goodsName,
      price: goods.goodsPrice,
      demand: "",
      date: date,
      reservationName: name,
      phrase: content,
      card: card,
      renderedCard: cardUrl[0],
    };

    axios
      .post("https://host 명/api/reservation/make", jsonData)
      .then((response) => {
        alert("제출이 완료됐습니다!");
        axios
          .post("https://host 명/api/sms/reservation", {
            reservationId: response.data,
          })
          .then((response) => {
            console.log("제출 완료");
          });
        navigate("/");
      })
      .catch((error) => {
        alert("다시 시도해주세요!");
        setLoading(false);
      });
  };

  // const reservationId = () => {
  //   axios.post("https://host 명/api/user/reservation", {userId: userId})
  //   .then((response) => {
  //     sendMessage()
  //   })
  // }

  // const sendMessage = () => {
  //   axios.
  // }

  return (
    <div className="relative z-[50]">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-16 text-center w-full sm:items-center sm:p-0">
          <div
            ref={ref}
            className="relative w-full transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all  sm:max-w-lg"
          >
            <div className="absolute top-0 right-0 cursor-pointer bg-white p-1">
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
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="justify-center sm:flex sm:items-start">
                <div className="text-center justify-center items-center sm:mt-0">
                  <h3
                    className="text-base mb-4 font-semibold leading-6 text-gray-900"
                    id="modal-title"
                  >
                    예약 정보
                  </h3>
                  <div className="mt-2 flex justify-between">
                    <p className=" text-sm text-gray-500">가게</p>
                    <p className=" text-sm text-gray-500 border-b-2 border-user_green">
                      {storeData.storeName}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <p className=" text-sm text-gray-500">예약 상품</p>
                    <p className=" text-sm text-gray-500 border-b-2 border-user_green">
                      {goods.goodsName}
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <p className=" text-sm text-gray-500">가격</p>
                    <p className=" text-sm text-gray-500 border-b-2 border-user_green">
                      {goods.goodsPrice}원
                    </p>
                  </div>
                  <div className="mt-2 flex justify-between">
                    <p className=" text-sm text-gray-500">예약 날짜</p>
                    <p className=" text-sm text-gray-500 border-b-2 border-user_green">
                      {time}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-4 py-3 justify-center items-center mx-auto flex sm:px-6">
              <div
                onClick={() => {
                  if (!loading) {
                    setLoading(true);
                    submitCardImg();
                  }
                }}
                className={`inline-flex justify-center rounded-md px-3 py-2 mb-4 text-sm font-semibold shadow-sm z-[67] sm:ml-3 sm:w-auto ${
                  loading ? "bg-gray-300" : "bg-user_green text-white"
                }`}
              >
                예약하기
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default SubmitModal;
