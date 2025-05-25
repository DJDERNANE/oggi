"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GetRequest } from "@/utils/GetRequest";
import { PostRequest } from "@/utils/PostRequest";


export default function Filter({ destinations, handlePassengerInfo, loading }: { destinations: any, handlePassengerInfo: any, loading: boolean }) {
    interface visaInterface {
        id: number,
        name: string,
    }
    const [visas, setVisas] = useState<Array<visaInterface>>([]);
    const [formData, setFormData] = useState({
        destination: "",
        nationality: "",
        visa_type: "",
        adults: "",
        children: 0,
    });
    const [persons, setPersons] = useState(0)
    const [total, setTotal] = useState(0)

    useEffect(() => {
        const getVisas = async () => {
            if (!formData.destination) return;
            try {
                const response = await GetRequest(`/destinations/${formData.destination}/visas`, false);
                setVisas(response.data);
            } catch (error) {
                console.error("Error fetching visas:", error);
            }
        };
        getVisas();
    }, [formData.destination]);

    const handleChange = (e: any) => {
        const { name, value, type } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value
        }));
    };



     useEffect(() => {
        const getTotal = async () => {
            if (!formData.destination) return;
            try {
                const response = await PostRequest(`/destinations/total`, false, {
                    visa_type_id: formData.visa_type,
                    adults: formData.adults,
                    children: formData.children,
                });
                console.log(response)
                setPersons(response.data.adults + response.data.children)
                setTotal(response.data.total)
            } catch (error) {
                console.error("Error fetching visas:", error);
            }
        };
        getTotal();
    }, [formData.visa_type, formData.adults, formData.children]);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        handlePassengerInfo(formData);
    };

    return (
        <div className="p-4 relative w-full main-content">
            <div className="flex justify-between items-center mb-4 w-full">
                <h1 className="text-lg font-bold mb-4 w-full">Nouvelle demande de visa</h1>
                <div className="total-parent flex w-full">
                    <p className="total flex items-end">
                        Total   {total} <span className="ml-2"> / dzd</span> 
                    </p>
                    <p className="flex ">
                        <img src="/persons.svg" alt=""  className="mx-2"/> <span className="persons"> {persons} persons</span>
                    </p>
                        
                </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 min-h-[300px] w-full">

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 form-container justify-between items-start">
                    <div>
                        <label className="text-[12px]">Pays de demande de visa</label>
                        <div className="select-parent">
                            <select className="select-component" name="destination" onChange={handleChange}>
                                <option value="">Sélectionner</option>
                                {destinations.map((dest: any) => (
                                    <option key={dest.id} value={dest.id}>{dest.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="text-[12px] text-[#4F4F4F]">Nationalité</label>
                        <div className="select-parent">
                            <select className="select-component" name="nationality" onChange={handleChange}>
                                <option value="">Choisir</option>
                                <option value="algerienne">Algérienne</option>
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="text-[12px] text-[#4F4F4F]">Type de visa</label>
                        <div className="select-parent">
                            <select className="select-component" name="visa_type" onChange={handleChange}>
                                <option value="">Choisir</option>
                                {visas.map(visa => (
                                    <option key={visa.id} value={visa.id}>{visa.name}</option>
                                ))}
                            </select>
                        </div>

                    </div>

                    <div>
                        <label className="text-[12px] text-[#4F4F4F]">Adult(es)</label>
                        <input type="number" name="adults" className="input-component" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-[6.5px] relative mb-4">
                        <label className="text-[12px] text-[#4F4F4F]">Enfant</label>
                        <input type="number" name="children" className="input-component" onChange={handleChange} />
                        {formData.children > 0 &&
                            Array.from({ length: formData.children }).map((_, index) => (
                                <div key={index} className="mb-2">
                                    <label className="text-[12px] text-[#4F4F4F] mb-1 block">
                                        Âge de l'enfant {index + 1}
                                    </label>
                                    <input
                                        type="text"
                                        name={`age_${index}`}
                                        className="input-component"
                                        onChange={handleChange}
                                        placeholder="Saisir l'âge"
                                    />
                                </div>
                            ))}

                    </div>
                </div>
                <Button disabled={loading} type="submit" className="w-full md:w-auto submit-btn">Suivant</Button>
            </form>
        </div>
    );
}