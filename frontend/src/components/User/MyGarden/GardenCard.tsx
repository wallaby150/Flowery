import React, { useEffect, useRef, useState } from "react";
import { useRecoilState } from "recoil";
import { cardImg } from "../../../recoil/atom";
import GardenCardModal from "./GardenCardModal";

interface cardType {
  flowerPicture: string;
  font: number;
  mean: string;
  message: string;
  messageDate: string;
  renderedCard: string;
  messageId: string;
  pictures: string[];
  poem: string;
  video: string;
}

const GardenCard = (props: { card: cardType }) => {
  const [selectCard, setSelectCard] = useState<boolean>(false);

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
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setSelectCard(false);
    }
  };

  // esc를 누르면 Modal 닫힘
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.code === "Escape") {
      setSelectCard(false);
    }
  };

  return (
    <div className="flex-col">
      {selectCard && <GardenCardModal ref={modalRef} card={props.card} />}
      <div className="h-full p-4">
        <img
          src={props.card.renderedCard}
          onClick={() => {
            setSelectCard(true);
            window.scrollTo({ top: 0 });
          }}
          className=" max-w-full rounded-lg"
        />
      </div>
    </div>
  );
};

export default GardenCard;
