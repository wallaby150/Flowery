import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { tabState } from "../../../recoil/atom";
import Try from "./Try";
import HowTo from "./HowTo";
import All from "./All";

export default function Intro() {
  const [activeTab, setActiveTab] = useRecoilState(tabState);

  const handleTabClick = (tab: any) => {
    setActiveTab(tab);
    window.scrollTo(0, 0);
  };

  return (
    <div className="h-full pb-[15%]">
      <Link to="/">
        <div className="bg-user_beige">
          <div className="p-4 pt-[10%]">
            <p className="text-[black] text-[5rem] font-ballet text-user_green">
              Flowery
            </p>
            <p className="text-[black] text-[1rem] ml-5 mt-[-15px] font-nasq font-bold">
              시들지 않는 추억을 영원히
            </p>
          </div>
          <div className="flex justify-center">
            <div className="flex gap-2 m-3 w-[90%] pb-3">
              <button
                className={`${
                  activeTab === "all"
                    ? "bg-user_green text-white"
                    : "bg-user_sol text-user_black"
                }} min-w-[100px] w-1/3 p-2 h-[2.5rem]  rounded-xl text-white font-nasq font-bold`}
                onClick={() => handleTabClick("all")}
              >
                ALL
              </button>

              <button
                className={`${
                  activeTab === "howto"
                    ? "bg-user_green text-white"
                    : "bg-user_sol text-user_black"
                }} min-w-[100px] w-1/3 p-2 h-[2.5rem]  rounded-xl text-white font-nasq font-bold`}
                onClick={() => handleTabClick("howto")}
              >
                How To
              </button>
              <button
                className={`${
                  activeTab === "try"
                    ? "bg-user_green text-white"
                    : "bg-user_sol text-user_black"
                }} min-w-[100px] w-1/3 p-2 h-[2.5rem]  rounded-xl text-white font-nasq font-bold`}
                onClick={() => handleTabClick("try")}
              >
                Try
              </button>
            </div>
          </div>
          <div>
            {activeTab === "all" && <All />}
            {activeTab === "howto" && <HowTo />}
            {activeTab === "try" && <Try />}
          </div>
        </div>
      </Link>
    </div>
  );
}
