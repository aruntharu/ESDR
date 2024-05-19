"use client";
import Footer from "@/components/footer/page";
import NavBar from "@/components/navbar/page";
import News from "@/components/news&events/page";
import Carousel from "./carousel";
import Videos from "@/components/Videos/page";

const Home = () => {
  return (
    <div>
      <NavBar />
      <Carousel />
      <News />
      <Videos/>
      <Footer />
    </div>
  );
};
export default Home;
