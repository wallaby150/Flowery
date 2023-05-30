import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";
import axios from "axios";
import Card0 from "../../../assets/Card0.png";
import Card1 from "../../../assets/Card1.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { cardContent, cardName, cardState } from "../../../recoil/atom";

interface CardProps {
  card: number;
}

export default function ReleaseCard({ onLoad }: any) {
  const [imgUrl, setImgUrl] = useState<string>("");
  const [name, setName] = useRecoilState<string>(cardName);
  const [content, setContent] = useRecoilState<string>(cardContent);
  const card = useRecoilValue<number>(cardState);

  // 카드 그리기
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
        // ctx.stroke();

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
        setImgUrl(canvas.toDataURL());
      }
    };
    image1.src = image1Url;

    return (
      <div className="">
        <img src={imgUrl} onLoad={onLoad} />
      </div>
    );
  }
  const testQr =
    "iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAFeUlEQVR4Xu3Q0apcOQxE0fn/n87MPFxolqjIljs4Dw7sQO2S1Tr3n1+/fv3z+Hso4nGXIh53KeJxlyIedynicZciHncp4nGXIh53KeJxlyIedynicZciHncp4nGXIh53KeJxlyIedyliwn///v9vm9X3zvn7kt5P+1XcM6GICR62yup75/x9Se+n/SrumVDEhN2D0rzeD064R9K8ufOJ3fnfUcSE3YPSvP4nd7hH0ry584nd+d9RxAQP+vz4T+x3s77rk+/6lMXe/ROKmOBBHp763azv+uS7PmWxd/+EIiZ4kIen3pzw99I7+zQnad4s9u6ZUMQED/Lw1JsT/l56Z5/mJM2bxd49E4qY4EEenvq0x14/7Xd/zyz27p9QxAQP8vDUpz32+mm/+3tmsXf/hCIm7B7kvDl5c/I/ucP5lDt2539HERN2D3LenLw5+Z/c4XzKHbvzv6OICX7oKr7/2/IuP+9PKGKCh63i+78t7/Lz/oQibuAH7WZ916/6GxRxA/8gu1nf9av+BkWc4IelvIrvzPquN4vvnO+8+yYUcYKHpbyK78z6rjeL75zvvPsmFPEnSB8iXS+7e6XrnZPVuR2K+BOsHt71srtXut45WZ3boYgTPFCc832H73Zz8inLan9CESd4oDjn+w7f7ebkU5bV/oQiTvDA7tDVuW5+NXc4b9b/CYo4wcO7D1id6+ZXc4fzZv2foIgJ3aF+UMJ3vjfr7fXiHknzKX+DIiZ0h/mhCd/53qy314t7JM2n/A2K+Abdh3VzKYt92r/qU5+yuGdCEd9g9dA0l7LYp/2rPvUpi3smFHFCOlAvaY9enDMn//nbK6R9qT+hiBPSoXpJe/TinDn5z99eIe1L/QlFnOChkubNenuz7Pbpd1LvnP6EIk7wQyTNm/X2Ztnt0++k3jn9CUWc4Id4cPL2+in+XofvUu78CUWc4Ad6cPL2+in+XofvUu78CUV8k/TB9uZE977DebPYd/kbFPFNfg5Oh+udl+59h/Nmse/yNyjihJ8DPTTlDvcnfOf7LstqL85NKOKEdGDKHe5P+M73XZbVXpybUMQ38dAudz71KSfSPnuzpHcnFPFNPLTLnU99yom0z94s6d0JRUzYPaybc5+kubTH3OG8e2V1boUiJqQPSnRz7pM0l/aYO5x3r6zOrVDECR7W5V1+3runy7verE84P6GIEzysy7ukP0CXd71Zn3B+QhETPCwdmPrkJc3pE8673z6R5vUTipjgwenA1CcvaU6fcN799ok0r59QxAke3h2a+tX3znfevfaJNG/+BkWc4OHdwalffe98591rn0jz5m9QxITVw1Y/zCxpj71Zn/oO37nvhCImrB62+mFmSXvszfrUd/jOfScUcQM/WLr55Lte7+/Yp7nkJxRxAz9Yuvnku17v79inueQnFDHBg1fxvXvFOffZO6dPfcoJ951QxAQPXMX37hXn3GfvnD71KSfcd0IRE3YPc96sT/0uaZ9ZTvsdipiwe5DzZn3qd0n7zHLa71DEBA/6/OhP7NMe6eb05uTNq3ze8m2KmOChfkDq0x7p5vTm5M2rfN7ybYqY4KF+QOrN+kSac0+aS/P6lDt/QhETPOzzIz+xN+sTac49aS7N61Pu/AlFTPCwz4/8xN49Hb5b3W/WS5rTr/Y7FDHBg/zA1Lunw3er+816SXP61X6HIibsHuT85x/jE/uUpduTcI+szp1QxITdQ533D5P6lKXbk3CPrM6dUMQEP2wV96yS3ne+67ucvPtOKGKCB6/inlXS+853fZeTd98JRTzuUsTjLkU87lLE4y5FPO5SxOMuRTzuUsTjLkU87lLE4y5FPO5SxOMuRTzuUsTjLkU87lLE4y5FPO7yLzlfyaZBh5WvAAAAAElFTkSuQmCC";

  // 카드 종류 고르기
  const cardFrame = () => {
    if (card === 0) {
      return Card0;
    } else {
      return Card1;
    }
  };

  return (
    <div className="relative animate-fadeOut animation-delay-4000">
      {mergeImages(
        cardFrame(),
        `${content}`,
        `From. ${name}`,
        "kkotdeul",
        "test1"
      )}
    </div>
  );
}
