"use client";
import Heroimage from "@/components/heroimage/page";
import WhoWeAre from "@/components/whoweare/page";
import Thematicareas from "@/components/thematicareas/page";
import CustomFooter from "@/components/footer/page";

import Videos from "@/components/videos/page";
import CoreObjectives from "@/components/coreobjectives/page";
import CustomNavBar from "@/components/navbar/page";




const Home = () => {
  return (
    <div>
      <CustomNavBar/>
      <Heroimage/>
      <WhoWeAre/>
      <Thematicareas/>
      <CoreObjectives/>
      <Videos/>
      <CustomFooter/>
    </div>
  );
};
export default Home;
