import React from "react";
import back_btn from "../../../assets/back_btn.png";
import menu_btn from "../../../assets/menu_button.png";
import picture1 from "../../../assets/flowershop1.jpg";
import picture2 from "../../../assets/example1.jpg";
import profile1 from "../../../assets/profile1.png";
import profile3 from "../../../assets/profile3.png";
import { shopDataState } from "../../../recoil/atom";
import { useRecoilValue } from "recoil";

export default function OptionHeader() {
  const shopData = useRecoilValue(shopDataState);

  return (
    <div className="flex relative justify-center items-center h-[2.5rem] bg-user_sol border-solid border- border-b-black">
      {/* <img src={back_btn} alt="back" className="absolute left-2 w-10 p-3" /> */}
      <div className="">
        <p className=" font-bold font-nasq text-user_black ">
          {shopData.storeName}
        </p>
      </div>
    </div>
  );
}
