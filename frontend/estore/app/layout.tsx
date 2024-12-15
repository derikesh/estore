import "./globals.css";

// import toastifu
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";

import Navbar from "@/src/component/ClientSideComponent/Navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ToastContainer/> 
          <Navbar/>
          {children}
      </body>
    </html>
  );
}
