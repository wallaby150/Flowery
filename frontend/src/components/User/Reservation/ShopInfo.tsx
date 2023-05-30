import React from "react";
import picture1 from "../../../assets/flowershop1.jpg";
import picture2 from "../../../assets/example1.jpg";
import profile1 from "../../../assets/profile1.png";
import profile3 from "../../../assets/profile3.png";
import { useRecoilValue } from "recoil";
import { shopDataState } from "../../../recoil/atom";

export default function ShopInfo(shopData: any) {
  const shopInfo = useRecoilValue(shopDataState);

  return (
    <div className="flex flex-col ">
      <div className="p-1 h-[50vh] overflow-hidden">
        <img src={shopInfo.image} alt="main" className="w-full h-full " />
      </div>
      <div className="mx-auto font-bold pt-[5%] font-bold text-[1.5rem] font-nasq">
        <p>{shopInfo.storeName}</p>
      </div>
      <div className="mx-auto pt-2 text-[0.5rem] text-gray-500">
        <p>{shopInfo.address}</p>
      </div>
      <div className="mx-auto text-center font-nasq font-bold text-[0.9rem] p-2">
        <p>{shopInfo.info}</p>
      </div>
      <div className="flex overflow-scroll">
        <div className="flex ">
          {shopInfo.samples.map((position: any, index: any) => (
            <div key={index} className="w-[25vw] h-[25vw] ml-1">
              <img className="w-full h-full" src={position} alt="shop.title" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
