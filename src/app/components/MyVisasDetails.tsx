import Stats from "./Stats";
import VisaAction from "./VisaAction";

export default function MyVisasDetails({count, visas}: {count: number, visas: Array<any>}) {
    return (
        <div className="grid grid-cols-1 gap-4 w-full space-x-2 mx-auto">
            <Stats count={count}/>
            {
                visas?.map((visa: any, index: number) => (
                
                <VisaAction key={index} visa={visa} />
            ))
            }

        </div>
    )
}