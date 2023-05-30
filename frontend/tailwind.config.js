/** @type {import('tailwindcss').Config} */
module.exports = {
  // 템플릿 파일의 경로 설정 👀
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ballet: ["ballet"],
        namyeong: ["namyeong"],
        nasq: ["nasq"],
        utoB: ["utoB"],
        utoL: ["utoL"],
        utoR: ["utoR"],
        gobaB: ["gobaB"],
        gobaR: ["gobaR"],
      },
      colors: {
        sub: "#FFFAF5",
        b_bottom: "#EADED0",
        user_green: "#316351",
        user_beige: "#EDEBE8",
        user_pink: "#F99DA1",
        user_sol: "#D3DAD7",
        user_purple: "#9D8CE0",
        user_black: "#0E0C0D",
      },
      animation: {
        fadeOut: "fadeOut 2s ease-out forwards",
        fadeIn: "fadeIn 1s ease-in forwards",
        slider: "slider 1s ease-in forwards",
        textSlideLtoR: "textSlideLtoR 1s ease-in-out forwards",
        textSlideRtoL: "textSlideRtoL 1s ease-in-out forwards",
        heartBeat: "heartBeat 1s ease-in-out infinite",
        typing: "typing 3.5s steps(40, end)",
        beat: "heartBeat 1s ease-in-out infinite",
        shakeRight: "shakeRight 1s ease-in-out infinite",
      },
      keyframes: {
        typing: {
          from: { width: "0" },
          to: { width: "25ch" },
        },
        heartBeat: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
        fadeOut: {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "60%": { opacity: 0 },
          "100%": { opacity: 1, color: "black" },
        },
        slider: {
          "0%": {
            transform: "translateY(0px)",
          },
          "100%": {
            transform: "translateY(100px)",
          },
        },
        textSlideLtoR: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        textSlideRtoL: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0)" },
        },
        beat: {
          "0%": { transform: "scale(1);" },
          // "25%": { transform: "scale(1.2);" },
          "50%": { transform: "scale(1.2);" },
          // "50%": { transform: "scale(1);" },
          // "75%": { transform: "scale(1.2);" },
        },
        shakeRight: {
          "0%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(5px) rotateY(7deg)" },
          "50%": { transform: "translateX(0)" },
          "75%": { transform: "translateX(5px) rotateY(7deg)" },
          // "0%": { transform: "translateX(5px)"}
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    // ...
  ],
};
