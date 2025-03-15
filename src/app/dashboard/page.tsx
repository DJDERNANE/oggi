import Filter from "../components/Filter";
import Passenger from "../components/Passenger";
import DashboardLayout from "./DashboardLayout";

export default function Dashboard() {
        return (
            <DashboardLayout>
                <Filter />
                <Passenger />
            </DashboardLayout>
        )
    }