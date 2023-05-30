import axios from "axios";
import { Cookies } from "react-cookie";
import { useRecoilState, useSetRecoilState } from "recoil";
import { atk, userIdState } from "../recoil/atom";

const cookies = new Cookies();

// url 호출 시 기본 값 셋팅
const api = axios.create({
  baseURL: "/",
  headers: { "Content-type": "application/json" }, // data type
});

api.interceptors.request.use(
  function (config: any) {
    const token = sessionStorage.getItem("atk");
    //요청시 AccessToken 계속 보내주기
    if (!token) {
      config.headers.accessToken = null;
      //   config.headers.refreshToken = null;
      return config;
    }

    if (config.headers && token) {
      //   const { accessToken } = JSON.parse(token);
      config.headers.authorization = `bearer ${token}`;
      //   config.headers.refreshToken = `Bearer ${refreshToken}`;
      return config;
    }
    // Do something before request is sent
  },
  function (error) {
    // Do something with request error
    return error;
  }
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const [userId, setUserId] = useRecoilState<number>(userIdState);
    const setAccessToken = useSetRecoilState<string>(atk);

    // 401에러 (토큰이 유효하지 않을 때)
    if (status === 401) {
      {
        const originalRequest = config;
        const token = sessionStorage.getItem("atk");

        // const refreshToken = await cookies.get("rtk");
        // token refresh 요청
        // const { data } = await axios.post(
        //   `http://localhost:3000/refreshToken`, // token refresh api
        //   {},
        //   { headers: { authorization: `Bearer ${refreshToken}` } }
        // );
        // const { data } = await axios.post(
        //     `http://localhost:3000/refreshToken`, // token refresh api
        //     {},
        //     { headers: { authorization: `Bearer ${refreshToken}` } }
        //   );
        const { data } = await axios.get(
          "https://host 명/api/token/rtk",
          { params: { userId: userId } }
        );
        const { atk: newAccessToken } = data;
        setAccessToken(newAccessToken);
        sessionStorage.setItem("atk", newAccessToken);
        originalRequest.headers.authorization = `Bearer ${newAccessToken}`;

        // 새로운 토큰 저장
        // dispatch(userSlice.actions.setAccessToken(data.data.accessToken)); store에 저장
        // const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
        //   data;
        // await localStorage.multiSet([
        //   ["accessToken", newAccessToken],
        //   ["refreshToken", newRefreshToken],
        // ]);
        // originalRequest.headers.authorization = `Bearer ${newAccessToken}`;
        // 401로 요청 실패했던 요청 새로운 accessToken으로 재요청
        return axios(originalRequest);
      }
    }
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return error;
  }
);

export default api;
