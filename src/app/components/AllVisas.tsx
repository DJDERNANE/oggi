"use client"
import { PaginationDemo } from "./PaginationDemo";
import Visa from "./Visa";


export default function AllVisas({ destinations, pagination,
    onPageChange,
  }: {
    destinations: any[],
    pagination: any,
    onPageChange: (page: number) => void,
  }) {
    
   
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
            <PaginationDemo pagination={pagination}
          onPageChange={onPageChange}/>
        </div>
    </div>
);
}