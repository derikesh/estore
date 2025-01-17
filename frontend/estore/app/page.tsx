import CategoryDisplay from "@/src/component/ClientComponent/CategoryDisplay/CategoryDisplay";
import Categories from "@/src/component/ClientComponent/CategoryDisplay/Categories";
import LIkedProduct from "@/src/component/ClientComponent/LikedProduct.tsx/LIkedProduct";
import Faq from "@/src/component/ClientComponent/FAQ/Faq";

export default function Home() {

  return (
   
    <div >
        <CategoryDisplay/>
        <Categories/>
        <LIkedProduct/>
        <Faq/>
    </div>

  );
}
