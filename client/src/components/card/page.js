'use client'
import React from "react";
import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";
import { useRouter } from "next/navigation";

export default function CommitteeCard(props) {
  const router = useRouter()
  return (
    <Card  className="py-4 m-2">
   
      <CardBody onClick={()=> router.push('/committee/'+props.item._id)}  className="overflow-visible py-2">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src="https://nextui.org/images/hero-card-complete.jpeg"
          width={270}
        />
 
      </CardBody>
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        
      <h4 className="font-bold text-large">{props.item.fullName}</h4>
        <small className="text-default-500">{props.item.designation}</small>
      </CardHeader>
    </Card>
  );
}