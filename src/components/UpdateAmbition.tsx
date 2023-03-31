import { useState } from "react";
import { api } from "../utils/api";
import type { Ambitions, Record } from "@prisma/client";

export default function UpdateAmbition(props: {ambitionPass: 
    Ambitions & {
        record: Record[];
    },
    index: number,
}) {

    const [menuOpen, setMenuOpen] = useState(false);
    const [updateOpen, setUpateOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

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
                onClick={() => setUpateOpen(!updateOpen)}
                >
                   Update Ambition 
                </button>
                <div className={`${updateOpen ? "" : "hidden" }`}>
                    <UpdateAmbitionInner ambitionGet={props.ambitionPass} />
                </div>

                <button 
                className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
                onClick={() => setDeleteOpen(!deleteOpen)}
                >
                   Delete Ambition
                </button>
                <div className={`${deleteOpen ? "" : "hidden" }`}>
                    <DeleteAmbitionInner ambitionGet={props.ambitionPass} />
                </div>
            </div>
        </>
    )
}


function UpdateAmbitionInner(props: {ambitionGet: 
    Ambitions & {
        record: Record[];
    }}) {

    const [target, setTarget] = useState(props.ambitionGet.endValue);

    const [plan, setPlan] = useState(props.ambitionGet.dailyPlan);

    const updateAmbitionAPI = api.newAmbition.updateAmbitions.useMutation();

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
    };

    return (
            <div
                className={`border-black border flex justify-center items-end rounded-lg mt-2 `}
            >
            
                <form 
                className="bg-slate-50 grid grid-cols-1"
                onSubmit={(event) => { 
                    event.preventDefault()
                    handleAmbitionUpdateSubmit(props.ambitionGet.id, plan, target) 
                }}
                >

                <label className="flex justify-center mt-2">Select target value in kilograms:</label>
                <input 
                    className="border-solid border-cyan-500 rounded-md border-4 m-2"
                    type="number" 
                    onChange={(event) => setTarget(Number(event.target.value))}
                    value={target}
                />

                <label className="flex justify-center mt-2">Write a daily plan for achieving your ambition: (max 1000 characters)</label>
                <textarea  
                    className="border-solid border-cyan-500 rounded-md border-4 m-2"
                    onChange={(event) => setPlan(event.target.value)}
                    value={plan}
                    maxLength={1000}
                />

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
    Ambitions & {
        record: Record[];
    }}) {

    const [ambitionId, setAmbitionId] = useState("");

    const deleteAmbitionAPI = api.newAmbition.deleteAmbitions.useMutation(); 

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
                className="bg-slate-50 grid grid-cols-1"
                onSubmit={(event) => { 
                    event.preventDefault()
                    handleAmbitionDeleteSubmit(props.ambitionGet.id) 
                }}
                >

                <label className="flex justify-center mt-2">Enter the ambition ID within the quotes &quot;{props.ambitionGet.id}&quot; to enable the delete button and then click delete:</label>
                <input 
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 text-black"
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
