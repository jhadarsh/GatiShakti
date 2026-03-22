import Banner from "../../components/user/home/Banner";
import Hero from "../../components/user/home/hero";
import WhatWeProvide from "../../components/user/home/WhatWeProvide";
 
export default function Landing() {
    return(
        <div style={{ background: "#08101e" }}>
      <Hero />
      <Banner/>
      <WhatWeProvide />
    </div>
    )
}