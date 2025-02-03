import { ThemeProvider } from 'next-themes'

// import toastifu
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { Navbar } from "@/src/component/ClientComponent/navbar/Navbar";
import { cookies } from "next/headers";
import Footer from "@/src/component/ClientComponent/Footer/Footer";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  const cookieValue = cookies().get('theme');

  return (
        <ThemeProvider 
         attribute="class"
         defaultTheme={cookieValue?.value || 'system'}
         enableSystem
         disableTransitionOnChange
        >
        <ToastContainer/> 
            <Navbar/>
          {children}
          <Footer/>
          </ThemeProvider>
  );
}
