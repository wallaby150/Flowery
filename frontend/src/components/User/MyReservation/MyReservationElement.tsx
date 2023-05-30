import axios from "axios";
import { useState, useEffect } from "react";

export default function MyReservationElement({ info }: any) {
  const [storeInfo, setStoreInfo] = useState<any>({});
  const { reservation } = info;

  useEffect(() => {
    const getStoreInfo = () => {
      axios
        .post("https://host 명/api/stores/info", {
          storeId: reservation.storeId,
        })
        .then((response) => {
            {
                setStoreInfo(response.data);
            }
        });
    };
    getStoreInfo();
  }, []);

  return (
    <div>
      {/* {check && (
        <div>
          <div className="py-2 text-sm font-bold">
            {reservation.date.slice(0, 4)}년 {reservation.date.slice(5, 7)}월
          </div>
          <hr />
        </div>
      )} */}
      <div className="py-1">
        <div className="text-xs">
          {reservation.date.slice(5, 7)}월 {reservation.date.slice(8, 10)}일
        </div>
        <div className="flex justify-between py-1">
          <div>{storeInfo.storeName}</div>
          <div className="">{reservation.goodsName}</div>
        </div>
        <hr className="opacity-50" />
      </div>
    </div>
  );
}
