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
    const [updateOpen, setUpateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            >
                Bonds
            </button>

            <div className={`${menuOpen ? "" : "invisible" }`}>

                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setViewOpen(!viewOpen)}
                >
                   View Bonds 
                </button>
                <div className={`${viewOpen ? "" : "invisible" }`}>
                    <BondCards ambitionIdGet={props.ambitionIdPass} bondIdsGet={bondIDs} />
                </div>


                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setUpateOpen(!updateOpen)}
                >
                   Update Bonds 
                </button>
                <div className={`${updateOpen ? "" : "invisible" }`}>
                    <UpdateBond bondIdsGet={bondIDs} />
                </div>

                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setDeleteOpen(!deleteOpen)}
                >
                   Delete Bonds 
                </button>
                <div className={`${deleteOpen ? "" : "invisible" }`}>
                    <DeleteBond bondIdsGet={bondIDs} />
                </div>


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

function DeleteBond(props: {bondIdsGet: string[][] | undefined}) {

    const deleteBondAPI = api.newBond.deleteBond.useMutation();

    const [partnerBondId, setPartnerBondId] = useState("")

    const handleBondDeleteSubmit = (bondId: string | undefined) => {

        if (bondId === undefined) {
            return console.log("bondId is undefined.");
        }

        try {
            deleteBondAPI.mutate({
                id: bondId,
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {
                props?.bondIdsGet?.map((elem, index, array) => {
                    return (
                        <div
                            key={elem[2]} 
                            className={`border-black border flex justify-center items-end rounded-lg mt-2 ${index % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                        >


                        <label className="flex justify-center mt-2">Enter the ambition ID within the quotes `&quot;`{elem[1]}`&quot;` to enable the delete button and then click delete:</label>
                        <input 
                            className="border-solid border-cyan-500 rounded-md border-4 m-2"
                            onChange={(event) => setPartnerBondId(event.target.value)}
                            value={partnerBondId}
                        />

                        <button 
                            disabled={partnerBondId !== elem[1] ? true : false }
                            className="m-2 rounded-md border-4 border-cyan-500 bg-sky-200 text-sky-900 font-bold"
                            type="submit"
                            onSubmit={(event) => { 
                            event.preventDefault()
                            handleBondDeleteSubmit(elem[0]) }}
                        >Delete</button>
                        </div>
                    )
                })
            } 
        </>
    )

}

function BondCards(props: {bondIdsGet: string[][] | undefined, ambitionIdGet: string}) {

    const filteredBonds = props?.bondIdsGet?.filter((value) => {
                    // filtering out bonds that are not updated
                    return value[1] !== "Empty"
                });

    const filteredAmbitionIds = filteredBonds?.flatMap(elem => {
        return elem?.[1] ?? []
    }) ?? ["ERROR"] // not the best error handling... I need to see what goes wrong to fix it 
    
    const { data, error } = api.newAmbition.getManyAmbitionsByIds.useQuery({ id: filteredAmbitionIds })

    console.log(error);
    
    return (
        <>
        {
            data?.map((elem, index) => {
                return (
                    <div
                        key={elem.id}
                        className={`border-black border flex justify-center items-end rounded-lg mt-2 ${index % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                    >

                        Ambition: {elem.name}
                        End value: {elem.endValue}
                        <br />

                        {
                            elem.record.map((value, secondIndex, secondArray) => {
                                return (
                                    <div
                                        key={value.id}
                                        className={`border-black border flex justify-center items-end rounded-lg mt-2 ${secondIndex % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                                    >
                                        Date recorded: {value.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                                        <br />
                                        Weight: {value.value}kg 
                                        <br />
                                        Difference to previous record: {value.value - (secondArray?.at((index === 0 
                                            ? 0 
                                            : secondIndex-1))?.value ?? 0)}kg
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })
        }
        </>
    )
}
