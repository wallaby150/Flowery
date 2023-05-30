import React, { useState, useRef, useEffect } from "react";
import Letters from "../ProtoPage/Letters";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  imageState,
  reservationConfirmState,
  totalTextState,
  videoState,
} from "../../../recoil/atom";
import { useNavigate } from "react-router-dom";
import ReleaseMemories from "./ReleaseMemories";
import ReleaseSubmitModal from "./ReleaseSubmitModal";
import ReleaseMore from "./ReleaseMore";
import ReleaseProtoIntro from "./ReleaseProtoIntro";
import ReleaseLetters from "./ReleaseLetters";
import ReleaseCard from "./ReleaseCard";
import Arrow from "../../../assets/arrow.png";

const ReleasePreviewModal = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    // const [reservationConfirm, setReservationConfirm] =
    //   useRecoilState<boolean>(reservationConfirmState);
    const [reservationConfirm, setReservationConfirm] =
      useState<boolean>(false);
    const letter = useRecoilValue<string>(totalTextState);
    const image = useRecoilValue<Array<File>>(imageState);
    const video = useRecoilValue<File | null>(videoState);
    const [clickQR, setClickQR] = useState<boolean>(false);
    const [cardDisplayed, setCardDisplayed] = useState(false);

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleKeyDown);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleKeyDown);
      };
    }, []);

    // Modal 이외의 곳을 클릭 하면 Modal 닫힘
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setReservationConfirm(false);
      }
    };

    // esc를 누르면 Modal 닫힘
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        setReservationConfirm(false);
      }
    };

    const testQr =
      "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFeUlEQVR4Xu3Q0apcOQxE0fn/n87MPFxolqjIljs4Dw7sQO2S1Tr3n1+/fv3z+Hso4nGXIh53KeJxlyIedynicZciHncp4nGXIh53KeJxlyIedynicZciHncp4nGXIh53KeJxlyIedyliwn///v9vm9X3zvn7kt5P+1XcM6GICR62yup75/x9Se+n/SrumVDEhN2D0rzeD064R9K8ufOJ3fnfUcSE3YPSvP4nd7hH0ry584nd+d9RxAQP+vz4T+x3s77rk+/6lMXe/ROKmOBBHp763azv+uS7PmWxd/+EIiZ4kIen3pzw99I7+zQnad4s9u6ZUMQED/Lw1JsT/l56Z5/mJM2bxd49E4qY4EEenvq0x14/7Xd/zyz27p9QxAQP8vDUpz32+mm/+3tmsXf/hCIm7B7kvDl5c/I/ucP5lDt2539HERN2D3LenLw5+Z/c4XzKHbvzv6OICX7oKr7/2/IuP+9PKGKCh63i+78t7/Lz/oQibuAH7WZ916/6GxRxA/8gu1nf9av+BkWc4IelvIrvzPquN4vvnO+8+yYUcYKHpbyK78z6rjeL75zvvPsmFPEnSB8iXS+7e6XrnZPVuR2K+BOsHt71srtXut45WZ3boYgTPFCc832H73Zz8inLan9CESd4oDjn+w7f7ebkU5bV/oQiTvDA7tDVuW5+NXc4b9b/CYo4wcO7D1id6+ZXc4fzZv2foIgJ3aF+UMJ3vjfr7fXiHknzKX+DIiZ0h/mhCd/53qy314t7JM2n/A2K+Abdh3VzKYt92r/qU5+yuGdCEd9g9dA0l7LYp/2rPvUpi3smFHFCOlAvaY9enDMn//nbK6R9qT+hiBPSoXpJe/TinDn5z99eIe1L/QlFnOChkubNenuz7Pbpd1LvnP6EIk7wQyTNm/X2Ztnt0++k3jn9CUWc4Id4cPL2+in+XofvUu78CUWc4Ad6cPL2+in+XofvUu78CUV8k/TB9uZE977DebPYd/kbFPFNfg5Oh+udl+59h/Nmse/yNyjihJ8DPTTlDvcnfOf7LstqL85NKOKEdGDKHe5P+M73XZbVXpybUMQ38dAudz71KSfSPnuzpHcnFPFNPLTLnU99yom0z94s6d0JRUzYPaybc5+kubTH3OG8e2V1boUiJqQPSnRz7pM0l/aYO5x3r6zOrVDECR7W5V1+3runy7verE84P6GIEzysy7ukP0CXd71Zn3B+QhETPCwdmPrkJc3pE8673z6R5vUTipjgwenA1CcvaU6fcN799ok0r59QxAke3h2a+tX3znfevfaJNG/+BkWc4OHdwalffe98591rn0jz5m9QxITVw1Y/zCxpj71Zn/oO37nvhCImrB62+mFmSXvszfrUd/jOfScUcQM/WLr55Lte7+/Yp7nkJxRxAz9Yuvnku17v79inueQnFDHBg1fxvXvFOffZO6dPfcoJ951QxAQPXMX37hXn3GfvnD71KSfcd0IRE3YPc96sT/0uaZ9ZTvsdipiwe5DzZn3qd0n7zHLa71DEBA/6/OhP7NMe6eb05uTNq3ze8m2KmOChfkDq0x7p5vTm5M2rfN7ybYqY4KF+QOrN+kSac0+aS/P6lDt/QhETPOzzIz+xN+sTac49aS7N61Pu/AlFTPCwz4/8xN49Hb5b3W/WS5rTr/Y7FDHBg/zA1Lunw3er+816SXP61X6HIibsHuT85x/jE/uUpduTcI+szp1QxITdQ533D5P6lKXbk3CPrM6dUMQEP2wV96yS3ne+67ucvPtOKGKCB6/inlXS+853fZeTd98JRTzuUsTjLkU87lLE4y5FPO5SxOMuRTzuUsTjLkU87lLE4y5FPO5SxOMuRTzuUsTjLkU87lLE4y5FPO7yLzlfyaZBh5WvAAAAAElFTkSuQmCC";

    const handleCardDisplayed = () => {
      setCardDisplayed(true);
    };
    return (
      <div className="absolute inset-x-0 h-[600%] overflow-y-hidden-scroll bg-opacity-50 bg-black z-[20]">
        <div className="m-auto sm:w-full md:w-1/2 lg:w-[34%] p-10">
          {reservationConfirm && (
            <ReleaseSubmitModal
              onClose={() => setReservationConfirm(false)}
              ref={ref}
            />
          )}
          <div ref={ref} className="bg-white ">
            {!clickQR ? (
              <div className="w-full relative">
                <ReleaseCard onLoad={handleCardDisplayed} />
                {cardDisplayed && (
                  <div>
                    <div className="absolute top-0 right-0 cursor-pointer bg-white p-1">
                      <svg
                        onClick={props.onClose}
                        className="w-3.5 h-3.5  stroke-gray-400 hover:stroke-black"
                        width="8"
                        height="8"
                        viewBox="0 0 8 8"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <div className="absolute flex w-[8%] top-[28.5%] left-[20%]">
                      {/* <p className="mr-2 font-bold text-red-500">Click!</p> */}
                      <img src={Arrow} className="" />
                    </div>
                    <div className="w-full mx-auto flex items-center justify-center">
                      <img
                        src={`data:image/png;base64,${testQr}`}
                        alt="qr"
                        onClick={() => setClickQR(true)}
                        className="absolute mx-auto w-[24%] top-[22.9%] cursor-pointer "
                      />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="relative">
                <div className="absolute top-0 right-0 cursor-pointer z-40 bg-white p-1">
                  <svg
                    onClick={props.onClose}
                    className="w-3.5 h-3.5  stroke-gray-400 hover:stroke-black"
                    width="8"
                    height="8"
                    viewBox="0 0 8 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.258206 1.00652C0.351976 0.912791 0.479126 0.860131 0.611706 0.860131C0.744296 0.860131 0.871447 0.912791 0.965207 1.00652L3.61171 3.65302L6.25822 1.00652C6.30432 0.958771 6.35952 0.920671 6.42052 0.894471C6.48152 0.868271 6.54712 0.854471 6.61352 0.853901C6.67992 0.853321 6.74572 0.865971 6.80722 0.891111C6.86862 0.916251 6.92442 0.953381 6.97142 1.00032C7.01832 1.04727 7.05552 1.1031 7.08062 1.16454C7.10572 1.22599 7.11842 1.29183 7.11782 1.35822C7.11722 1.42461 7.10342 1.49022 7.07722 1.55122C7.05102 1.61222 7.01292 1.6674 6.96522 1.71352L4.31871 4.36002L6.96522 7.00648C7.05632 7.10078 7.10672 7.22708 7.10552 7.35818C7.10442 7.48928 7.05182 7.61468 6.95912 7.70738C6.86642 7.80018 6.74102 7.85268 6.60992 7.85388C6.47882 7.85498 6.35252 7.80458 6.25822 7.71348L3.61171 5.06702L0.965207 7.71348C0.870907 7.80458 0.744606 7.85498 0.613506 7.85388C0.482406 7.85268 0.357007 7.80018 0.264297 7.70738C0.171597 7.61468 0.119017 7.48928 0.117877 7.35818C0.116737 7.22708 0.167126 7.10078 0.258206 7.00648L2.90471 4.36002L0.258206 1.71352C0.164476 1.61976 0.111816 1.4926 0.111816 1.36002C0.111816 1.22744 0.164476 1.10028 0.258206 1.00652Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <ReleaseProtoIntro />
                {(image.length > 0 || video) && <ReleaseMemories />}
                {letter && <ReleaseLetters />}
                <ReleaseMore />
                <div className="flex justify-center pb-6">
                  <span
                    onClick={props.onClose}
                    className="cursor-pointer border rounded-full p-2 px-4 mr-2 font-bold text-white bg-user_green"
                  >
                    이전으로
                  </span>
                  <span
                    onClick={() => {
                      window.scrollTo({ top: 0 });
                      setReservationConfirm(true);
                    }}
                    className="cursor-pointer border rounded-full p-2 px-4 ml-2 font-bold text-white bg-user_green"
                  >
                    제출하기
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

export default ReleasePreviewModal;
