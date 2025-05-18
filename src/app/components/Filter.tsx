"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { GetRequest } from "@/utils/GetRequest";


export default function Filter({ destinations, handlePassengerInfo, loading } : { destinations: any, handlePassengerInfo: any, loading: boolean }) {
    const [visas, setVisas] = useState([]);
    const [formData, setFormData] = useState({
        destination: "",
        nationality: "",
        visa_type: "",
        adults: "",
        children: "",
    });

    useEffect(() => {
        const getVisas = async () => {
            if (!formData.destination) return;
            try {
                const response =  await GetRequest(`/destinations/${formData.destination}/visas`, false);
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
    

    const handleSubmit = (e : any) => {
        e.preventDefault();
        handlePassengerInfo(formData);
    };

    return (
        <div className="p-4 relative w-full main-content">
            <h1 className="text-lg font-bold mb-4">Nouvelle demande de visa</h1>
            <form onSubmit={handleSubmit} className="space-y-6 h-[300px] w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 form-container justify-between items-start">
                    <div>
                        <label className="text-[12px]">Pays de demande de visa</label>
                        <select className="select-component" name="destination" onChange={handleChange}>
                            <option value="">Sélectionner</option>
                            {destinations.map((dest :any) => (
                                <option key={dest.id} value={dest.id}>{dest.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[12px] text-[#4F4F4F]">Nationalité</label>
                        <select className="select-component" name="nationality" onChange={handleChange}>
                            <option value="">Choisir</option>
                            <option value="algerienne">Algérienne</option>
                        </select>
                    </div>

                    <div>
                        <label className="text-[12px] text-[#4F4F4F]">Type de visa</label>
                        <select className="select-component" name="visa_type" onChange={handleChange}>
                            <option value="">Choisir</option>
                            {visas.map(visa => (
                                <option key={visa.id} value={visa.id}>{visa.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="text-[12px] text-[#4F4F4F]">Adult(es)</label>
                        <input type="number" name="adults" className="select-component" onChange={handleChange} />
                    </div>

                    <div className="flex flex-col gap-4 relative">
                        <label className="text-[12px] text-[#4F4F4F]">Enfant</label>
                        <input type="number" name="children" className="select-component" onChange={handleChange} />
                        {formData.children > 0 && (
                            <div className="absolute top-[120%] right-0">
                                <label className="text-[12px] text-[#4F4F4F] mb-1">L'âge des enfants</label>
                                <input type="text" name="ages" className="select-component" onChange={handleChange} placeholder="Saisir les âges" />
                            </div>
                        )}
                    </div>
                </div>
                <Button disabled={loading} type="submit" className="w-full md:w-auto submit-btn">Suivant</Button>
            </form>
        </div>
    );
}