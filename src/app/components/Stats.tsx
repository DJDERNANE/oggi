export default function Stats() {
    return (
        <div className="flex justify-between items-center w-full allvisas_container p-4">
            <div className="flex gap-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <rect x="1.5" y="1.5" width="21" height="21" rx="6" fill="#CCE1FF" />
                    <rect x="4.5" y="6" width="9" height="3" rx="1.5" fill="#3981F7" />
                    <rect x="4.5" y="12" width="15" height="2.25" rx="1.125" fill="#93BAFB" />
                    <rect x="4.5" y="17.25" width="4.5" height="2.25" rx="1.125" fill="#93BAFB" />
                    <rect x="10.5" y="17.25" width="9" height="2.25" rx="1.125" fill="#93BAFB" />
                </svg>
                <div >
                    <p>All my visas demands</p>
                    <div className="flex gap-2 items-center">
                    <h1>83</h1> <span className="visas-ready-stats px-2 py-1">2 visas are ready </span>
                    </div>
                    
                </div>

            </div>


            <div >
                <svg xmlns="http://www.w3.org/2000/svg" width="89" height="45" viewBox="0 0 89 45" fill="none">
                    <path d="M23.8701 15.7016L1 33.25V44.75H89V1.25H65.6328L52.209 24.4758L23.8701 15.7016Z" fill="url(#paint0_linear_221_5929)" fill-opacity="0.2" />
                    <path d="M1 33.25L23.8701 15.7016L52.209 24.4758L65.6328 1.25H89" stroke="#30C559" stroke-width="2" />
                    <defs>
                        <linearGradient id="paint0_linear_221_5929" x1="45" y1="1.25" x2="45" y2="44.75" gradientUnits="userSpaceOnUse">
                            <stop stop-color="#30C559" stop-opacity="0.7" />
                            <stop offset="1" stop-color="#30C559" stop-opacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    )
}