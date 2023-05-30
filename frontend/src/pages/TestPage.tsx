import React, { useRef } from "react";
import QRCode from "qrcode.react";
import html2canvas from "html2canvas";

function App() {
  const qrCodeRef = useRef(null);

  // QR 코드를 생성하는 데이터
  const data = "https://www.example.com/";

  const handleSaveAndPrint = () => {
    // QR 코드가 들어있는 div 요소를 가져옵니다.
    const qrCodeDiv = qrCodeRef.current;
    if (qrCodeDiv) {
      // div 요소를 이미지로 변환합니다.
      html2canvas(qrCodeDiv).then((canvas: HTMLCanvasElement) => {
        // 이미지를 저장합니다.
        const imageUrl = canvas.toDataURL();

        // 새 창을 열어서 이미지를 출력합니다.
        const printWindow: Window | null = window.open();
        if (printWindow) {
          printWindow.document.write(
            `<img src="${imageUrl}" onload="window.print();window.close()">`
          );
        }
      });
    }
  };

  return (
    <div>
      <div ref={qrCodeRef}>
        {/* QR 코드를 출력합니다. */}
        <QRCode value={data} />
      </div>

      {/* 이미지를 저장하고 출력하는 버튼 */}
      <button onClick={handleSaveAndPrint}>Save and Print</button>
    </div>
  );
}

export default App;
