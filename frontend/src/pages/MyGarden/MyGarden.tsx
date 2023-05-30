import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import GardenCard from "../../components/User/MyGarden/GardenCard";
import { useRecoilValue } from "recoil";
import { userIdState } from "../../recoil/atom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import expand from "../../assets/expand.png";
import collapse from "../../assets/collapse.png";
import GardenCardModal from "../../components/User/MyGarden/GardenCardModal";
import api from "../../axios/AxiosInterceptor";
interface messageType {
  gardenId: number;
  messageId: string;
  userId: number;
}

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

export default function MyGarden() {
  const [messages, setMessages] = useState<Array<messageType>>([]);
  const [cards, setCards] = useState<Array<cardType>>([]);
  const [card, setCard] = useState<cardType>();
  const [isExpand, setIsExpand] = useState<boolean>(false);
  const userId = useRecoilValue<number>(userIdState);
  useEffect(() => {
    const getMessages = () => {
      api
        .post("https://host 명/api/myGarden/get", {
          userId: userId,
        })
        .then((response) => {
          console.log(response.data)
          response.data.map((message: messageType, idx: number) =>
            axios
              .post("https://host 명/api/messages/get-card", {
                messageId: message.messageId,
              })
              .then((response) => {
                setCards((prevCards) => [...prevCards, response.data]);
              }).catch((error) => console.log('error', error))
          );
          // setMessages(response.data);
        })
    };
    getMessages();
  }, []);
  // useEffect(() => {
  //   const getCards = async () => {
  //     messages.map((message: messageType, idx: number) =>
  //       api
  //         .post("https://host 명/api/messages/get-card", {
  //           messageId: message.messageId,
  //         })
  //         .then((response) => {
  //           setCards((prevCards) => [...prevCards, response.data]);
  //         })
  //     );
  //   };
  //   getCards();
  // }, [messages]);

  const handleExpand = () => {
    setIsExpand(!isExpand);
  };

  const settings = {
    infinite: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    vertical: true,
    verticalSwiping: true,
    draggable: true,
  };
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
    <div className="bg-user_beige min-h-screen">
      <div className="relative justify-end flex">
        <div className="p-4">
          {!isExpand ? (
            <img src={expand} onClick={handleExpand} className="w-[30px]" />
          ) : (
            <img src={collapse} onClick={handleExpand} className="w-[30px]" />
          )}
        </div>
      </div>
      <div>
        {cards.length > 0 ? (
          isExpand ? (
            <div className="h-screen">
              {selectCard && <GardenCardModal card={card} ref={modalRef} />}
              <Slider {...settings} className="h-screen">
                {cards.map((card: cardType, idx: number) => (
                  <div key={idx} className="flex-col">
                    <div className="h-full p-4">
                      <img
                        src={card.renderedCard}
                        onClick={() => {
                          setCard(card);
                          setSelectCard(true);
                          window.scrollTo({ top: 0 });
                        }}
                        className=" max-w-full rounded-lg"
                      />
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3">
              {cards.map((card: cardType, idx: number) => (
                <GardenCard key={idx} card={card} />
              ))}
            </div>
          )
        ) : (
          <div className="flex flex-col justify-center items-center">
            <p className="pt-4 font-nasq">저장된 카드가 없습니다</p>
          </div>
        )}
      </div>
    </div>
  );
}
