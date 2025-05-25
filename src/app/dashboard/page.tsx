"use client";

import { useEffect, useState } from "react";
import AllVisas from "../components/AllVisas";
import Filter from "../components/Filter";
import Passenger from "../components/Passenger";
import DashboardLayout from "../DashboardLayout";
import { GetRequest } from "@/utils/GetRequest";
import { PostRequest } from "@/utils/PostRequest";
import { Loader } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface PassengerForm {
    name: string;
    family_name: string;
    passport_number: string;
    departure_date: Date;
    visa_type_id: string;
    files: File[];
}

export default function Dashboard() {
    const [destinations, setDestinations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [adults, setAdults] = useState({});
    const [children, setChildren] = useState({});
    const [adultsCount, setAdultsCount] = useState(0);
    const [childrenCount, setChildrenCount] = useState(0);
    const [adultPrice, setAdultPrice] = useState(0);
    const [childrenPrice, setChildrenPrice] = useState(0);
    const [docs, setDocs] = useState<any[]>([]);
    const [passengerForms, setPassengerForms] = useState<PassengerForm[]>([]);

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

            // Initialize passenger forms array
            const totalPassengers = (response.data.adult?.count || 0) + (response.data.child?.count || 0);
            const initialForms: PassengerForm[] = Array(totalPassengers).fill(null).map(() => ({
                name: "",
                family_name: "",
                passport_number: "",
                departure_date: new Date(),
                visa_type_id: passengerInfo.visa_type,
                files: []
            }));
            setPassengerForms(initialForms);
        } catch (error) {
            console.error("Error submitting form:", error);
        } finally {
            setLoading(false);
        }
    };

    const updatePassengerForm = (index: number, data: Partial<PassengerForm>) => {
        setPassengerForms(prev => {
            const newForms = [...prev];
            newForms[index] = { ...newForms[index], ...data };
            return newForms;
        });
    };

    const handleSubmitAll = async () => {
        setSubmitting(true);
        const formData = new FormData();

        passengerForms.forEach((passenger, index) => {
            formData.append(`applications[${index}][name]`, passenger.name);
            formData.append(`applications[${index}][fammily_name]`, passenger.family_name);
            formData.append(`applications[${index}][passport_number]`, passenger.passport_number);
            formData.append(`applications[${index}][departure_date]`, passenger.departure_date.toISOString().split("T")[0]);
            formData.append(`applications[${index}][visa_type_id]`, passenger.visa_type_id);
            formData.append(`applications[${index}][price]`, index < adultsCount ? adultPrice.toString() : childrenPrice.toString());

            // Handle files as a simple array
            if (passenger.files && passenger.files.length > 0) {
                passenger.files.forEach((file: File) => {
                    formData.append(`applications[${index}][files][]`, file);
                });
            }
        });

        try {
            const response = await PostRequest("/visa-applications", true, formData);
            console.log("Response:", response);
            alert(response.message);
            
            // Reset forms after successful submission
            setAdultsCount(0);
            setChildrenCount(0);
            setPassengerForms([]);
        } catch (error) {
            console.error("Error submitting forms:", error);
            alert("Error submitting forms. Please try again.");
        } finally {
            setSubmitting(false);
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
                <div className="space-y-4 pb-8">
                    {/* Render Adults if there are any */}
                    {adultsCount > 0
                        ? Array.from({ length: adultsCount }).map((_, index) => (
                            <Passenger
                                key={index}
                                price={adultPrice}
                                docs={docs}
                                number={index}
                                formData={passengerForms[index]}
                                onChange={(data) => updatePassengerForm(index, data)}
                            />
                        ))
                        : <AllVisas
                            destinations={destinations}
                            pagination={pagination}
                            onPageChange={(page: number) =>
                                setPagination(prev => ({ ...prev, current_page: page }))
                            }
                        />
                    }

                    {/* Render Children if there are any */}
                    {childrenCount > 0 &&
                        Array.from({ length: childrenCount }).map((_, index) => (
                            <Passenger
                                key={`child-${index}`}
                                price={childrenPrice}
                                docs={docs}
                                number={adultsCount + index}
                                formData={passengerForms[adultsCount + index]}
                                onChange={(data) => updatePassengerForm(adultsCount + index, data)}
                            />
                        ))
                    }

                    {/* Submit All Button */}
                    {(adultsCount > 0 || childrenCount > 0) && (
                        <div className="flex justify-end mt-6">
                            <Button
                                onClick={handleSubmitAll}
                                disabled={submitting}
                                className="w-full md:w-auto bg-[#DF2C2C] hover:bg-[#DF2C2C] cursor-pointer"
                            >
                                {submitting ? (
                                    <>
                                        <Loader className="animate-spin mr-2" />
                                        Soumission en cours...
                                    </>
                                ) : (
                                    "Soumettre"
                                )}
                            </Button>
                        </div>
                    )}
                </div>
            )}
        </DashboardLayout>
    );
}
