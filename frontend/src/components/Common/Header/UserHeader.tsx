import styles from "./UserHeader.module.scss";
import logo from "../../../assets/Flowery_logo.png";
import hamburger from "../../../assets/HamburgerGreen.png";
import profile from "../../../assets/profileGreen.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useRecoilValue } from "recoil";
import { isLoggedInState, userNameState } from "../../../recoil/atom";
import axios from "axios";

export default function UserHeader() {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  // const isLoggedIn = useRecoilValue<boolean>(isLoggedInState);
  const userId = useRecoilValue<String>(userNameState);
  const isLoggedIn = !!sessionStorage.getItem("atk");

  const navigate = useNavigate();

  const handleSignOut = () => {
    axios
      .post("https://host 명/api/users/logout", { id: userId })
      .then((res) => {
        // localStorage.clear();
        // sessionStorage.clear();
        // alert("로그아웃 되었습니다!");
        // navigate("/");
      });
    localStorage.clear();
    sessionStorage.clear();
    alert("로그아웃 되었습니다!");
    navigate("/");
  };

  return (
    <header className="flex justify-between relative items-center bg-user_beige border-[1px] border-b-user_green">
      <p
        onClick={() => navigate("/")}
        className="cursor-pointer text-user_green font-ballet bg-transparent p-2 m-1"
      >
        Flowery
      </p>
      <div className="flex">
        <Link to="/mygarden">
          <img src={profile} alt="profile" className="w-[1rem] mr-3" />
        </Link>
        {isLoggedIn && (
          <img
            src={hamburger}
            alt="hamburger"
            onClick={() => setShowDropDown(!showDropDown)}
            className="w-[1rem] mr-3"
          />
        )}
      </div>
      {showDropDown && (
        <div className="z-10 absolute flex-col justify-center top-12 right-0 bg-user_beige border-0 divide-y divide-gray-100 shadow w-30">
          <div className="text-sm text-gray-700 ">
            <div
              onClick={() => navigate("/mygarden")}
              className="block px-4 py-2 bg-user_beige hover:bg-gray-100 "
            >
              MyGarden
            </div>
            <div
              onClick={() => navigate("/myreservation")}
              className="block px-4 py-2 hover:bg-gray-100 "
            >
              예약내역
            </div>
            <div className="">
              <div
                onClick={handleSignOut}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 "
              >
                로그아웃
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
