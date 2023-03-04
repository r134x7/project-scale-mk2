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
            className="bg-gray-600 rounded-lg"
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
    
    const callRecords = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionIdGet });

    return (
        <>
        
        </>
    )
}