import React from "react";
import styles from "./PrintCard.module.scss";
import { saveAs } from "file-saver";
interface PrintCardProps {
  closeModal: () => void;
  renderedCard: string;
}

export default function PrintCard(props: PrintCardProps) {
  function handleClick() {
    props.closeModal();
  }

  function mergeImages(image1Url: string, outputFileName: string) {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const image1 = new Image();
    image1.setAttribute("crossorigin", "anonymous");
    image1.onload = () => {
      canvas.width = image1.width;
      canvas.height = image1.height;

      // draw image1
      if (ctx) {
        ctx.drawImage(image1, 0, 0);
        canvas.toBlob(
          (blob) => {
            if (blob) {
              saveAs(blob, outputFileName);
            } else {
              console.error("Failed to convert canvas to blob");
            }
          },
          "image/jpeg",
          1
        );
      }
    };
    image1.src = image1Url;
  }

  function handlePrint() {
    mergeImages(props.renderedCard, "test1");
    props.closeModal();
  }

  return (
    <div className={styles.modal}>
      <div className={styles.fontcheck}>.</div>
      <div className={styles.modalContent}>
        <div className={styles.stepone}>
          <div>
            <p className={styles.steptitle}>카드를 다시 가져오시겠습니까?</p>
          </div>
        </div>
        <button className={styles.successbutton} onClick={() => handlePrint()}>
          가져오기
        </button>
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
