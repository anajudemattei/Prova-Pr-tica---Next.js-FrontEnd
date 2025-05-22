import React from "react";
import { Roboto } from "next/font/google";
import styles from "./global.css"

const font = Roboto ({
  variable: "--font",
  subsets: ["latin"],
});

export const metadata = {
    title: "Pacientes e Consultas",
    icons: {
    icon: "/icons/favicon.ico",
  },
    description: "",

};

export default function RootLayout({ children }) {
    return (
        <html>
            <body className={font.variable}>{children}</body>
        </html>
    );
}
