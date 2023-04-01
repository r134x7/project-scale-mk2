import { useReducer, useState } from "react";
import CreateRecord from "./CreateRecord";
import ViewRecords from "./ViewRecords";
import ViewBonds from "./ViewBonds";
import ViewGrowth from "./ViewGrowth";
import UpdateAmbition from "./UpdateAmbition";
import type { Ambitions, Record } from "@prisma/client";
import type { Dispatch } from "react";

function reducer(state: {records: Record[]}, action: {type: string, payload: Record}) {
    if (action.type === "concat") {
        return {
            ...state,
            records: state.records.concat(action.payload)
        };
    }

    throw Error("Oops.");
}

function ambitionReducer(state: {ambitionValue:  number, ambitionPlan: string}, action: {type: string, payload: {value: number, plan: string}}) {
    if (action.type === "update") {
        return {
            ...state,
            ambitionValue: action.payload.value,
            ambitionPlan: action.payload.plan,
        };
    }

    throw Error("Oops.");
}

export default function ViewAmbitions(props: {ambitionPass: 
    Ambitions //& {
        // record: Record[];
    // }
    ,
    index: number,
    deleteDispatch: Dispatch<{
        type: string;
        payload: string;
    }>,
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
                <AmbitionCards ambitionGet={props.ambitionPass} index={props.index} deleteDispatch={props.deleteDispatch} />
            </div>
        </>
    )
}

function AmbitionCards(props: {ambitionGet: 
    Ambitions //& {
        // record: Record[];
    // }
    , index: number
    deleteDispatch: Dispatch<{
        type: string;
        payload: string;
    }>,
}) {

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

    const [state, dispatch] = useReducer(reducer, { records: []})

    const [ambitionState, ambitionDispatch] = useReducer(ambitionReducer, {
        ambitionValue: props.ambitionGet.endValue,
        ambitionPlan: props.ambitionGet.dailyPlan, 
    })

    return (
                    <div key={props.ambitionGet.id} className={"border-2 rounded-lg grid grid-cols-1 "} >
                         <p className="flex justify-center border">Ambition: {props.ambitionGet.name}</p> 
                         <br />
                         <p className="flex justify-center border">Target value: {ambitionState.ambitionValue}kg</p> 
                         <br />
                         <p className="flex justify-center border">Daily Plan: {ambitionState.ambitionPlan}</p> 
                         <br />
                         <CreateRecord ambitionIdPass={props.ambitionGet.id} dispatch={dispatch} />
                         <br />
                         <ViewRecords ambitionPass={props.ambitionGet} recordsGet={state.records} />
                         <br />
                         {/* <ViewGrowth ambitionPass={props.ambitionGet} /> */}
                         <br />
                         {/* <ViewBonds ambitionPass={props.ambitionGet} /> */}
                         <br />
                         <UpdateAmbition ambitionPass={props.ambitionGet} dispatch={ambitionDispatch} deleteDispatch={props.deleteDispatch} index={props.index} />
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

