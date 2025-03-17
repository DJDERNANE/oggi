export default function DownloadDocs() {
    return (
        <div className="allvisas_container flex flex-col justify-center items-center w-full p-4">
            <img src="/download-docs.svg" alt="download docs" />
            <p className="font-semibold text-[18px] py-2">
                Download all my docuemnts
            </p>
            <p className="text-[#70707A] py-4">
                download all my documents in one clic
            </p>
            <button className="demande-visa-btn px-3 cursor-pointer my-[20px]">
                Demande Visa
                <img src="/download.svg" alt="plus" />
            </button>
        </div>
    );
}