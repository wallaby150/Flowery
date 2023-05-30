import axios from "axios";
import { useState, useEffect } from "react";
import MyReservationElement from "../../components/User/MyReservation/MyReservationElement";

interface reservationHistory {
  reservationId: number;
  userId: number;
  storeId: number;
  messageId: number | null;
  goodsName: string | null;
  price: number | null;
  demand: string | null;
  date: string;
  printed: number | null;
  permission: number | null;
  reservationName: string | null;
  phrase: string | null;
  image: string | null;
}

export default function MyReservationHistory() {
  const [history, setHistory] = useState<Array<reservationHistory>>([]);

  const today = new Date();
  const currentMonth = `${today.getFullYear()}-${String(
    today.getMonth() + 1
  ).padStart(2, "0")}`;
  const minDate = "2022-01";

  useEffect(() => {
    const getReservationHistory = () => {
      axios
        .post("https://host 명/api/reservation/user", { userId: 1 })
        .then((response) => {
          setHistory(response.data);
        });
    };
    getReservationHistory();
  }, []);

  let selectMonth = "";

  return (
    <div>
      <div>
        <input
          type="month"
          className="block p-2 mx-auto my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm w-1/2  rounded-lg focus:ring-blue-500 focus:border-blue-500 "
          placeholder="Select date"
          min={minDate}
          max={currentMonth}
        />
      </div>
      <div className="p-4">
        <div>
          {history.map((reservation: reservationHistory, idx: number) => {
            const month = reservation.date.slice(0, 7);
            let check = false;
            if (selectMonth !== month) {
              selectMonth = month;
              check = true;
            } else {
              check = false;
            }
            return (
              <div key={idx}>
                <MyReservationElement
                  info={{ reservation: reservation, check: check }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
