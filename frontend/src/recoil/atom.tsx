import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist();

// 로그인 여부
export const isLoggedInState = atom<boolean>({
  key: "isLoggedInState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 유저 ID
export const userIdState = atom<number>({
  key: "userIdState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

// 유저 아이디
export const userNameState = atom<string>({
  key: "userNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 유저 전화번호
export const phoneNumberState = atom<string>({
  key: "phoneNumberState",
  default: "0",
});

// 가게 ID
export const userStoreIdState = atom<number>({
  key: "userStoreIdState",
  default: 0,
});

// 카드 이미지
export const cardImg = atom<string>({
  key: "cardImgState",
  default: "",
});

// 카드 이미지 파일
export const cardImgFileState = atom<File | null>({
  key: "cardImgFileState",
  default: null,
});

// 카드 종류
export const cardState = atom<number>({
  key: "cardState",
  default: 0,
});

// 카드 보내는 이름
export const cardName = atom<string>({
  key: "cardNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 카드 보내는 이름 입력 여부
export const isCardName = atom<boolean>({
  key: "isCardNameState",
  default: true,
});

// 카드 한줄글
export const cardContent = atom<string>({
  key: "cardContentState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 카드 한줄글 입력 여부
export const isCardContent = atom<boolean>({
  key: "isCardContentState",
  default: true,
});

// 업로드한 이미지
export const imageState = atom<Array<File>>({
  key: "imageState",
  default: [],
  //   effects_UNSTABLE: [persistAtom],
});

// 업로드한 영상
export const videoState = atom<File | null>({
  key: "videoState",
  default: null,
  //   effects_UNSTABLE: [persistAtom],
});

// 편지지 종류
export const letterPaperState = atom<number>({
  key: "letterPaperState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

// 편지 글씨체
export const letterFontState = atom<number>({
  key: "letterFontState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

// 편지 내용
export const totalTextState = atom<string>({
  key: "totalTextState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 예약 최종 제출 모달 오픈 여부
export const reservationConfirmState = atom<boolean>({
  key: "reservationConfirmState",
  default: false,
});

//가게 리스트 (창근)
export const shopListState = atom({
  key: "shopListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

//가게 정보(창근)
export const shopDataState = atom({
  key: "shopDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const storeId = atom<number>({
  key: "storeId",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const storeName = atom<string>({
  key: "storeName",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 예약 시간 (창근)
export const reservationTimeState = atom<string>({
  key: "storeTimeState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 예약 날짜 (창근)
export const reservationDayState = atom<string>({
  key: "storeDayState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 상품 선택 (창근)
export const goodsState = atom({
  key: "goodsState",
  default: {
    goodsDetail: "",
    goodsId: 0,
    goodsName: "",
    goodsPrice: 0,
    samples: [],
    storeId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const tabState = atom<string>({
  key: "tabState",
  default: "all",
  effects_UNSTABLE: [persistAtom],
});

export const storeInfo = atom<any>({
  key: "storeInfo",
  default: {
    storeId: 0,
    storeName: "",
    storePhone: "",
    permit: 0,
    open: 0,
    close: 0,
    address: "",
    info: "",
    image: "",
    profile: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export const atk = atom<string>({
  key: "atk",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const rtk = atom<string>({
  key: "rtk",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const timeState = atom<String>({
  key: "timeState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const dateState = atom<String>({
  key: "dateState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});