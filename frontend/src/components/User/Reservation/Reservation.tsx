import React, { useEffect, useState } from "react";
import { Map, MapMarker, useMap } from "react-kakao-maps-sdk";
import imageSrc from "../../../assets/flowery_marker.png";
import "../../../assets/styles/variable.scss";
import ShopList from "./ShopList";
import { useRecoilState, useRecoilValue } from "recoil";
import { shopListState } from "../../../recoil/atom";

//  이거 왜 해야하더라? -> kakao 객체는 브라우저 전역 객체인 window 안에 포

// 꽃들 35.1569, 129.0591
// 써니플레르 양산 35.313, 129.0103
interface Position {
  content: string;
  title: string;
  latlng: {
    lat: number;
    lng: number;
  };
}

export default function Reservation() {
  const [markers, setMarkers] = useState([] as boolean[]);
  // const [position, setPosition] = useState([] as Position[]);
  const [updatedShopList, setUpdatedShopList] = useState([] as Position[]);

  const shopList = useRecoilState(shopListState)[0];

  useEffect(() => {
    async function geocodeShops() {
      const updatedShops: Position[] = [];
      const geocoder = new window.kakao.maps.services.Geocoder();

      for (const shop of shopList) {
        await new Promise<void>((resolve) => {
          geocoder.addressSearch(shop.address, function (result, status) {
            if (status === window.kakao.maps.services.Status.OK) {
              const latlng = {
                lat: parseFloat(result[0].y),
                lng: parseFloat(result[0].x),
              };
              const updatedShop = { ...shop, latlng: latlng };
              updatedShops.push(updatedShop);
            }
            resolve(); // 비동기 작업 완료 후 resolve 호출
          });
        });
      }

      setUpdatedShopList(updatedShops); // 업데이트된 상점 리스트 설정
      // setPosition(updatedShops);
      // 위치 설정
    }

    geocodeShops();
  }, []);

  useEffect(() => {
    // console.log(updatedShopList);
  }, [updatedShopList]);

  // const initMarkers = () => {
  //   const marker: boolean[] = [];
  //   updatedShopList.map((index: any) => {
  //     marker.push(false);
  //   });

  //   setMarkers(marker);
  // };
  const handleMarkerClick = (index: number) => {
    const marker: boolean[] = [];
    updatedShopList.map((index: any) => {
      marker.push(false);
    });

    marker[index] = true;

    setMarkers(marker);
  };

  // useEffect(() => {
  //   initMarkers();
  // }, [updatedShopList]);

  return (
    <div className="flex flex-col w-screen h-auto">
      <div>
        <Map // 지도를 표시할 Container
          center={{
            // 지도의 중심좌표
            lat: 35.2,
            lng: 129.055,
          }}
          isPanto={true}
          style={{
            // 지도의 크기
            zIndex: 0,
            width: "100vw",
            height: "50vh",
          }}
          level={11} // 지도의 확대 레벨
        >
          {updatedShopList.map((value: any, index: number) => (
            <MapMarker
              position={value.latlng} // 마커를 표시할 위치
              image={{ src: imageSrc, size: { width: 35, height: 45 } }}
              onClick={() => handleMarkerClick(index)}
              key={index}
            >
              {/* {markers[index] && <div>{value.title}</div>} */}
            </MapMarker>
          ))}
        </Map>
      </div>
      <div className=" absolute z-10 rounded-xl inset-x-0 bottom-0 h-80 overflow-scroll ">
        <ShopList />
      </div>
    </div>
  );
}
