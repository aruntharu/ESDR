import Image from "next/image";
import React from "react";
Image;

const Heroimage = () => {
  return (
    <div className="flex justify-center">
      <Image src={require("../Images/Image1.jpg")} width={1200} />{" "}
    </div>
  );
};

export default Heroimage;
