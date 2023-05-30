import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import Card0 from "../../../assets/Card0.png";
import Card1 from "../../../assets/Card1.png";
import QRImg from "../../../assets/ReleasePage/qr_example.png";
import Alert from "../../../assets/alert.png";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  cardContent,
  cardImgFileState,
  cardName,
  cardState,
  isCardContent,
  isCardName,
  shopDataState,
} from "../../../recoil/atom";
import styles from "./CardPreview.module.scss";

interface CardProps {
  card: number;
}

export default function CardPreview() {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [cardImgFile, setCardImgFile] = useRecoilState<File | null>(
    cardImgFileState
  );
  const [name, setName] = useRecoilState<string>(cardName);
  const [content, setContent] = useRecoilState<string>(cardContent);
  const card = useRecoilValue<number>(cardState);
  const shopData = useRecoilValue<any>(shopDataState);
  const [inputName, setInputName] = useState<string>("");
  const [inputContent, setInputContent] = useState<string>("");
  const [isName, setIsName] = useRecoilState<boolean>(isCardName);
  const [isContent, setIsContent] = useRecoilState<boolean>(isCardContent);
  const [cardDisplayed, setCardDisplayed] = useState(false);

  useEffect(() => {
    function drawMultilineText(
      ctx: CanvasRenderingContext2D,
      text: string,
      x: number,
      y: number,
      maxWidth: number,
      lineHeight: number
    ) {
      const words = text.split(" ");
      let line = "";
      let posY = y;
      for (let i = 0; i < words.length; i++) {
        const testLine = line + words[i] + " ";
        const metrics = ctx.measureText(testLine);
        const testWidth = metrics.width;
        if (testWidth > maxWidth && i > 0) {
          ctx.fillText(line, x, posY);
          line = words[i] + " ";
          posY += lineHeight;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, x, posY);
    }

    function mergeImages(
      image1Url: string,
      text: string,
      text2: string,
      text3: string,
      outputFileName: string
    ) {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const image1 = new Image();
      image1.onload = () => {
        canvas.width = image1.width;
        canvas.height = image1.height;

        if (ctx) {
          ctx.drawImage(image1, 0, 0);

          ctx.font = "120px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          ctx.textBaseline = "bottom";
          drawMultilineText(
            ctx,
            text,
            canvas.width / 2,
            canvas.height * 0.555,
            1500,
            180
          );

          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text2,
            canvas.width / 2,
            canvas.height * 0.46,
            900,
            100
          );

          const { width: width2, actualBoundingBoxDescent: descent2 } =
            ctx.measureText(text2);
          ctx.beginPath();
          ctx.strokeStyle = "#000000";
          ctx.lineWidth = 8;
          ctx.moveTo(
            canvas.width / 2 - width2 / 2 - 20,
            canvas.height * 0.46 + descent2 + 45
          );
          ctx.lineTo(
            canvas.width / 2 + width2 / 2,
            canvas.height * 0.46 + descent2 + 45
          );

          ctx.font = "100px KCC";
          ctx.fillStyle = "#000000";
          ctx.textAlign = "center";
          drawMultilineText(
            ctx,
            text3,
            canvas.width / 2,
            canvas.height * 0.76,
            900,
            100
          );
          canvas.toBlob(
            (blob) => {
              if (blob) {
                const file = new File([blob], outputFileName, {
                  type: "image/jpeg",
                });
                setCardImgFile(file);
              }
            },
            "image/jpeg",
            1
          );
        }
      };
      image1.src = image1Url;
    }
    mergeImages(
      cardFrame(),
      `${content}`,
      `From. ${name}`,
      // "kkotdeul",
      shopData.storeName,
      "card"
    );
  }, [card, content, name]);

  // 카드 종류 고르기
  const cardFrame = () => {
    if (card === 0) {
      return Card0;
    } else {
      return Card1;
    }
  };

  // 카드 이름 유효성 검사
  const checkName = (e: React.ChangeEvent<HTMLInputElement>) => {
    let name = "";
    const noEmoji =
      /^[0-9a-zA-Zㄱ-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\" ]*$/;
    for (let i = 0; i < e.target.value.length; i++) {
      if (noEmoji.test(e.target.value[i])) {
        name += e.target.value[i];
      }
    }
    const nameInput = name.slice(0, 6);
    e.target.value = nameInput;
  };

  // 카드 글 유효성 검사
  const checkContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    let content = "";
    const noEmoji =
      /^[0-9a-zA-Zㄱ-힣\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\" ]*$/;

    for (let i = 0; i < e.target.value.length; i++) {
      if (noEmoji.test(e.target.value[i])) {
        content += e.target.value[i];
      }
    }
    const contentInput = content.slice(0, 30);
    e.target.value = contentInput;
  };

  const handleCardDisplayed = () => {
    setCardDisplayed(true);
  };

  useEffect(() => {
    if (document.getElementById("card")) {
      window.scrollTo(0, 0);
    }
  }, [cardDisplayed]);

  return (
    <div className="">
      <div className={styles.fontcheck}></div>
      <div className="relative">
        {cardImgFile && (
          <img
            src={URL.createObjectURL(cardImgFile)}
            onLoad={handleCardDisplayed}
          />
        )}

        <img src={QRImg} className="absolute w-[15%] top-[26%] left-[43%]" />
      </div>

      {cardDisplayed && (
        <div id="card">
          <p className="mx-auto mt-2 text-xs text-center font-nasq font-bold">
            선물 주는 분의 이름을 적어주세요.
          </p>
          <div className="flex justify-center w-full">
            <input
              autoFocus
              autoComplete="off"
              onBlur={(e: any) => {
                setName(e.target.value);
                setIsName(true);
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                checkName(e);
              }}
              defaultValue={name}
              placeholder="ex) From. 아들"
              className={`w-full mt-1 text-center border focus:outline-[#eed3b5] ${
                !isName && "border-2 border-red-500"
              } `}
            ></input>
            {!isName && (
              <span className="">
                <img src={Alert} alt="" className="absolute w-[5%] mt-2" />
              </span>
            )}
          </div>
          <p className="mx-auto mt-2 text-xs text-center  font-nasq font-bold">
            한 줄로 마음을 전하세요.
          </p>
          <div className="flex justify-center">
            <input
              autoComplete="off"
              onBlur={(e) => {
                setIsContent(true);
                setContent(e.target.value);
              }}
              onChange={checkContent}
              defaultValue={content}
              placeholder="ex) 부모님 사랑합니다"
              className={`w-full my-1 text-center border focus:outline-[#eed3b5] ${
                !isContent && "border-2 border-red-500"
              } `}
            ></input>
            {!isContent ? (
              <span className="">
                <img src={Alert} alt="" className="absolute w-[5%] mt-2" />
              </span>
            ) : (
              <></>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
