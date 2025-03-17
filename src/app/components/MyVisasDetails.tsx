import Stats from "./Stats";
import VisaAction from "./VisaAction";

export default function MyVisasDetails() {
    return (
        <div className="grid grid-cols-1 gap-4 w-full space-x-2 mx-auto">
            <Stats />

            <VisaAction />

        </div>
    )
}