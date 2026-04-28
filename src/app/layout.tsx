import type { Metadata } from "next";
import { Libre_Baskerville, Lora, UnifrakturMaguntia } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  display: "swap",
});

const unifraktur = UnifrakturMaguntia({
  variable: "--font-unifraktur",
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

const BASE_PATH = "/Phan-Dinh-Thieng-Lieng";

export const metadata: Metadata = {
  title: "Phân Định Thiêng Liêng — Báo Cáo Nghiên Cứu Chuyên Sâu về Linh Đạo I-nhã",
  description:
    "Khám phá chiều sâu của Phân Định Thiêng Liêng: Nền tảng thần học, tiến trình tâm linh và ứng dụng thực tiễn dựa trên Linh thao của Thánh Inhaxiô Loyola và giáo huấn của ĐTC Phanxicô.",
  keywords: [
    "Phân định thiêng liêng",
    "Spiritual Discernment",
    "Linh Thao",
    "Thánh Inhaxiô Loyola",
    "Dòng Tên",
    "Thần học Công giáo",
    "Phút Hồi Tâm",
    "Indiferencia",
  ],
  authors: [{ name: "Nghiên cứu Thần học Dòng Tên" }],
  openGraph: {
    title: "Phân Định Thiêng Liêng — Báo Cáo Nghiên Cứu Chuyên Sâu",
    description: "Khám phá nền tảng thần học và tiến trình tâm linh của sự phân định.",
    url: "https://tuananhhusc.github.io/Phan-Dinh-Thieng-Lieng",
    siteName: "Phân Định Thiêng Liêng",
    images: [
      {
        url: `${BASE_PATH}/hero-image.png`,
        width: 1200,
        height: 630,
        alt: "Thánh Inhaxiô Loyola và Phân Định Thiêng Liêng",
      },
    ],
    locale: "vi_VN",
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Phân Định Thiêng Liêng — Báo Cáo Nghiên Cứu",
    description: "Tiến trình tâm linh và ứng dụng trong bối cảnh đương đại.",
    images: [`${BASE_PATH}/hero-image.png`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport = {
  themeColor: "#1C1917",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="vi"
      className={`${libreBaskerville.variable} ${lora.variable} ${unifraktur.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-parchment dark:bg-parchment transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
