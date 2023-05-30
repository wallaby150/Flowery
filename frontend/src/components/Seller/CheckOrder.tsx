import React, { useState } from "react";
import styles from "./CheckOrder.module.scss";
import closebtn from "../../assets/close_btn.png";
import axios from "axios";
import Reason from "./RejectReason";
import "../../assets/styles/variable.scss";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
interface PrintCardProps {
  closeModal: () => void;
  goodsName: string;
  reservationId: number;
  reservationName: string;
  demand: string;
  date: string;
  phone: string;
  image: string;
}

export default function CheckOrder(props: PrintCardProps) {
  const myStoreId = useRecoilValue(storeId);
  const dateString = props.date;
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;
  const [isDeny, setIsDeny] = useState<number>(0);
  const [reason, setReason] = useState("");
  const myatk = sessionStorage.getItem("atk");

  const handleReasonChange = (newReason: string) => {
    setReason(newReason);
  };
  function handleAccept(id: number) {
    axios
      .post(
        "https://host 명/api/reservation/accept",
        {
          reservationId: id,
          storeId: myStoreId,
        },
        {
          headers: {
            Authorization: `bearer ${myatk}`,
          },
        }
      )
      .then(() => {
        alert("예약이 수락되었습니다.");
        window.location.reload();
        props.closeModal();
      });
  }
  function isDenied() {
    setIsDeny(1);
  }

  function NotDeny() {
    setIsDeny(0);
  }
  function handleDeny(id: number, reason: string) {
    axios
      .post(
        `https://host 명/api/reservation/deny?reason=${reason}`,
        {
          reservationId: id,
          storeId: myStoreId,
        },
        {
          headers: {
            Authorization: `bearer ${myatk}`,
          },
        }
      )
      .then(() => {
        axios
          .post(
            "https://host 명/api/sms/deny",
            {
              reservationId: id,
              denyReason: reason,
            },
            {
              headers: {
                Authorization: `bearer ${myatk}`,
              },
            }
          )
          .then(() => {
            alert("예약이 거절되었습니다.");
            window.location.reload();
            props.closeModal();
          });
      });
  }

  return (
    <div className={styles.modal}>
      <div className={styles.modalContent}>
        <div className="absolute right-[0%] top-[0%]">
          <img src={closebtn} alt="" onClick={() => props.closeModal()}></img>
        </div>
        {isDeny === 0 ? (
          <div className={styles.stepone}>
            <img src={props.image} alt=""></img>
            <div>
              <p className={styles.steptitle}>{props.goodsName}</p>
              <p className={styles.stephint}>예약일시: {formattedDate}</p>
              <p className={styles.stephint}>
                {props.phone
                  ? `전화번호: ${props.phone}`
                  : `예약명: ${props.reservationName}`}
              </p>
              {props.demand && props.demand !== "없음" ? (
                <p className={styles.stephint}>요청사항: {props.demand}</p>
              ) : (
                ""
              )}
            </div>
          </div>
        ) : (
          <Reason onReasonChange={handleReasonChange} />
        )}
        {isDeny === 0 ? (
          <>
            <button
              className={styles.successbutton}
              onClick={() => handleAccept(props.reservationId)}
            >
              예약 수락
            </button>
            <button onClick={isDenied}>예약 거절</button>
          </>
        ) : (
          <>
            <button
              className={styles.rejectbutton}
              onClick={() => handleDeny(props.reservationId, reason)}
            >
              예약 거절
            </button>
            <button onClick={NotDeny}>뒤로</button>
          </>
        )}
      </div>
    </div>
  );
}
