import { useState } from "react";
import CreateRecord from "./CreateRecord";
import ViewRecords from "./ViewRecords";
import ViewBonds from "./ViewBonds";
import ViewGrowth from "./ViewGrowth";
import { api } from "../utils/api";
import type { Ambitions, Record } from "@prisma/client";

export default function ViewAmbitions(props: {ambitionPass: 
    Ambitions & {
        record: Record[];
    },
    index: number,
}) {

    /*
        need to useQuery to fetch ambitions

        to make sure only one record can be recorded per day. need to check new Date() and compare it to new Date(recentRecord)

        displaying: {
            growth onion: to display growth in the form of ................ goals achieved which are layered on top of each other in an onion with the earliest growth at the center and latest growth at the edge.
        }
    */

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 border-solid border-4 border-zinc-300 rounded-lg text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            >
                View Ambition #{props.index}
            </button>

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <AmbitionCards ambitionGet={props.ambitionPass} />
            </div>

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <UpdateAmbition ambitionGet={props.ambitionPass} />
            </div>
        </>
    )
}

function AmbitionCards(props: {ambitionGet: 
    Ambitions & {
        record: Record[];
    }}) {

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

    // const callAmbitions = api.newAmbition.getAmbitions.useQuery();

    // const { data } = callAmbitions

    return (
                    <div key={props.ambitionGet.id} className={"border-2 rounded-lg grid grid-cols-1 "} >
                         <p className="flex justify-center border">Ambition: {props.ambitionGet.name}</p> 
                         <br />
                         <p className="flex justify-center border">Target value: {props.ambitionGet.endValue}kg</p> 
                         <br />
                         <p className="flex justify-center border">Daily Plan: {props.ambitionGet.dailyPlan}</p> 
                         <br />
                         <CreateRecord ambitionIdPass={props.ambitionGet.id} />
                         <br />
                         <ViewRecords ambitionPass={props.ambitionGet} />
                         <br />
                         <ViewGrowth ambitionPass={props.ambitionGet} />
                         <br />
                         <ViewBonds ambitionPass={props.ambitionGet} />
                         <br />
                    </div>
    )
    
    // return (
    //     <>
    //     <div>
    //         {
    //         data?.map((elem, index) => {


    //             return (
    //                 <div key={elem.id} className={"border-2 rounded-lg grid grid-cols-1 "} >
    //                      <p className="flex justify-center border">Ambition {index + 1}: {elem.name}</p> 
    //                      <br />
    //                      <p className="flex justify-center border">Target value: {elem.endValue}kg</p> 
    //                      <br />
    //                      <p className="flex justify-center border">Daily Plan: {elem.dailyPlan}</p> 
    //                      <br />
    //                      <CreateRecord ambitionIdPass={elem.id} />
    //                      <br />
    //                      <ViewRecords ambitionPass={elem} />
    //                      <br />
    //                      <ViewGrowth ambitionPass={elem} />
    //                      <br />
    //                      <CreateBond ambitionIdPass={elem.id} />
    //                      <br />
    //                      <ViewBonds ambitionPass={elem} />
    //                      <br />
    //                 </div>
    //             )
    //         })
    //         }
    //     </div>
    //     </>
    // )
}

function UpdateAmbition(props: {ambitionGet: 
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