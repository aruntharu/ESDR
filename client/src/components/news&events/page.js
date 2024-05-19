"use client";
import Image from "next/image";
import React from "react";
import { Card, CardHeader, CardBody,  Button } from "@nextui-org/react";

const News = () => {
  const productList = [
    {
      id: 321,
      heading: "Social Justice",
      description: "Lorem ipsum dolor sit...",
      newsImage: "/Image4.jpg",
    },
    {
      id: 322,
      heading: "Social Justice",
      description: "Lorem ipsum dolor sit...",
      newsImage: "/Image4.jpg",
    },
    {
      id: 323,
      heading: "Social Justice",
      description: "Lorem ipsum dolor sit...",
      newsImage: "/Image4.jpg",
    },
    
  ];
  return (
    <div className="mt-5 bg-red-100 ">
        <p className="flex justify-center text-3xl pt-4">eCORNER</p>
        <p className="flex justify-center text-l mt-3 ">eCorner is a collection oflatest news, updates, publications, article and events happening at Social Justice.</p>
    <div className="flex justify-center  " radius="lg">
      {productList.map((item) => {
        return (
          <Card className="py-8 m-8 hover:scale-110 transition duration-500 cursor-pointer object-cover">
            <CardBody className="overflow-visible py-6">
              <Image
                alt="Card background"
                className="object-cover rounded-xl"
                src={item.newsImage}
                width={270}
                height={350}
              />
            </CardBody>
            <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
              <h4 className="font-bold text-large">{item.heading}</h4>
              <small className="text-default-500 mb-6">{item.description}</small>
              <Button className="text-tiny text-white bg-black/20 hover:bg-green-500" variant="flat" color="default" radius="lg" size="sm">
          Read More...
        </Button>
            </CardHeader>
          </Card>
        );
      })}
    </div>
    </div>
  );
};

export default News;
