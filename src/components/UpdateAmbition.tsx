import { useReducer, useState } from "react";
import { api } from "../utils/api";
import type { Ambitions, Record } from "@prisma/client";
import type { Dispatch } from "react";

function reducer(state: {close: boolean}, action: {type: string}) {
    if (action.type === "change") {
        return {
            ...state,
            close: !state.close,
        };
    }

    throw Error("Oops.");
}

export default function UpdateAmbition(props: {ambitionPass: 
    Ambitions //& {
        // record: Record[];
    // }
    ,
    index: number,
    dispatch: Dispatch<{
        type: string;
        payload: {
            value: number;
            plan: string;
        };
    }>,
    deleteDispatch: Dispatch<{
        type: string;
        payload: string;
    }>,
}) {

    const [menuOpen, setMenuOpen] = useState(false);
    // const [updateOpen, setUpateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const [updateState, updateDispatch] = useReducer(reducer, { close: false });

    return (
        <>
            <button 
            className="bg-gray-600 border-solid border-4 border-zinc-300 rounded-lg text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            >
                Update/Delete Ambition #{props.index}
            </button>

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <button 
                className={`bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2`} 
                onClick={() => updateDispatch({ type: "change"})}
                >
                   Update Ambition 
                </button>
                <div className={`${updateState.close ? "" : "hidden" }`}>
                    <UpdateAmbitionInner ambitionGet={props.ambitionPass} dispatch={props.dispatch} changeMenuDispatch={updateDispatch} />
                </div>

                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setDeleteOpen(!deleteOpen)}
                >
                   Delete Ambition
                </button>
                <div className={`${deleteOpen ? "" : "hidden" }`}>
                    <DeleteAmbitionInner ambitionGet={props.ambitionPass} deleteDispatch={props.deleteDispatch} />
                </div>
            </div>
        </>
    )
}


function UpdateAmbitionInner(props: {ambitionGet: 
    Ambitions //& {
        // record: Record[];
    // }
    ,
    dispatch: Dispatch<{
        type: string;
        payload: {
            value: number;
            plan: string;
        };
    }>,
    changeMenuDispatch: Dispatch<{
        type: string;
    }>, 
}) {

    const [target, setTarget] = useState(props.ambitionGet.endValue);

    const [plan, setPlan] = useState(props.ambitionGet.dailyPlan);

    const updateAmbitionAPI = api.newAmbition.updateAmbitions.useMutation({
        onSuccess(data) {
            props.dispatch({
                type: "update",
                payload: {
                    value: data.endValue, 
                    plan: data.dailyPlan,
                },
            })
        },
    });

    const handleAmbitionUpdateSubmit = (ambitionId: string, dailyPlan: string, endValue: number ) => {

        try {
            updateAmbitionAPI.mutate({
                id: ambitionId,
                dailyPlan: dailyPlan,
                endValue: endValue,
            })
        } catch (error) {
            console.log(error);
        }

        props.changeMenuDispatch({
            type: "change"
        })
    };

    const subjectList = [
        {ambition: "Lose Weight", target: "Select a weight to reach in kilograms: (e.g. 60 for 60kg)"},
        {ambition: "Study Subject", target:"Select a duration to reach in minutes per day: (e.g. 30 for 30 minutes per day)"},
        {ambition: "Perform Activity", target:"Select a duration to reach in minutes per day: (e.g. 30 for 30 minutes per day)"},
    ]

    const [getValue, restOfValues] = subjectList.filter(elem => elem.ambition === props.ambitionGet.name)

    return (
            <div
                className={`border-black border flex justify-center items-end rounded-lg mt-2 `}
            >
            
                <form 
                className="bg-slate-700 grid grid-cols-1"
                onSubmit={(event) => { 
                    event.preventDefault()
                    handleAmbitionUpdateSubmit(props.ambitionGet.id, plan, target) 
                }}
                >

                <label className="flex justify-center mt-2">{getValue?.target ?? "Error"}</label>
                <input 
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 bg-slate-800"
                    type="number" 
                    onChange={(event) => setTarget(Number(event.target.value))}
                    value={target}
                />

                <label className="flex justify-center mt-2">Write a daily plan for achieving your ambition:</label>
                <textarea  
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 bg-slate-800"
                    onChange={(event) => setPlan(event.target.value)}
                    value={plan}
                    maxLength={1000}
                />
                <p className="flex justify-start ml-2 text-sm">  {plan.length}/1000 characters.</p>

                <button 
                    className="m-2 rounded-md border-4 border-cyan-500 bg-sky-200 text-sky-900 font-bold"
                    type="submit"
                    // onSubmit={() => setOpen(false)}
                >Update</button>

                </form>

            </div>
        )
}

function DeleteAmbitionInner(props: {ambitionGet: 
    Ambitions //& {
        // record: Record[];
    // }
    ,
    deleteDispatch: Dispatch<{
        type: string;
        payload: string;
    }>,
}) {

    const [ambitionId, setAmbitionId] = useState("");

    const deleteAmbitionAPI = api.newAmbition.deleteAmbitions.useMutation({
        onSuccess(data) {
            props.deleteDispatch({
                type: "delete",
                payload: data.id,
            })   
        },
    }); 

    const handleAmbitionDeleteSubmit = (ambitionId: string) => {

        try {
            deleteAmbitionAPI.mutate({
                id: ambitionId,
            })
        } catch (error) {
            console.log(error);
        }
    };

    return (
            <div
                className={`border-black border flex justify-center items-end rounded-lg mt-2 `}
            >
            
                <form 
                className="bg-slate-700 grid grid-cols-1"
                onSubmit={(event) => { 
                    event.preventDefault()
                    handleAmbitionDeleteSubmit(props.ambitionGet.id) 
                }}
                >

                <label className="flex justify-center mt-2">Enter the ambition ID within the quotes &quot;{props.ambitionGet.id}&quot; to enable the delete button and then click delete:</label>
                <input 
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 bg-slate-800"
                    onChange={(event) => setAmbitionId(event.target.value)}
                    value={ambitionId}
                />

                <button 
                    disabled={ambitionId !== props.ambitionGet.id ? true : false }
                    className="disabled:opacity-25 disabled:border-gray-500 m-2 rounded-md border-4 border-stone-800 bg-red-500 text-stone-900 font-bold"
                    type="submit"
                >Delete</button>

                </form>

            </div>
        )
}
