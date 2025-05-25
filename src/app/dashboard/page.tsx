"use client";

import { useEffect, useState } from "react";
import AllVisas from "../components/AllVisas";
import Filter from "../components/Filter";
import Passenger from "../components/Passenger";
import DashboardLayout from "../DashboardLayout";
import { GetRequest } from "@/utils/GetRequest";
import { PostRequest } from "@/utils/PostRequest";
import { Loader } from 'lucide-react';

export default function Dashboard() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [adults, setAdults] = useState({});
    const [children, setChildren] = useState({});
    const [adultsCount, setAdultsCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);
    const [adultPrice, setAdultPrice] = useState(0);
    const [childrenPrice, setChildrenPrice] = useState(0);
    const [docs, setDocs] = useState([]);

    const [pagination, setPagination] = useState({
        current_page: 1,
        last_page: 1,
        per_page: 9,
        total: 0,
      });

    // Fetch destinations when component mounts
    useEffect(() => {
        const getDestinations = async () => {
          setLoading(true)
          try {
            const response = await GetRequest(`/destinations?page=${pagination.current_page}`, false);
            setDestinations(response.data);
            setPagination({
              ...pagination,
              current_page: response.current_page,
              last_page: response.last_page,
              total: response.total,
            });
          } catch (error) {
            console.error("Error fetching destinations:", error);
          } finally {
            setLoading(false);
          }
        };
      
        getDestinations();
      }, [pagination.current_page]);

    const handlePassengerInfo = async (passengerInfo: any) => {
        if (!passengerInfo.visa_type || !passengerInfo.adults) {
            console.error("Missing required fields");
            return;
        }

        try {
            setLoading(true);
            const response = await PostRequest("/destinations/passengers", true, {
                visa_type_id: passengerInfo.visa_type,
                adults: passengerInfo.adults,
                children: passengerInfo.children || 0,
            });

            setAdults(response.data.adult);
            setChildren(response.data.child);

            // Assigning counts and prices
            setAdultsCount(response.data.adult?.count || 0);
            setChildrenCount(response.data.child?.count || 0);
            setAdultPrice(response.data.adult?.unit_price || 0);
            setChildrenPrice(response.data.child?.unit_price || 0);
            setDocs(response.data.adult?.documents || []);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false); // Ensure loading stops
        }
    };

    const handleSubmit = () => {
        if (childrenCount > 0) {
            setChildrenCount(prev => prev - 1);
        } else if (adultsCount > 0) {
            setAdultsCount(prev => prev - 1);
        }
    };
    

    return (
        <DashboardLayout>
            
                <Filter
                loading={loading}
                destinations={destinations}
                handlePassengerInfo={handlePassengerInfo}
            />
           

        {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <Loader className="animate-spin" />
                </div>
            ) : (
                <>
                    {/* Render Adults if there are any */}
                    {adultsCount > 0
                        ? Array.from({ length: adultsCount }).map((_, index) => (
                              <Passenger key={index} price={adultPrice} docs={docs}  handleSubmit={handleSubmit} number={index}/>
                          ))
                        : <AllVisas destinations={destinations}  pagination={pagination}
                        onPageChange={(page: number) =>
                          setPagination(prev => ({ ...prev, current_page: page }))
                        } />
                    }

                    {/* Render Children if there are any */}
                    {childrenCount > 0 &&
                        Array.from({ length: childrenCount }).map((_, index) => (
                            <Passenger key={`child-${index}`} price={childrenPrice} docs={docs}  handleSubmit={handleSubmit}  number={adultsCount + index}/>
                        ))
                    }
                </>
            )}
        </DashboardLayout>
    );
}
