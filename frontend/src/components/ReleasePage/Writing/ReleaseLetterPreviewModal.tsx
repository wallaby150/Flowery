import React, { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { imageState, totalTextState } from "../../../recoil/atom";
import ReleaseLetterPreview from "./ReleaseLetterPreview";
import Flower from "../../../assets/example1.jpg";

const ReleaseLetterPreviewModal = React.forwardRef<HTMLDivElement, any>(
  (props, ref) => {
    const letter = useRecoilValue<string>(totalTextState);
    const navigate = useNavigate();

    const close = () => {
      props.onClose();
    };

    return (
      <div className="p-10 w-screen h-screen bg-opacity-50 fixed top-0 left-0 z-[10] overflow-x-hidden bg-black">
        <div className="h-screen items-center justify-center">
          {/* 입력한 편지 */}
          {letter && (
            <div className="flex-col items-center justify-center rounded-lg ">
              <div ref={ref}>
                <img
                  src={Flower}
                  alt=""
                  className="items-center justify-center mx-auto"
                />
                <div className="flex flex-col justify-center items-center ">
                  {ReleaseLetterPreview()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default ReleaseLetterPreviewModal;
