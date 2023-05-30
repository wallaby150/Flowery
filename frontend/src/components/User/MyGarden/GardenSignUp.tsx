import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  atk,
  phoneNumberState,
  userIdState,
  userNameState,
} from "../../../recoil/atom";
import { useSetRecoilState } from "recoil";
import { Cookies } from "react-cookie";
import axios from "axios";
import { useRecoilState } from "recoil";

export default function GardenSignUp() {
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [inputPhone, setInputPhone] = useState<string>("");
  const [dashPhoneNum, setDashPhoneNum] = useState<string>("");
  const [isPhoneNum, setIsPhoneNum] = useState<boolean>(false);
  const [clickVerify, setClickVerify] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [id, setId] = useRecoilState<string>(userNameState);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");

  const [isId, setIsId] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState<boolean>(false);

  const [wrongId, setWrongId] = useState<boolean>(false);
  const [existId, setExistId] = useState<boolean>(false);
  const [wrongPassword, setWrongPassword] = useState<boolean>(false);
  const [wrongPasswordConfirm, setWrongPasswordConfirm] =
    useState<boolean>(false);
  const [accessToken, setAccessToken] = useRecoilState<string>(atk);
  const setUserId = useSetRecoilState<number>(userIdState);

  const navigate = useNavigate();

  // 휴대폰 번호 유효성 검사
  const checkPhoneNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    let num = "";
    const isNum = /^[0-9]+$/;
    for (let i = 0; i < event.target.value.length; i++) {
      if (isNum.test(event.target.value[i])) {
        num += event.target.value[i];
      }
    }
    setInputPhone(num);
  };

  const regPhone = /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/;
  useEffect(() => {
    if (regPhone.test(inputPhone)) {
      setIsPhoneNum(true);
    } else {
      setIsPhoneNum(false);
    }
  }, [inputPhone]);

  // 휴대폰 번호 인증 버튼 클릭
  const checkVerify = () => {
    let phoneNum = "";
    if (inputPhone.length === 11) {
      phoneNum =
        inputPhone.slice(0, 3) +
        "-" +
        inputPhone.slice(3, 7) +
        "-" +
        inputPhone.slice(7, 11);
    } else {
      phoneNum =
        inputPhone.slice(0, 3) +
        "-" +
        inputPhone.slice(3, 6) +
        "-" +
        inputPhone.slice(6, 10);
    }
    setDashPhoneNum(phoneNum);

    // 인증 번호 보내기
    axios
      .post("https://host 명/api/sms/send-cert", {
        phone: phoneNum,
      })
      .then((response) => {
        setClickVerify(true);
        alert("인증번호가 전송됐습니다!");
      })
      .catch((e) => alert("인증번호 전송에 실패했습니다"));
  };

  // 휴대폰 번호 인증 버튼 Enter
  const pressCheck = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPhoneNum && event.key === "Enter") {
      checkVerify();
    }
  };

  // 인증 번호 확인
  const checkCode = () => {
    // 인증 번호가 일치하면
    const params = { phone: dashPhoneNum, code: verifyCode };
    axios
      .get("https://host 명/api/sms/certification", { params })
      .then((response) => {
        // setIsVerify(true);
        if (response.data) {
          setPhoneNumber(inputPhone);
          setIsVerify(true);
          alert("인증번호 확인됐습니다!");
        } else {
          alert("인증에 실패했습니다!\n인증번호는 3분간 유효합니다");
        }
      });
  };

  // 인증 번호 확인 Enter
  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkCode();
    }
  };

  // 회원가입 유효성 검사
  function CheckId(name: string) {
    if (/^[a-zA-Z0-9]{4,16}$/.test(name)) {
      return 1;
    } else {
      return 0;
    }
  }

  function CheckPassword(password: string) {
    if (
      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,16}/.test(password)
    ) {
      return 1;
    } else {
      return 0;
    }
  }
  function CheckPasswordConfirm(passwordConfirm: string) {
    if (password === passwordConfirm) {
      return 1;
    } else {
      return 0;
    }
  }

  // 중복 아이디 확인
  function isExistId(name: string) {
    const params = { id: name };
    axios
      .get("https://host 명/api/users/id-check", { params })
      .then((response) => {
        if (response.data === false) {
          setExistId(true);
        }
      });
  }

  // 회원가입
  const signUpComplete = () => {
    axios
      .post("https://host 명/api/users/register", {
        id: id,
        pass: password,
        phone: dashPhoneNum,
      })
      .then((response) => {
        alert("회원가입이 완료되었습니다!");
        // 로그인
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
                setUserId(res.data.userId);
                setAccessToken(response.data.atk);
                cookie.set("refreshToken", response.data.rtk);
                navigate("/reservation");
              })
              .catch((e) => {
                alert("로그인에 실패했습니다");
                navigate("/signin");
              });
          })
          .catch((e) => {
            alert("로그인에 실패했습니다");
            navigate("/signin");
          });
      })
      .catch((error) => alert("회원가입에 실패했습니다."));
  };

  return (
    <section className="bg-neutral-200">
      <div className="flex flex-col items-center px-4 py-8 mx-auto h-screen lg:p-10">
        <div className="w-full bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <img
              className="mx-auto w-48"
              src={require("../../assets/logo.png")}
              alt="logo"
            />
            <h1 className="text-lg text-center font-bold leading-tight tracking-tight text-gray-900 md:text-xl">
              회원이 되어 영원한 추억을 간직하세요
            </h1>
            <div className="relative mb-4">
              <input
                type="tel"
                id="phoneNumber"
                disabled={isVerify && true}
                onChange={
                  // (event: React.ChangeEvent<HTMLInputElement>) => {
                  // setInputPhone(event.target.value);
                  // }
                  checkPhoneNum
                }
                value={inputPhone}
                onKeyDown={pressCheck}
                autoComplete="off"
                placeholder=" "
                className={`peer block text-sm min-h-[auto] w-full rounded-xl border-2 border-gray-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:border-neutral-300 ${
                  isVerify ? "bg-gray-200" : ""
                }`}
              />
              <label
                htmlFor="phoneNumber"
                className={`absolute text-sm cursor-text bg-white text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
              >
                전화번호
              </label>
              {!isVerify && (
                <button
                  disabled={!isPhoneNum}
                  onClick={checkVerify}
                  className={`absolute flex inset-y-0 right-0 h-full w-1/4 rounded-xl text-xs font-medium leading-normal ${
                    isPhoneNum
                      ? "bg-red-300 text-white  shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] hover:outline-none hover:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] "
                      : "bg-gray-50 text-gray-300"
                  }`}
                >
                  인증
                </button>
              )}
            </div>

            {!isVerify && clickVerify && (
              <div className="relative mb-4" data-te-input-wrapper-init>
                <input
                  type="text"
                  onKeyDown={pressEnter}
                  className="peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:border-neutral-300"
                  id="exampleFormControlInput1"
                  placeholder=" "
                  onChange={(e) => setVerifyCode(e.target.value)}
                />
                <label
                  htmlFor="exampleFormControlInput1"
                  className="absolute text-sm cursor-text text-gray-500 duration-150 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                >
                  인증번호
                </label>
              </div>
            )}

            {!isVerify && clickVerify && (
              <button
                onClick={checkCode}
                className="mb-3 inline-block w-full rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium leading-normal bg-red-300 text-white transform shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
              >
                확인
              </button>
            )}

            {isVerify && (
              <form className="space-y-4 md:space-y-6" action="#">
                <div className="relative mb-4" data-te-input-wrapper-init>
                  <input
                    type="text"
                    className={`peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:border-neutral-300 ${
                      wrongId ? "border-red-700 border-2" : ""
                    }`}
                    id="id"
                    placeholder=" "
                    // onBlur={(e: React.FocusEvent<HTMLInputElement>) =>
                    //   isExistId(e.target.value).then((res: any) => {
                    //     setExistId(res);
                    //   })
                    // }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setId(e.target.value);
                      setExistId(false);
                      if (CheckId(e.target.value) === 1) {
                        setIsId(true);
                        setWrongId(false);
                      } else {
                        setIsId(false);
                      }
                    }}
                    onBlur={(e: React.ChangeEvent<HTMLInputElement>) =>
                      isExistId(e.target.value)
                    }
                  />
                  <label
                    htmlFor="id"
                    className="absolute text-sm cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    아이디
                  </label>
                  <ul>
                    {existId ? (
                      <ul className="text-xs ml-2 text-red-700">
                        이미 존재하는 아이디입니다!
                      </ul>
                    ) : null}
                    {id === "" || /^[a-zA-Z0-9]{4,16}$/.test(id) ? null : (
                      <ul className="text-xs ml-2 text-red-500">
                        4~16자 영문 대 소문자, 숫자만 사용 가능합니다!
                      </ul>
                    )}
                  </ul>
                </div>
                <div className="relative mb-4" data-te-input-wrapper-init>
                  <input
                    type="password"
                    className={`peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none  focus:border-neutral-300 ${
                      wrongPassword ? "border-red-700 border-2 " : ""
                    }`}
                    id="password"
                    placeholder=" "
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (CheckPassword(e.target.value) === 1) {
                        setIsPassword(true);
                        setWrongPassword(false);
                      } else {
                        setIsPassword(false);
                      }
                      if (e.target.value === passwordConfirm) {
                        setIsPasswordConfirm(true);
                        setWrongPasswordConfirm(false);
                      } else {
                        setIsPasswordConfirm(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="password"
                    className="absolute text-sm cursor-text text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    비밀번호
                  </label>
                  {password === "" || CheckPassword(password) ? null : (
                    <p className="text-xs ml-2 text-red-500">
                      8~16자 영문 대 소문자, 숫자, 특수문자(!,@,#,$,%,^,&,*)를
                      모두 사용해야 합니다!
                    </p>
                  )}
                </div>
                <div className="relative mb-4" data-te-input-wrapper-init>
                  <input
                    type="password"
                    className={`peer block min-h-[auto] w-full rounded-xl border-2 border-gray-200 px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:border-neutral-300 ${
                      wrongPasswordConfirm ? "border-red-700 border-2" : ""
                    }`}
                    id="passwordConfirm"
                    placeholder=" "
                    onChange={(e) => {
                      setPasswordConfirm(e.target.value);
                      if (CheckPasswordConfirm(e.target.value) === 1) {
                        setIsPasswordConfirm(true);
                        setWrongPasswordConfirm(false);
                      } else {
                        setIsPasswordConfirm(false);
                      }
                    }}
                  />
                  <label
                    htmlFor="passwordConfirm"
                    className="absolute text-sm cursor-text text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
                  >
                    비밀번호 확인
                  </label>
                  {passwordConfirm === "" ||
                  CheckPasswordConfirm(passwordConfirm) ? null : (
                    <div className="text-xs ml-2 text-red-500">
                      비밀번호가 일치하지 않습니다!
                    </div>
                  )}
                </div>
                <div
                  onClick={async (e) => {
                    if (
                      isId === true &&
                      existId === false &&
                      isPassword === true &&
                      isPasswordConfirm === true
                    ) {
                      signUpComplete();
                    } else {
                      if (isId === false || existId === true) {
                        setWrongId(true);
                      }
                      if (isPassword === false) {
                        setWrongPassword(true);
                      }
                      if (isPasswordConfirm === false) {
                        setWrongPasswordConfirm(true);
                      }
                    }
                  }}
                  className="mb-3 inline-block w-full text-center rounded-xl px-6 pb-2 pt-2.5 text-xs font-medium leading-normal bg-red-300 text-white ease-in-out shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                >
                  회원가입
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
