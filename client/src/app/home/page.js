"use client";
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import News from "@/components/whoweare/page";
import Heroimage from "@/components/heroimage/page";
import WhoWeAre from "@/components/whoweare/page";
import Thematicareas from "@/components/thematicareas/page";
import CustomFooter from "@/components/footer/page";
import CustomNews from "@/components/news/page";
import Videos from "@/components/videos/page";
import CoreObjectives from "@/components/coreobjectives/page";
import CustomNavBar from "@/components/navbar/page";




const Home = () => {
  return (
    <div>
      <Heroimage/>
      <WhoWeAre/>
      <Thematicareas/>
      <CoreObjectives/>
      <CustomNews/>
      <Videos/>
      <CustomFooter/>
    </div>
  );
};
export default Home;
