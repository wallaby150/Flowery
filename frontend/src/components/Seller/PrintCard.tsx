import React, { useState, useEffect } from "react";
import styles from "./PrintCard.module.scss";
import camera from "../../assets/add_logo.png";
import { saveAs } from "file-saver";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
import LoadingSpinner from "../Common/LoadingSpin";
interface PrintCardProps {
  closeModal: () => void;
  reservationId: number;
  printed: number;
  goodsName: string;
  price: number;
  reservationName: string;
  phrase: string;
  renderedCard: string;
  demand: string;
}

interface Goods {
  goodsId: number;
  goodsName: string;
  goodsPrice: number;
  goodsDetail: string;
  samples: any;
}

export default function PrintCard(props: PrintCardProps) {
  const [photoUrl1, setPhotoUrl1] = useState<string | null>(null);
  const [photoUrl2, setPhotoUrl2] = useState<string | null>(null);
  const [stepOne, setStepOne] = useState(false);
  const [stepTwo, setStepTwo] = useState(false);
  const [formdatas, setFormdatas] = useState<FormData | null>(null);
  const [flowerData, setFlowerData] = useState<Array<object>>([]);
  const [message, setMessage] = useState<string>("");
  const [recogOK, setRecogOK] = useState<boolean>(false);
  const [checkGoods, setCheckGoods] = useState<boolean>(false);
  const myStoreId = useRecoilValue(storeId);
  const [myGoods, setMyGoods] = useState<Goods[]>([]);
  const [selectedItem, setSelectedItem] = useState<Goods | null>(null);
  const [inputValue, setInputValue] = useState("");
  const myatk = sessionStorage.getItem("atk");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    axios
      .post(
        `https://host 명/api/goods/info`,
        {
          storeId: myStoreId,
        },
        {
          headers: {
            Authorization: `bearer ${myatk}`,
          },
        }
      )
      .then((response) => {
        setMyGoods(response.data as Goods[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  function handleClick() {
    props.closeModal();
  }

  function handleCameraClick1() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        fetch("https://host 명/flask/objectDetect", {
          method: "POST",
          body: formData,
        })
          .then((response) => {
            return response.json();
          })
          .catch(() => {
            alert("잘못된 사진입니다. 다시 입력해주세요.");
          })
          .then((data) => {
            setPhotoUrl1(data.file_url);

            const flowerDataArray = Object.entries(data.flower_object).map(
              ([flower, count]) => ({ flower, count })
            );
            setFlowerData(flowerDataArray);

            setMessage(data.message);
          });
      }
    };
    setStepOne(true);
    setCheckGoods(true);
    input.click();
  }

  function handleCameraClick2(reservationId: number) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.capture = "camera";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement)?.files?.[0];
      if (file) {
        const formData2 = new FormData();
        formData2.append("picture", file);
        formData2.append("reservationId", String(reservationId));
        const reader = new FileReader();
        reader.onload = (e) => {
          setPhotoUrl2(e.target?.result as string);
        };
        reader.readAsDataURL(file);
        setFormdatas(formData2);
      }
    };
    setStepTwo(true);
    input.click();
  }

  function mergeImages(
    image1Url: string,
    image2Base64: string,
    outputFileName: string
  ) {
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

        const image2 = new Image();
        image2.setAttribute("crossorigin", "anonymous");
        image2.onload = () => {
          // draw image2
          ctx.drawImage(
            image2,
            0,
            0,
            image2.width,
            image2.height,
            canvas.width / 2 - 250,
            800,
            500,
            500
          );
          // convert canvas to image file and save
          canvas.toBlob(
            (blob) => {
              if (blob) {
                saveAs(blob, outputFileName);
                const file = new File([blob], outputFileName, {
                  type: "image/jpeg",
                });
                const formData3 = new FormData();
                formData3.append("pictures", file);
                axios
                  .post(`https://host 명/api/storage`, formData3, {
                    headers: {
                      Authorization: `bearer ${myatk}`,
                    },
                  })
                  .then((response) => {
                    axios.post(
                      `https://host 명/api/reservation/fix`,
                      {
                        reservationId: props.reservationId,
                        goodsName: selectedItem?.goodsName,
                        price: selectedItem?.goodsPrice,
                        renderedCard: response.data[0],
                      },
                      {
                        headers: {
                          Authorization: `bearer ${myatk}`,
                        },
                      }
                    );
                  });
              } else {
                console.error("Failed to convert canvas to blob");
              }
            },
            "image/jpeg",
            1
          );
        };
        image2.src = `data:image/png;base64,${image2Base64}`;
      }
    };
    image1.src = image1Url;
  }

  function handlePrint(reservationId1: number) {
    if (formdatas) {
      if (!props.printed) {
        axios.post(
          "https://host 명/api/reservation/print",
          {
            reservationId: reservationId1,
          },
          {
            headers: {
              Authorization: `bearer ${myatk}`,
            },
          }
        );
      }
      if (inputValue !== "") {
        axios.post(
          "https://host 명/api/reservation/fix",
          {
            reservationId: props.reservationId,
            goodsName: "기타",
            price: inputValue,
          },
          {
            headers: {
              Authorization: `bearer ${myatk}`,
            },
          }
        );
      } else {
        axios.post(
          "https://host 명/api/reservation/fix",
          {
            reservationId: props.reservationId,
            goodsName: selectedItem ? selectedItem.goodsName : props.goodsName,
            price: selectedItem ? selectedItem.goodsPrice : props.price,
          },
          {
            headers: {
              Authorization: `bearer ${myatk}`,
            },
          }
        );
      }
      fetch("https://host 명/api/messages/flower-picture", {
        method: "POST",
        body: formdatas,
        headers: {
          Authorization: `bearer ${myatk}`,
        },
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          return axios.get("https://host 명/api/reservation/card", {
            params: {
              reservationId: reservationId1,
            },
            headers: {
              Authorization: `bearer ${myatk}`,
            },
          });
        })
        .then((response) => {
          mergeImages(props.renderedCard, response.data.qrBase64, "test1");
        })
        .then(() => {
          alert("저장이 완료되었습니다");
          props.closeModal();
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }

  function checkStep1() {
    setInputValue("");
    setCheckGoods(true);
  }

  function retry() {
    setPhotoUrl1(null);
    setFlowerData([]);
  }

  function confirm(datas: any) {
    const tmp: { [key: string]: number } = {};
    datas.forEach((item: any) => {
      tmp[item.flower] = item.count;
    });
    setIsLoading(true);
    axios
      .post("https://host 명/flask/saveSales", {
        flower_object: tmp,
        reservation_id: props.reservationId,
      })
      .then(() => {
        setRecogOK(true);
        setIsLoading(false);
      });
  }

  function handleSelectItem(item: Goods) {
    setSelectedItem(item);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;

    if (/^\d*$/.test(value)) {
      setInputValue(value);
    } else {
      alert("숫자만 입력해야 합니다.");
    }
  }
  return (
    <div className={styles.modal}>
      {isLoading ? <LoadingSpinner /> : ""}
      <div className={styles.fontcheck}>.</div>
      <div className={styles.modalContent}>
        {!checkGoods && props.goodsName === "기타" && props.price === 0 ? (
          <>
            <div className={styles.stepone}>
              <p>1. 판매 상품을 선택해주세요</p>
              {myGoods.map((item) => (
                <div key={item.goodsId}>
                  <div
                    className={`${styles.items} ${
                      selectedItem === item ? styles.selected : ""
                    }`}
                    onClick={() => handleSelectItem(item)}
                  >
                    <div className={styles.picture}>
                      <img src={item.samples[0]} alt="flower" />
                    </div>
                    <div className={styles.description}>
                      <div className={styles.number}>{item.goodsName}</div>
                      <div className={styles.time}>₩ {item.goodsPrice}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-[87vw] flex justify-center">
              {selectedItem !== null ? (
                <button className={styles.successbutton} onClick={checkStep1}>
                  다음
                </button>
              ) : (
                <button className={styles.printbutton}>다음</button>
              )}
            </div>
          </>
        ) : (
          <>
            {(selectedItem &&
              selectedItem.goodsName === "기타" &&
              selectedItem.goodsPrice !== 0) ||
            (props.goodsName === "기타" && props.price !== 0) ? (
              <>
                <div className="text-xl font-semibold mt-7 left">
                  기타(현장판매)
                </div>
                <div className={styles.stepone}>
                  <div className="mb-6">
                    <input
                      placeholder="ex) 5000"
                      type="text"
                      id="default-input"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={inputValue}
                      onChange={handleChange}
                    ></input>
                  </div>
                  <div>
                    <p className={styles.steptitle}>
                      Step1. 판매 가격을 입력해주세요
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className={styles.stepone}>
                <div className="text-xl font-semibold">
                  {selectedItem ? selectedItem.goodsName : props.goodsName}
                </div>
                <div className={styles.time}>
                  ₩ {selectedItem ? selectedItem.goodsPrice : props.price}
                </div>
                {props.demand && props.demand !== "없음" ? (
                  <div className={styles.time}>요청사항: {props.demand}</div>
                ) : (
                  ""
                )}
              </div>
            )}
            <div className={styles.stepone}>
              <div>
                {photoUrl1 ? (
                  <img
                    src={photoUrl1}
                    alt="captured"
                    onClick={handleCameraClick1}
                  ></img>
                ) : (
                  <img
                    src={camera}
                    alt="camera icon"
                    onClick={handleCameraClick1}
                  ></img>
                )}
              </div>
              <div>
                {flowerData && flowerData.length > 0 ? (
                  <>
                    {flowerData.map((item: any, index: any) => (
                      <div key={index}>
                        <p className="text-center">
                          {item.flower} : {item.count}
                        </p>
                      </div>
                    ))}
                    {recogOK ? (
                      <p className={styles.classTim}>인식이 완료되었습니다.</p>
                    ) : (
                      <>
                        <p className="pt-5 text-center">
                          결과가 맞으시면 확인을 눌러주세요.
                        </p>
                        <div className="flex justify-between gap-[3rem] mt-3">
                          <button
                            className="text-center w-[50%] bg-[green] text-white"
                            onClick={retry}
                          >
                            재시도
                          </button>
                          <button
                            className="text-center w-[50%] bg-[#437ef7] text-white"
                            onClick={() => confirm(flowerData)}
                          >
                            확인
                          </button>
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div>
                    {selectedItem && selectedItem.goodsName === "기타" ? (
                      <p className={styles.steptitle}>
                        Step2. 객체인식용 사진촬영
                      </p>
                    ) : (
                      <p className={styles.steptitle}>
                        Step1. 객체인식용 사진촬영
                      </p>
                    )}
                    <p className={styles.stephint}>
                      ※ 인식 결과 미학습된 품목이 존재할 수 있습니다. 그 경우
                      확인을 누르지 마시고 저장해주십시오.
                    </p>
                  </div>
                )}
              </div>
            </div>
            <div className={styles.stepone}>
              <div>
                {photoUrl2 ? (
                  <img
                    src={photoUrl2}
                    alt="captured"
                    onClick={() => handleCameraClick2(props.reservationId)}
                  ></img>
                ) : (
                  <img
                    src={camera}
                    alt="camera icon"
                    onClick={() => handleCameraClick2(props.reservationId)}
                  ></img>
                )}
              </div>
              {selectedItem && selectedItem.goodsName === "기타" ? (
                <p className={styles.steptitle}>Step3. 고객용 사진촬영</p>
              ) : (
                <p className={styles.steptitle}>Step2. 고객용 사진촬영</p>
              )}
            </div>
          </>
        )}
        {checkGoods ? (
          stepOne && stepTwo ? (
            <button
              className={styles.successbutton}
              onClick={() => handlePrint(props.reservationId)}
            >
              생성
            </button>
          ) : (
            <button className={styles.printbutton}>생성</button>
          )
        ) : null}
        <button onClick={handleClick}>취소</button>
      </div>
    </div>
  );
}
