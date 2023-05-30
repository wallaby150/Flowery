import React, { useState, useEffect } from "react";
import styles from "./ManagePrint.module.scss";
import Title from "./PrintTitle";
import ItemInfo from "./ItemInfoProto";
import axios from "axios";

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
}

export default function ManagePrint() {
  const [reservation, setReservation] = useState<ReservationItem[]>([]);

  useEffect(() => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0] + "T00:00:00";
    axios
      .post(
        `https://host 명/api/reservation/day/?date=${formattedDate}`,
        {
          storeId: 4,
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
        <div className={styles.title}>
          <Title num={reservation.length} />
        </div>
        {reservation.map((item) => (
          <div key={item.reservationId}>
            <ItemInfo
              reservationName={item.reservationName}
              date={item.date}
              printed={item.printed}
              reservationId={item.reservationId}
              phrase={item.phrase}
              permission={item.permission}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
