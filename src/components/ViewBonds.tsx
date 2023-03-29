import type { Ambitions, Record } from "@prisma/client";
import { useState } from "react";
import { api } from "../utils/api"

export default function ViewBonds(props: {ambitionPass: Ambitions & {
    record: Record[];
} }) {

    /*
        .............. 
        passing down the ambition and record data from viewAmbitions query

        when viewing bonds... instead of viewing individual records... should use chart.js to generate line charts
    */

    const { data } = api.newBond.getBonds.useQuery({ ambitionId: props.ambitionPass.id})

    const bondIDs: string[][] | undefined = data?.map((elem, index) => {
        // [] containing bond id, partner ambition id or "Empty", index number
        return [elem.id, elem.partnerId ?? "Empty", index.toString()]
    })

    const checkEmptyBonds = bondIDs?.filter((value) => {
                    // filtering out bonds that are already updated
                    return value[1] === "Empty"
                }).length

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

            <div className={`${menuOpen ? "" : "hidden" }`}>

                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setViewOpen(!viewOpen)}
                >
                   View Bonds 
                </button>
                <div className={`${viewOpen ? "" : "hidden" }`}>
                    <BondCards ambitionGet={props.ambitionPass} bondIdsGet={bondIDs} />
                </div>


                <button 
                className={`bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2 ${checkEmptyBonds !== 0 ? "" : "hidden" }`} 
                onClick={() => setUpateOpen(!updateOpen)}
                >
                   Update Bonds 
                </button>
                <div className={`${updateOpen ? "" : "hidden" }`}>
                    <UpdateBond bondIdsGet={bondIDs} />
                </div>

                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setDeleteOpen(!deleteOpen)}
                >
                   Delete Bonds 
                </button>
                <div className={`${deleteOpen ? "" : "hidden" }`}>
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

                        <label className="flex justify-center mt-2 text-black">Enter the ambition ID of the other person you will share a bond with:</label>
                        <input 
                            className="border-solid border-cyan-500 rounded-md border-4 m-2 text-black"
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

function DeleteBondInner(props: {bondId: string | undefined, partnerId: string | undefined, bondIndex: string | undefined}) {

    const [partnerBondId, setPartnerBondId] = useState("");

    const deleteBondAPI = api.newBond.deleteBond.useMutation();

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
                        <div
                            key={props.bondIndex} 
                            className={`border-black border flex justify-center items-end rounded-lg mt-2 ${Number(props.bondIndex) % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                        >

                        <form
                            onSubmit={(event) => { 
                            event.preventDefault()
                            handleBondDeleteSubmit(props.bondId) 
                            }}
                        >
                            <label className="flex justify-center mt-2">Enter the ambition ID within the quotes &quot;{props.partnerId}&quot; to enable the delete button and then click delete:</label>
                            <input 
                                className="border-solid border-cyan-500 rounded-md border-4 m-2 text-black"
                                onChange={(event) => setPartnerBondId(event.target.value)}
                                value={partnerBondId}
                            />

                            <button 
                                disabled={partnerBondId !== props.partnerId ? true : false }
                                className="disabled:opacity-25 disabled:border-gray-500 m-2 rounded-md border-4 border-cyan-500 bg-sky-200 text-sky-900 font-bold"
                                type="submit"
                            >Delete</button>
                            </form>
                        </div>
                    )
}

function DeleteBond(props: {bondIdsGet: string[][] | undefined}) {

    /*
        Had to create an inner component for Delete Bond to ensure that each item in the array has an independent useState for the form data otherwise each item ends up having the same data when typing into one of them.
    */

    return (
        <>
            {
                props?.bondIdsGet?.map((elem, index, array) => {

                    return (
                        <DeleteBondInner bondId={elem[0]} partnerId={elem[1]} bondIndex={elem[2]} key={elem[2]} />
                    )
                })
            } 
        </>
    )

}

function BondCards(props: {bondIdsGet: string[][] | undefined, ambitionGet: Ambitions & {
    record: Record[];
}}) {

    const filteredBonds = props?.bondIdsGet?.filter((value) => {
                    // filtering out bonds that are not updated
                    return value[1] !== "Empty"
                });

    const filteredAmbitionIds = filteredBonds?.flatMap(elem => {
        return elem?.[1] ?? []
    }) ?? ["ERROR"] // not the best error handling... I need to see what goes wrong to fix it 
    
    const { data, error } = api.newAmbition.getManyAmbitionsByIds.useQuery({ id: filteredAmbitionIds })

    // console.log(error);

    const userRecords = props.ambitionGet.record;

    /*
        changing this to charts to make an easier summary.

        should grab every bond to put everything into one chart, else, can also have one to one charts too and then a total as well... should use pagination to make it easier to not scroll down onto everything... 

        displaying {
            chart:
            - need to check ambitions to make sure the Y-Axis values say the correct measurements
            - displays user names
            - ambitions names on title
            
            record:
            - displays latest record from each user
            - option to react to record
            - need to add to API to mutate adding a reaction to a record

            growth onion:
            - similar to growth onion in personal ambitions but goals achieved with who you bond.
        }
    */
    
    return (
        <>
        {
            data?.map((elem, index) => {
                return (
                    <div
                        key={elem.id}
                        className={`border-black border grid grid-cols-1 justify-center items-end rounded-lg mt-2 ${index % 2 === 0 ? "bg-green-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                    >
                        Bonded with: {elem.userName}
                        <br />
                        Ambition: {elem.name}
                        <br />
                        End value: {elem.endValue}kg
                        <br />

                        {
                            elem.record.map((value, secondIndex, secondArray) => {
                                return (
                                    <div
                                        key={value.id}
                                        className={`border-black border grid grid-cols-1 justify-center items-end rounded-lg mt-2 ${secondIndex % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
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
