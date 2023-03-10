import { api } from "../utils/api";
import { useState } from "react";

export default function ViewRecords(props: {ambitionIdPass: string}) {

    /*
        create a button to view records

        since I am not using Mantine this time and HeadlessUI does not have a calendar... 

    */

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            >
               View Records 
            </button>

            {
                menuOpen 
                ? <RecordCards ambitionIdGet={props.ambitionIdPass} />
                : undefined
            }
        </>
    )
}

function RecordCards(props: {ambitionIdGet: string}) {
    
    const { data } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionIdGet }); 

    return (
        <>
        {
            data?.map((elem, index, array) => {
                return (
                    <div 
                        key={elem.id}
                        className={`border-black border flex justify-center items-end rounded-lg mt-2 ${index % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                    >
                    Date recorded: {elem.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    <br />
                    Weight: {elem.value}kg 
                    <br />
                    Difference to previous record: {elem.value - (array?.at((index === 0 
                        ? 0 
                        : index-1))?.value ?? 0)}kg
                    <br />
                    Notes: {elem.journal} 
                    <br />
                    </div>
                )
            })
        }
        </>
    )
}