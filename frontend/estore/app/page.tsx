import CategoryDisplay from "@/src/component/ClientComponent/CategoryDisplay/CategoryDisplay";
import Categories from "@/src/component/ClientComponent/CategoryDisplay/Categories";
import LIkedProduct from "@/src/component/ClientComponent/LikedProduct.tsx/LIkedProduct";

export default function Home() {

  return (
   
    <div className="container-cus" >
        <CategoryDisplay/>
        <Categories/>
        <LIkedProduct/>
    </div>

  );
}
