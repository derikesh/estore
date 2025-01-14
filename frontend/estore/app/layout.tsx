import "./globals.css";
import { ThemeProvider } from 'next-themes'

// import toastifu
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Navbar } from "@/src/component/ClientComponent/navbar/Navbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider 
         attribute="class"
         defaultTheme="system"
         enableSystem
         disableTransitionOnChange
        >
        <ToastContainer/> 
            <Navbar/>
          {children}
          </ThemeProvider>
      </body>
    </html>
  );
}
