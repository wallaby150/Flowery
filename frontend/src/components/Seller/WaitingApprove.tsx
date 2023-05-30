import React, { useEffect, useState } from "react";
import styles from "./WaitingApprove.module.scss";
import ApproveInfo from "./ApproveInfo";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";

interface ReservationItem {
  reservationId: number;
  userId: number;
  storeId: number;
  messageId: string;
  goodsName: string;
  price: number;
  demand: string;
  date: string;
  printed: number;
  permission: number;
  reservationName: string;
  phrase: string;
  phone: string;
  image: string;
}

export default function WaitingApprove() {
  const myStoreId = useRecoilValue(storeId);
  const [reservation, setReservation] = useState<ReservationItem[]>([]);
  const myatk = sessionStorage.getItem("atk");
  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0] + "T00:00:00";
    axios
      .post(
        `https://host 명/api/reservation/day/?date=${formattedDate}`,
        {
          storeId: myStoreId,
        },
        {
          headers: {
            Authorization: `bearer ${myatk}`,
          },
        }
      )
      .then((response) => {
        setReservation(response.data as ReservationItem[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <p
          className={`${styles.font1}  ${
            reservation.filter((item) => item.permission === null).length <= 0
              ? "pb-0"
              : "pb-[1.2rem]"
          }`}
        >
          승인 대기
        </p>
        {reservation.filter((item) => item.permission === null).length > 0 ? (
          reservation
            .filter((item) => item.permission === null)
            .map((item) => (
              <div key={item.reservationId}>
                <ApproveInfo
                  reservationName={item.reservationName}
                  goodsName={item.goodsName}
                  date={item.date}
                  permission={item.permission}
                  reservationId={item.reservationId}
                  phrase={item.phrase}
                  demand={item.demand}
                  phone={item.phone}
                  image={item.image}
                />
              </div>
            ))
        ) : (
          <p className={styles.nodata}>승인대기 중인 예약이 없습니다</p>
        )}
      </div>
    </div>
  );
}
