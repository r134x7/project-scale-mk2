import { useState } from "react";
import { api } from "../utils/api"

export default function ViewBonds(props: {ambitionIdPass: string }) {

    /*
        .............. 
        passing down the ambition and record data from viewAmbitions query
    */

    const { data } = api.newBond.getBonds.useQuery({ ambitionId: props.ambitionIdPass})

    const bondIDs: string[][] | undefined = data?.map((elem, index) => {
        return [elem.id, elem.partnerId ?? "Empty", index.toString()]
    })

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            >
                View Bonds
            </button>

            <div className={`${menuOpen ? "" : "invisible" }`}>
                <UpdateBond bondIdsGet={bondIDs} />
            </div>
        </>
    )
}

function UpdateBond(props: {bondIdsGet: string[][] | undefined}) {
    
    const updateBondAPI = api.newBond.updateBond.useMutation();

    // const [open, setOpen] = useState(true);
    const [partnerBondId, setPartnerBondId] = useState("")

    const handleBondUpdateSubmit = (bondId: string | undefined) => {

        if (bondId === undefined) {
            return console.log("bondId is undefined.");
        }

        try {
            updateBondAPI.mutate({
                id: bondId,
                partnerId: partnerBondId,
            })
        } catch (error) {
            console.log(error);
            
        }
    };

    return (
        <>
            {
                props?.bondIdsGet?.filter((value) => {
                    // filtering out bonds that are already updated
                    return value[1] === "Empty"
                })
                .map((elem, index, array) => {
                    return (
                        <div
                            key={elem[2]} 
                            className={`border-black border flex justify-center items-end rounded-lg mt-2 ${index % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                        >
                        
                        <form 
                        className="bg-slate-50 grid grid-cols-1"
                        onSubmit={(event) => { 
                            event.preventDefault()
                            handleBondUpdateSubmit(elem[0]) }}
                        >

                        <label className="flex justify-center mt-2">Enter the ambition ID of the other person you will share a bond with:</label>
                        <input 
                            className="border-solid border-cyan-500 rounded-md border-4 m-2"
                            onChange={(event) => setPartnerBondId(event.target.value)}
                            value={partnerBondId}
                        />

                        <button 
                            className="m-2 rounded-md border-4 border-cyan-500 bg-sky-200 text-sky-900 font-bold"
                            type="submit"
                            // onSubmit={() => setOpen(false)}
                        >Submit</button>

                        </form>

                        </div>
                    )
                })
            }        
        </>
    )
}

// function DeleteBond() {

// }

// function BondCards() {

// }
