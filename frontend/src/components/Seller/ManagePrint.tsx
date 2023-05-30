import React, { useEffect, useState } from "react";
import styles from "./ManagePrint.module.scss";
import Title from "./PrintTitle";
import ItemInfo from "./ItemInfo";
import axios from "axios";
import { useLocation } from "react-router-dom";
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
  image: string;
  renderedCard: string;
  phone: string;
}

export default function ManagePrint() {
  const [reservation, setReservation] = useState<ReservationItem[]>([]);
  const myStoreId = useRecoilValue(storeId);
  const location = useLocation();
  const currentDate = new Date();
  const options = { timeZone: "Asia/Seoul" };
  const formattedDate = currentDate.toISOString().split("T")[0] + "T00:00:00";

  useEffect(() => {
    const myatk = sessionStorage.getItem("atk");
    axios
      .post(
        `https://host 명/api/reservation/day/?date=${formattedDate}`,
        {
          storeId: myStoreId,
        },
        {
          headers: {
            Authorization: `bearer ${sessionStorage.getItem("atk")}`,
          },
        }
      )
      .then((response) => {
        let filteredItems = response.data;
        if (location.pathname === "/seller") {
          filteredItems = response.data.filter(
            (item: ReservationItem) =>
              item.permission === 1 && item.printed === 0
          );
        }
        setReservation(filteredItems);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [formattedDate, location, myStoreId]);

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className={styles.title}>
          <Title
            num={
              reservation.filter(
                (item: ReservationItem) => item.permission !== null
              ).length
            }
          />
        </div>
        {reservation
          .filter(
            (item: ReservationItem) =>
              (location.pathname === "/seller/book" &&
                item.permission !== null) ||
              (item.permission === 1 && item.printed === 0)
          )
          .slice(0, location.pathname === "/seller" ? 5 : undefined)
          .map((item) => (
            <div key={item.reservationId}>
              <ItemInfo
                reservationName={item.reservationName}
                date={item.date}
                printed={item.printed}
                goodsName={item.goodsName}
                price={item.price}
                reservationId={item.reservationId}
                phrase={item.phrase}
                permission={item.permission}
                image={item.image}
                renderedCard={item.renderedCard}
                phone={item.phone}
                demand={item.demand}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
