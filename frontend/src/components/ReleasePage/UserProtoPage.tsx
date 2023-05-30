import React, { useState, useEffect } from "react";
import Survey from "./ProtoPage/Survey";
import Letters from "./ProtoPage/Letters";
import ReleaseLetter from "./ProtoPage/ReleaseLetter";
import ProtoIntro from "./ProtoPage/ProtoIntro";
import Memories from "./ProtoPage/Memories";
import More from "./ProtoPage/More";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./UserProtoPage.module.scss";
import mobile from "../../assets/pleasemobile.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { isLoggedInState, userIdState } from "../../recoil/atom";
import api from "../../axios/AxiosInterceptor";

export default function UserProtoPage({ isQR, id }: any) {
  const [letterData, setLetterData] = useState([]);
  const [loading, setLoading] = useState(true);
  let { messageId } = useParams() as { messageId: string };
  const [isMobileView, setIsMobileView] = useState(false);
  const [isPictures, setIsPictures] = useState(false);
  const [isVideo, setIsVideo] = useState(false);
  const [flowerData, setFlowerData] = useState<string>("");
  const [userId, setUserId] = useRecoilState<number>(userIdState);
  const isloggedIn = useRecoilValue<boolean>(isLoggedInState);

  const navigate = useNavigate();
  if (messageId === undefined) {
    messageId = id;
  }

  useEffect(() => {
    async function getData() {
      try {
        const response = await api.post(
          "https://host 명/api/messages/get-card",
          {
            messageId: messageId,
          }
        );
        if (response) {
          if (response.data.pictures) {
            setIsPictures(true);
          }
          if (response.data.video) {
            setIsVideo(true);
          }
        }
        setLetterData(response.data);
        setFlowerData(response.data.flowerPicture);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // API 호출 완료 후 로딩 상태 해제
      }
    }
    getData();
  }, []);

  useEffect(() => {
    const handleWindowResize = () => {
      setIsMobileView(window.innerWidth > 500);
    };

    handleWindowResize(); // 페이지 로드 시 초기 너비에 따라 모바일 뷰 설정

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>; // 로딩 중일 때 표시할 내용
  }

  if (isMobileView) {
    return (
      <div className={styles.photo11}>
        <img src={mobile} alt="Mobile" />
      </div>
    );
  }

  // 마이가든에 저장
  const saveMyGarden = () => {
    // 로그인 여부 확인
    if (isloggedIn) {
      axios
        .post("https://host 명/api/myGarden", {
          messageId: messageId,
          userId: userId,
        })
        .then((response) => {
          alert("저장되었습니다!");
        })
        .catch((error) => {
          alert("다시 시도해주세요");
        });
    } else {
      navigate("/signin");
    }
  };

  return (
    <div className={styles.customclass}>
      <ProtoIntro />
      {isPictures || isVideo ? <Memories letterData={letterData} /> : null}
      <ReleaseLetter letterData={letterData} flowerData={flowerData} />
      {/* <Survey /> */}
      <div className="flex flex-col">
        <More letterData={letterData} />
      </div>
      <div>
        {isQR && (
          <div className=" cursor-pointer w-1/3 py-2 pb-2 px-4 flex mt-20 mx-auto justify-center  font-bold bg-user_green text-white font-nasq border rounded-full">
            <input
              type="button"
              defaultValue="저장하기"
              onClick={() => {
                saveMyGarden();
              }}
              className="cursor-pointer text-center mx-auto justify-center"
            ></input>
          </div>
        )}
      </div>
    </div>
  );
}
