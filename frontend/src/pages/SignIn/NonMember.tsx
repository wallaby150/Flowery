import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { phoneNumberState } from "../../recoil/atom";
import { useSetRecoilState } from "recoil";

export default function SignUpPage() {
  const [isVerify, setIsVerify] = useState<boolean>(false);
  const [inputPhone, setInputPhone] = useState<string>("");
  const [isPhoneNum, setIsPhoneNum] = useState<boolean>(false);
  const [clickVerify, setClickVerify] = useState<boolean>(false);
  const [verifyCode, setVerifyCode] = useState<string>("");
  const setPhoneNumber = useSetRecoilState(phoneNumberState);

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
    // 인증 번호 보내기
    alert("인증번호가 전송됐습니다!");
    setClickVerify(true);
  };

  // 휴대폰 번호 인증 버튼 Enter
  const pressCheck = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (isPhoneNum && event.key === "Enter") {
      checkVerify();
    }
  };

  // 인증 번호 확인
  const checkCode = () => {
    console.log("인증번호 확인");

    // 인증 번호가 일치하면
    // if (verifyCode === 인증번호) {
    alert("인증되었습니다!"); // 모달창으로 예쁘게 만들기
    setPhoneNumber(inputPhone);
    navigate("/reservation");
    // }
  };

  // 인증 번호 확인 Enter
  const pressEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      checkCode();
    }
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
              전화번호를 인증하고 추억을 선물하세요
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
                placeholder=" "
                className={`peer block text-sm min-h-[auto] w-full rounded-xl border-2 border-gray-200 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none focus:border-neutral-300 ${
                  isVerify ? "bg-gray-200" : ""
                }`}
              />
              <label
                htmlFor="phoneNumber"
                className={`absolute text-sm cursor-text bg-white text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-primary peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1`}
              >
                전화번호
              </label>
              {!isVerify && (
                <button
                  type="button"
                  disabled={!isPhoneNum}
                  onClick={checkVerify}
                  className={`absolute flex inset-y-0 right-0 h-full w-1/5 rounded-xl text-xs font-medium leading-normal ${
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
          </div>
        </div>
      </div>
    </section>
  );
}
