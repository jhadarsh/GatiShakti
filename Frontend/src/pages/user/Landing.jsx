import Banner from "../../components/user/home/Banner";
import Hero from "../../components/user/home/hero";
import TripPlanner from "../../components/user/home/plan";
import NoticeBar from "../../components/user/home/NoticeBar";
 
export default function Landing() {
    return(
        <>
        <Hero/>   
        <NoticeBar/>    
        {/* <Banner/> */}
        <TripPlanner/>

        </>
    )
}