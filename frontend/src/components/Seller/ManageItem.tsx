import React, { useEffect, useState } from "react";
import styles from "./ManageItem.module.scss";
import GoodsInfo from "./GoodsInfo";
import axios from "axios";
import { useRecoilValue } from "recoil";
import { storeId } from "../../recoil/atom";
import additem from "../../assets/add_item.png";
import GoodsAdd from "./GoodsAdd";

interface GoodsItem {
  goodsId: number;
  goodsName: string;
  goodsPrice: number;
  goodsDetail: string;
  samples: Array<string>;
}

export default function ManageItem() {
  const [showModal, setShowModal] = useState(false);
  const myatk = sessionStorage.getItem("atk");
  function handleModal() {
    setShowModal(true); // 모달을 열기 위해 상태를 true로 변경합니다.
  }

  function closeModal() {
    setShowModal(false); // 모달을 닫기 위해 상태를 false로 변경합니다.
  }
  const myStoreId = useRecoilValue(storeId);
  const [myItem, setMyItem] = useState<GoodsItem[]>([]);

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
        setMyItem(response.data as GoodsItem[]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className={styles.mainbox}>
      <div className={styles.secondbox}>
        <div className="flex justify-between w-[100%] mb-5">
          <p className={styles.font1}>상품 관리</p>
          <img
            src={additem}
            alt=""
            width="24"
            height="24"
            onClick={handleModal}
          />
        </div>
        {myItem.map((item) => (
          <div key={item.goodsId}>
            <GoodsInfo
              goodsId={item.goodsId}
              goodsName={item.goodsName}
              goodsPrice={item.goodsPrice}
              goodsDetail={item.goodsDetail}
              samples={item.samples}
            />
          </div>
        ))}
        {showModal && <GoodsAdd closeModal={closeModal} />}
      </div>
    </div>
  );
}
