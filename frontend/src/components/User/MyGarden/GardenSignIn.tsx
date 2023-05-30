import axios from "axios";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  atk,
  phoneNumberState,
  userIdState,
  userNameState,
} from "../../../recoil/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Cookies } from "react-cookie";

export default function GardenSignIn() {
  const [accessToken, setAccessToken] = useRecoilState<string>(atk);
  const setUserId = useSetRecoilState<number>(userIdState);
  // const setPhoneNum = useSetRecoilState<string>(phoneNumberState);
  const [id, setId] = useRecoilState<string>(userNameState);
  const [password, setPassword] = useState<string>("");
  const { messageId } = useParams<{ messageId: string }>();

  const navigate = useNavigate();

  // 로그인 시도
  const checkSignIn = () => {
    axios
      .post("https://host 명/api/users/token-user", {
        id: id,
        pass: password,
      })
      .then((response) => {
        axios
          .get("https://host 명/api/users/login", {
            params: { id: id },
          })
          .then((res) => {
            const cookie = new Cookies();
            setUserId(res.data.usersId);
            setAccessToken(response.data.atk);
            sessionStorage.setItem("atk", response.data.atk)
            cookie.set("refreshToken", response.data.rtk);
            navigate(`/userproto/${messageId}`);
          })
          .catch((e) => alert("로그인에 실패했습니다"));
      })
      .catch((e) => alert("로그인에 실패했습니다"));
  };

  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkSignIn();
    }
  };

  // 회원가입
  const goToSignUp = () => {
    navigate("/mygardensignup");
  };

  return (
    <section className="gradient-form h-full bg-neutral-200 flex items-center justify-center">
      <div className="container h-screen px-4 py-8 lg:p-10">
        <div className="g-6 flex h-full flex-wrap  justify-center text-neutral-800">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <img
                        className="mx-auto w-48"
                        src={require("../../../assets/logo.png")}
                        alt="logo"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        시들지 않는 추억을 선물하세요
                      </h4>
                    </div>

                    <form>
                      <div className="relative mb-4">
                        <input
                          type="text"
                          className="peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:border-neutral-300"
                          id="idInput"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setId(e.target.value)
                          }
                          onKeyDown={pressEnter}
                          placeholder=" "
                        />
                        <label
                          htmlFor="idInput"
                          className="absolute cursor-text text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          아이디
                        </label>
                      </div>

                      <div className="relative mb-4">
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  focus:border-neutral-300"
                          id="passwordInput"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setPassword(e.target.value)
                          }
                          onKeyDown={pressEnter}
                          placeholder=" "
                        />
                        <label
                          htmlFor="passwordInput"
                          className="absolute cursor-text text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                        >
                          비밀번호
                        </label>
                      </div>

                      <div className="mb-3 pb-1 pt-1 text-center">
                        <input
                          defaultValue="로그인"
                          onClick={checkSignIn}
                          className="mb-3 inline-block w-full cursor-pointer rounded-xl px-6 pb-2 pt-2.5 text-xs text-center font-medium uppercase leading-normal bg-red-300 text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                        ></input>
                      </div>
                      {/* <div className="flex">
                        <p
                          onClick={goToNonmember}
                          className="text-blue-600 text-sm ml-auto mb-3 mr-2 cursor-pointer"
                        >
                          비회원 주문
                        </p>
                      </div> */}
                      <div className="flex items-center justify-between pb-6">
                        <div className="ml-auto">
                          <input
                            type="button"
                            defaultValue="회원가입"
                            onClick={goToSignUp}
                            className="inline-block items-center cursor-pointer w-full text-center rounded-2xl border-2 px-6 text-sm font-medium leading-normal transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700"
                          ></input>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <img
                  src={require("../../../assets/example1.jpg")}
                  alt=""
                  className="hidden items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none lg:block"
                ></img>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
