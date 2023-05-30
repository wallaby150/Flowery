import React, { useState, useEffect, useRef } from "react";
import { useRecoilState } from "recoil";
import { letterPaperState } from "../../../recoil/atom";

export default function ReleaseLetterPaper() {
  const [letterPaper, setLetterPaper] =
    useRecoilState<number>(letterPaperState);
  const [startIndex, setStartIndex] = useState<number>(0);
  const visibleFontsCount = 3;

  // 편지지 종류 갯수
  const letterPapers: number[] = [];
  for (let i = 1; i <= 5; i++) {
    letterPapers.push(i);
  }

  return (
    <div
      className="flex justify-center border-t h-[150px]"
    >
      {/* 글씨체 고르기 */}
      <div className="flex justify-between p-2 w-[35em]">
        {/* 왼쪽 화살표 */}
        {startIndex !== 0 ? (
          <input
            type="button"
            value="&lt;"
            onClick={() => setStartIndex(startIndex - 1)}
            className="cursor-pointer"
          ></input>
        ) : (
          <div></div>
        )}
        {letterPapers
          .slice(startIndex, startIndex + visibleFontsCount)
          .map((i: number) => (
            <div key={i} className="">
              <img
                src={require(`../../../assets/letters/Letter${i}.png`)}
                onClick={() => setLetterPaper(i)}
                className="w-[100px] p-2 cursor-pointer"
              />
            </div>
          ))}
        {/* 오른쪽 화살표 */}
        {startIndex + visibleFontsCount < letterPapers.length ? (
          <input
            type="button"
            value="&gt;"
            onClick={() => setStartIndex(startIndex + 1)}
            className="cursor-pointer"
          ></input>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
}
