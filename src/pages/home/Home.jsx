import HomeCarousel from "../../components/carousel/HomeCarousel";
import OurProducts from "../../components/ourProducts/OurProducts";
import Promotion from "../../components/promotion/Promotion";
import ShopCollection from "../../components/shopCollection/ShopCollection";
import FeedbackCorner from "../../components/feedbackCorner/FeedbackCorner";
import OurProductsLast from "../../components/ourProductsLast/OurProductsLast";

export default function Home(){
    return(
        <>
            <section>
                <HomeCarousel/>
                <ShopCollection/>
                <Promotion/>
                <OurProducts/>
                <FeedbackCorner/>
                <OurProductsLast/>
            </section>
        </>
    )
}