import CategoryDisplay from "@/src/component/ClientComponent/CategoryDisplay/CategoryDisplay";
import Categories from "@/src/component/ClientComponent/CategoryDisplay/Categories";
import LIkedProduct from "@/src/component/ClientComponent/LikedProduct.tsx/LIkedProduct";
import Faq from "@/src/component/ClientComponent/FAQ/Faq";
import DisplayProduct from "@/src/component/ClientComponent/AllProduct/DisplayProduct";

import { baseUrl } from "@/src/config/baseUrl";


const fetchFUnction = async () => {
  try {
    const res = await fetch(`http://backend:5000/home/firstPage`, { cache:'no-store' });
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${errorText}`);
    }
    const data = await res.json();
    return data;
  } catch (err: any) {
      console.log("err");
  }
};

export default async function Home() {
  const data = await fetchFUnction();
  
  return (
    <div className="space-y-10">
      <CategoryDisplay data={data?.data?.randomObj} products={data?.data?.categoryProduct} />
      <Categories data={data?.data?.category} />
      <LIkedProduct />
      <Faq data={data?.data?.faq} />
      <DisplayProduct />
    </div>
  );
}