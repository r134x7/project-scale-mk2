// import { api } from "../utils/api";
import { useState } from "react";
import type { Ambitions, Record } from "@prisma/client";

export default function ViewRecords(props: {ambitionPass: Ambitions & {
    record: Record[];
}}) {

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

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <RecordCards ambitionGet={props.ambitionPass} />
            </div>
            <div >
                {/* <br /> */}
               <span className={`border bg-slate-500 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>
                Test.................
                {/* <br />  */}
                    <span className={`border bg-slate-400 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>What....................................................................
                {/* <br />  */}
                        <span className={`border bg-slate-300 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>Very Long Sentence ............ 
                {/* <br />  */}
                            <span className={`border bg-slate-200 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>surface?
                {/* <br />  */}
                                <span className={`border bg-slate-100 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>or core?  .........
                {/* <br />  */}
                                </span>
                            </span>
                        </span>
                    </span>
                </span> 
                
                
            </div>
        </>
    )
}

function RecordCards(props: {ambitionGet: Ambitions & {
    record: Record[];
}}) {
    
    // const { data } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionIdGet }); 

    const data = props.ambitionGet.record

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