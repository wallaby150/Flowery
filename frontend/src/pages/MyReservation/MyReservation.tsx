import axios from "axios";
import { useState, useEffect } from "react";
import MyReservationElement from "../../components/User/MyReservation/MyReservationElement";
import { useNavigate } from "react-router-dom";

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

export default function MyReservation() {
  const [reservations, setReservations] = useState<Array<reservationHistory>>(
    []
  );

  const navigate = useNavigate();
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const getReservationHistory = () => {
      axios
        .post("https://host 명/api/reservation/user", { userId: 1 })
        .then((response) => {
          setReservations(response.data);
        });
    };
    getReservationHistory();
  }, []);

  const reservationsAfterToday = reservations.filter(
    (reservation) => reservation.date.slice(0, 10) > today
  );

  return (
    <div>
      <div className="p-4 bg-user_beige min-h-screen">
        <div>
          {reservationsAfterToday.length > 0 ? (
            reservationsAfterToday.map((reservation, idx) => (
              <div key={idx}>
                <MyReservationElement info={{ reservation }} />
              </div>
            ))
          ) : (
            <div className="flex flex-col justify-center items-center">
              <p className="pt-4 font-nasq">예약 내역이 없습니다</p>

              <div className="pt-10 text-center">
                <input
                  defaultValue="예약하기"
                  onClick={() => navigate("/reservation")}
                  className="mb-3 inline-block w-full font-nasq cursor-pointer rounded-xl pb-2 pt-2.5 text-xs text-center font-medium uppercase leading-normal bg-user_green text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                ></input>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
