import React, { useEffect, useState } from "react";
import selectBtn from "../../../assets/select_button.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useRecoilState } from "recoil";
import { shopDataState, shopListState } from "../../../recoil/atom";
import api from "../../../axios/AxiosInterceptor";

export default function ShopList() {
  //response.data를 담을 변수
  const [shopList, setShopList] = useRecoilState(shopListState);
  const [loading, setLoading] = useState(true); // 로딩 상태 추가
  const [shopData, setShopData] = useRecoilState(shopDataState);

  const onclick = (shop: any) => {
    setShopData(shop);
  };

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.get(
          "https://host 명/api/stores"
        );
        // console.log(response.data[0]);
        setShopList(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    }
    //첫 렌더링에만 실행
    getData();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="bg-user_beige sticky top-[-2px]">
        <p className="text-xl font-medium p-2 text-user_green font-namyeong border-b border-user_green">
          가게선택
        </p>
      </div>
      {shopList.map((shop: any, index: any) => (
        <div
          key={index}
          className="bg-user_beige border-solid border-b border-user_green"
        >
          <div className="flex items-center space-x-4 pt-2">
            <div className="flex-none w-20 h-20 overflow-hidden rounded-full border-solid border-[1px] border-user_green mb-2">
              <img
                src={shop.profile}
                alt={shop.storeName}
                className="w-full h-full"
              />
            </div>
            <div className="flex flex-col w-[66.66%] pr-1 font-bold justify-center ">
              <div className="font-nasq">{shop.storeName}</div>
              <div className="text-xs font-nasq text-gray-500 ">
                {shop.address}
              </div>
            </div>
            <Link to="/reservationoption" onClick={() => onclick(shop)}>
              <div className="flex justify-center items-center bg-user_beige w-[4rem] h-[2.5rem] rounded-[20px] border-[1.75px] border-user_green ">
                <p className=" font-nasq font-bold  text-user_green">선택</p>
              </div>
            </Link>
          </div>
          <div className="overflow-x-scroll">
            <div className="flex flex-nowrap">
              {shop.samples
                ? shop.samples.map((shop: any, index: any) => (
                    <div
                      className="w-[25vw] h-[25vw] flex-shrink-0"
                      key={index}
                    >
                      <img
                        className="p-1 object-cover w-full h-full "
                        src={shop}
                        alt="shop.title"
                      />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
