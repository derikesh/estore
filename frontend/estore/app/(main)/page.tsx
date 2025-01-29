import CategoryDisplay from "@/src/component/ClientComponent/CategoryDisplay/CategoryDisplay";
import Categories from "@/src/component/ClientComponent/CategoryDisplay/Categories";
import LIkedProduct from "@/src/component/ClientComponent/LikedProduct.tsx/LIkedProduct";
import Faq from "@/src/component/ClientComponent/FAQ/Faq";
import DisplayProduct from "@/src/component/ClientComponent/AllProduct/DisplayProduct";

export default function Home() {

  return (
   
    <div className="space-y-10" >
        <CategoryDisplay/>
        <Categories/>
        <LIkedProduct/>
        <Faq/>
        <DisplayProduct/>
    </div>

  );
}
