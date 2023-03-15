import { api } from "../utils/api"
import { useState } from "react";
import CreateRecord from "./CreateRecord";
import ViewRecords from "./ViewRecords";

export default function ViewAmbitions() {

    /*
        need to useQuery to fetch ambitions

        to make sure only one record can be recorded per day. need to check new Date() and compare it to new Date(recentRecord)
    */

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 border-solid border-4 border-zinc-300 rounded-lg text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            >
                View Ambitions
            </button>

            {
                menuOpen 
                ? <AmbitionCards />
                : undefined
            }
        </>
    )
}

function AmbitionCards() {

    /*
    need to display...
    create record (one per day limit)
    view records
    update ambition
    delete ambition
    create bond?...
    */

    /*
    would need to create a function that takes new Date() and compares it to Date() in the records to make sure that only a record has already been recorded for the day...
    */

    const callAmbitions = api.newAmbition.getAmbitions.useQuery();

    const { data } = callAmbitions
    
    return (
        <>
        <div>
            {data?.map((elem) => {


                return (
                    <div key={elem.id} className={"border rounded-lg"} >
                         <p>{elem.name}</p> 
                         <br />
                         <p>{elem.endValue}</p> 
                         <br />
                         <p>{elem.dailyPlan}</p> 
                         <br />
                         <CreateRecord ambitionIdPass={elem.id} />
                         <br />
                         <ViewRecords ambitionIdPass={elem.id} />
                        
                    </div>
                )
            })}
        </div>
        </>
    )
}