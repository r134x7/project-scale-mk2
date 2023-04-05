import type { Ambitions, Record } from "@prisma/client";
import { useReducer, useState } from "react";
import { api } from "../utils/api"
import type { Bonds } from "@prisma/client";
import type { Dispatch } from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'; // required to actually get chart.js with react-chartjs-2 to work
import CreateBond from "./CreateBond";
Chart.register(...registerables); // to get the package working, source: https://www.chartjs.org/docs/next/getting-started/integration.html

function updateReducer(state: { bonds: Bonds[]}, action: { type: string, payload: Bonds}) {
    if (action.type === "update") {
        return {
            ...state,
            bonds: state.bonds.concat(action.payload)
        };
    }

    throw Error("Oops.")
}

function deleteReducer(state: {bondId: string[]}, action: {type: string, payload: string}) {
    if (action.type === "delete") {
        return {
            ...state,
            bondId: state.bondId.concat(action.payload),
        };
    }

    throw Error("Oops");
}

export default function ViewBonds(props: {ambitionPass: Ambitions //& {
    //record: Record[];
    //} 
}) {

    /*
        .............. 
        passing down the ambition and record data from viewAmbitions query

        when viewing bonds... instead of viewing individual records... should use chart.js to generate line charts

        next steps:
        - need to apply charts in view bonds and view records?
        - need to apply text length validation in form for create record and create ambition...
        - re-query things after doing a mutation
    */

    const [updateState, updateDispatch] = useReducer(updateReducer, { bonds: [] });

    const [deleteState, deleteDispatch] = useReducer(deleteReducer, { bondId: [] });

    const { data } = api.newBond.getBonds.useQuery({ ambitionId: props.ambitionPass.id})

    const filterBonds = data?.filter(elem => !deleteState.bondId.includes(elem.id))

    const bondIDs: string[][] | undefined = filterBonds?.map((elem, index) => {
        // [] containing bond id, partner ambition id or "Empty", index number
        // return [elem.id, elem.partnerId ?? "Empty", index.toString()]
        return [elem.id, elem.partnerId ?? "Empty"]
    })

    const checkEmptyBonds = bondIDs?.filter((value) => {
                    // filtering out bonds that are already updated
                    return value[1] === "Empty"
                }).length

    const [menuOpen, setMenuOpen] = useState(false);
    const [updateOpen, setUpateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [viewOpen, setViewOpen] = useState(false);

    // need to use reducers for update and delete
    // will need to requery bonds when updating...

    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            >
                Bonds
            </button>

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <CreateBond ambitionIdPass={props.ambitionPass.id} />

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
                    <UpdateBond bondIdsGet={bondIDs} updateDispatch={updateDispatch} />
                </div>

                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setDeleteOpen(!deleteOpen)}
                >
                   Delete Bonds 
                </button>
                <div className={`${deleteOpen ? "" : "hidden" }`}>
                    <DeleteBond bondIdsGet={bondIDs} deleteDispatch={deleteDispatch} />
                </div>


            </div>
        </>
    )
}

function UpdateBondInner(props: {bondId: string | undefined, bondIndex: string | undefined,
updateDispatch: Dispatch<{
    type: string;
    payload: Bonds;
}>
}) {

    const updateBondAPI = api.newBond.updateBond.useMutation({
        onSuccess(data) {
          props.updateDispatch({
            type: "update",
            payload: data,
          })  
        },
    });

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
        <div
            key={props.bondIndex} 
            className={`border-black border flex justify-center items-end rounded-lg mt-2 ${Number(props.bondIndex) % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
        >
                        
            <form 
                className="bg-slate-50 grid grid-cols-1"
                onSubmit={(event) => { 
                            event.preventDefault()
                            handleBondUpdateSubmit(props.bondId) 
                        }}
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
            >Submit</button>

        </form>

    </div>
    )
}

function UpdateBond(props: {bondIdsGet: string[][] | undefined,
    updateDispatch: Dispatch<{
        type: string;
        payload: Bonds;
    }>
}) {

    return (
        <>
            {
                props?.bondIdsGet?.filter((value) => {
                    // filtering out bonds that are already updated
                    return value[1] === "Empty"
                })
                .map((elem, index, array) => {
                    return (
                        <UpdateBondInner key={elem[2]} bondId={elem[0]} bondIndex={elem[2]} updateDispatch={props.updateDispatch} />
                    )
                })
            }        
        </>
    )
}

function DeleteBondInner(props: {bondId: string | undefined, partnerId: string | undefined, bondIndex: number,
deleteDispatch: Dispatch<{
    type: string;
    payload: string;
}>
}) {

    const [partnerBondId, setPartnerBondId] = useState("");

    const deleteBondAPI = api.newBond.deleteBond.useMutation({
        onSuccess(data) {
          props.deleteDispatch({
            type: "delete",
            payload: data.id,
          })  
        },
    });

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
            key={props.bondId} 
            className={`border-black border flex justify-center items-end rounded-lg mt-2 ${props.bondIndex % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
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

function DeleteBond(props: {bondIdsGet: string[][] | undefined,
    deleteDispatch: Dispatch<{
        type: string;
        payload: string;
    }>,
}) {

    /*
        Had to create an inner component for Delete Bond to ensure that each item in the array has an independent useState for the form data otherwise each item ends up having the same data when typing into one of them.
    */

    return (
        <>
            {
                props?.bondIdsGet?.map((elem, index, array) => {

                    return (
                        <DeleteBondInner bondId={elem[0]} partnerId={elem[1]} key={elem[0]} bondIndex={index} deleteDispatch={props.deleteDispatch} />
                    )
                })
            } 
        </>
    )

}

function BondCards(props: {bondIdsGet: string[][] | undefined, ambitionGet: Ambitions 
    //& {
    //record: Record[];
    //}
}) {

    // to update the bonds query after updating a bond, I need to concatenate it to the filtered bonds that way it will query again...
    
    const filteredBonds = props?.bondIdsGet?.filter((value) => {
                    // filtering out bonds that are not updated
                    return value[1] !== "Empty"
                });

    const filteredAmbitionIds = filteredBonds?.flatMap(elem => {
        return elem?.[1] ?? []
    }) ?? ["ERROR"] // not the best error handling... I need to see what goes wrong to fix it 
    
    const { data, error } = api.newAmbition.getManyAmbitionsByIds.useQuery({ id: filteredAmbitionIds })

    // console.log(error);
    // const userRecords = props.ambitionGet;

    const { data: userRecords } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionGet.id })

    // const userRecordsLength = props.ambitionGet.record.length;
    const userRecordsLength = userRecords?.length ?? 0;

    const dataRecordsLength = data?.map(elem => {
        return elem.record.length
    }) ?? [0];

    const maxRecordLength = Math.max(userRecordsLength, ...dataRecordsLength)



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
            <Line 
                datasetIdKey="Record Data"
                data={{
                    labels: Array.from({length:maxRecordLength}, (v,i) => i + 1),
                    datasets: [
                        {
                            data: userRecords?.map(elem => elem.value) ?? [0],
                            label: `${props.ambitionGet.name} - ${props.ambitionGet.userName ?? "Error"}`,
                            pointBorderColor: "black",
                        },
                        data?.map((elem, index) => {

                            const colors = [
                                "red",
                                "green",
                                "orange",
                                "purple",
                                "pink",
                                "crimson",
                                "silver",
                            ];

                            return {
                                    data: elem.record.map(value => value.value),
                                    label: `${elem.name} - ${elem.userName ?? "Error"}`,
                                    borderColor: colors[index],
                                    backgroundColor: colors[index],
                                    pointBorderColor: "black",
                            }
                        }) ?? {
                         data: [0, 1],
                         label: "Error",
                        }
                    ].flat()
                }}

                options={{
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: "Weight in kilograms (kg)"
                            },
                        },
                        x: {
                            title: {
                                display: true,
                                text: "Days recorded"
                            }
                        }
                    }
                }}
            />
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
