import React, { useState, useEffect } from "react";
import ShopInfo from "./ShopInfo";
import OptionHeader from "./OptionHeader";
import thumbnail from "../../../assets/example1.jpg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useRecoilValue, useRecoilState } from "recoil";
import { shopDataState, goodsState } from "../../../recoil/atom";
import api from "../../../axios/AxiosInterceptor";

export default function OrderPage() {
  const location = useLocation();
  const [goodsList, setGoodsList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const shopData = useRecoilValue(shopDataState);
  const [selectedGoods, setSelectedGoods] = useRecoilState(goodsState);

  const onSelect = (goods: any) => {
    setSelectedGoods(goods);
  };
  useEffect(() => {
    async function getData() {
      try {
        const response = await api.post(
          "https://host 명/api/goods/info",
          {
            storeId: shopData.storeId,
          }
        );
        // console.log(response.data[0]);
        setGoodsList(response.data);
      } catch (error) {
        // console.error(error);
      } finally {
        setLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    }
    //첫 렌더링에만 실행
    getData();
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className=" bg-user_beige ">
      <OptionHeader />
      <div className="flex flex-col items-center pt-[3%]">
        <div className="w-[95%] mb-[10%] shadow-xl bg-white ">
          <ShopInfo />
          <div className="p-3 pt-8 pb-8 text-xs">
            <p className="font-nasq font-bold">주의사항 ex) </p>
            <p className="font-nasq font-bold">
              사진은 실제 해당 가게에서 제공하는 같은 가격의 꽃다발이지만 꽃의
              종류에 따라 분위기가 달라질 수 있는 점 주의 해주세요
            </p>
          </div>
          <div>
            {goodsList.map((product, index) => (
              <div
                onClick={() => onSelect(product)}
                className={`relative flex border-t border-user_green pb-[1%] ${
                  selectedGoods?.goodsId === product.goodsId
                    ? "bg-user_green opacity-[0.5]"
                    : ""
                }`}
                key={index}
              >
                <div
                  className={`flex flex-col w-3/5 p-3 gap-1 justify-center `}
                >
                  <div className="font-nasq font-bold">{product.goodsName}</div>
                  <div className="font-nasq text-[#8D8E90] text-[0.5rem]">
                    {product.goodsDetail}
                  </div>
                  <div className="font-bold">
                    {product.goodsPrice}
                    <span className="pl-1 font-nasq">원</span>
                  </div>
                </div>
                <div className="w-[10rem] h-[10rem] ">
                  <img
                    src={product.samples[0]}
                    alt="thumbnail"
                    className="w-full h-full p-3"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center pt-[4%] pb-[15%] bg-user_beige">
          <Link to={"/writing"}>
            <button className="w-[10rem] h-30 shadow-lg rounded-xl bg-user_green text-white font-nasq font-bold">
              다음단계
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
