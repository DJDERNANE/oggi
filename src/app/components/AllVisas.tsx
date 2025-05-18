"use client"
import { useEffect, useState } from "react";
import { PaginationDemo } from "./PaginationDemo";
import Visa from "./Visa";
import { fetchData } from "@/utils/GetRequest";


export default function AllVisas({ destinations }: { destinations: any }) {
    
   
return (
    <div className=" main-content flex flex-col w-full p-4">
        <h1 className="py-4">
            Découvrez tous les visas disponibles
        </h1>
        <div className="grid grid-cols-1  md:grid-cols-3 gap-4 w-full">
            {destinations.map((destination : any) => (
                <Visa key={destination.id} destination={destination} />
            ))}
           
        </div>
        <div className="w-full flex justify-end">
            <PaginationDemo />
        </div>
    </div>
);
}