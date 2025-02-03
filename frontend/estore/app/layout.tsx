import "./globals.css";
import { ThemeProvider } from 'next-themes'

// import toastifu
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { cookies } from "next/headers";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body>
        <ToastContainer/> 
          {children}
      </body>
    </html>
  );
}
