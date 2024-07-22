import { Inter } from "next/font/google";
import "./globals.css";
import { NextUIProvider } from "@nextui-org/react";
import ReduxProvider from "@/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ESDR",
  description: "Economic, Social, and Development Rights Winter Residential School",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          
        <ReduxProvider>
            {children}
            <Toaster
  position="top-center"
  reverseOrder={false}
/>
            </ReduxProvider>
        </NextUIProvider>
      </body>
    </html>
  );
}
