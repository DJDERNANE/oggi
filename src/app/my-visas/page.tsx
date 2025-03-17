import AllVisas from "../components/AllVisas";
import MyVisasDetails from "../components/MyVisasDetails";
import DashboardLayout from "../dashboard/DashboardLayout";

export default function MyVisas() {
        return (
            <DashboardLayout>
                <div className="main-content">
                    <div className="flex justify-between items-center w-full mb-4" >
                        <h1>Mes Demandes Visa</h1>
                        <button className="demande-visa-btn px-3 cursor-pointer">
                            Demande Visa 
                            <img src="/plus-btn.svg" alt="plus" />
                        </button>
                    </div>
                    <div className="grid grid-cols-2 gap-4 w-full mb-4">
                        <div>
                            <MyVisasDetails />
                        </div>
                        <div>
                            <AllVisas />
                        </div>
                    </div>
                </div>
            </DashboardLayout>
        )
    }