import VisasStatus from "./VisasStatus";

export default function AllVisas() {
    return (
        <div className="allvisas_container flex flex-col w-full p-4">
                <div className="mb-4">
                    <p className="font-semibold text-[20px]">
                        All visas
                    </p>
                </div>
                <div className="flex flex-col gap-3">
                    <VisasStatus />
                    <VisasStatus />
                </div>

        </div>
    )
}