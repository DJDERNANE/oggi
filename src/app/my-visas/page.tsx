"use client";
import { useEffect, useState } from "react";
import AllMyVisas from "../components/AllMyVisas";
import MyVisasDetails from "../components/MyVisasDetails";
import DashboardLayout from "../DashboardLayout";
import { GetRequest } from "@/utils/GetRequest";
import { useRouter } from 'next/navigation';
import useIsMobile from "@/lib/isMobile";

export default function MyVisas() {
    const [myVisas, setMyVisas] = useState([]);
    const [count, setCount] = useState(0);
    const router = useRouter();
    const isMobile = useIsMobile()
    useEffect(() => {
        const getMyvisas = async () => {
            const response = await GetRequest('/visa-applications', true);
            try {
                setMyVisas(response.data);
                setCount(response.visaCount)
            } catch (error) {
                console.error("Error fetching visas:", error);
            }
        }
        getMyvisas();
    },[]);
    return (
        <DashboardLayout>
            <div className="main-content">
                <div className={`flex justify-between  w-full mb-4 ${isMobile ? 'flex-col items-start' : 'items-center'}`} >
                    <h1>Mes Demandes Visa</h1>
                    <button className="demande-visa-btn px-3 cursor-pointer" onClick={()=> router.push('/dashboard')}>
                        Demande Visa
                        <img src="/plus-btn.svg" alt="plus" />
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-4">
                    <div>
                        <MyVisasDetails count={count} visas={myVisas} />
                    </div>
                    <div>
                        <AllMyVisas visas={myVisas} />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}