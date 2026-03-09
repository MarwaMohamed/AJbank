import localFont from "next/font/local";

export const tajawal = localFont({
  src: [
    { path: "../../public/fonts/Tajawal-Light.ttf", weight: "300", style: "normal" },
    { path: "../../public/fonts/Tajawal-Regular.ttf", weight: "400", style: "normal" },
    { path: "../../public/fonts/Tajawal-Medium.ttf", weight: "500", style: "normal" },
    { path: "../../public/fonts/Tajawal-Bold.ttf", weight: "700", style: "normal" },
    { path: "../../public/fonts/Tajawal-ExtraBold.ttf", weight: "800", style: "normal" },
  ],
  variable: "--font-tajawal",
  display: "swap",
});
