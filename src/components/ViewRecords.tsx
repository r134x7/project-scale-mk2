import { api } from "../utils/api";
import { useReducer, useState } from "react";
import type { Ambitions, Record } from "@prisma/client";
import type { Dispatch } from "react";

import { Line } from "react-chartjs-2";
import { Chart, registerables } from 'chart.js'; // required to actually get chart.js with react-chartjs-2 to work
Chart.register(...registerables); // to get the package working, source: https://www.chartjs.org/docs/next/getting-started/integration.html

function reducer(state: {index: number}, action: {type: string, payload: number}) {
    if (action.type === "change") {
        return {
            ...state,
            index: action.payload
        };
    }

    throw Error("Oops.");
}

export default function ViewRecords(props: {ambitionPass: Ambitions //& {
    //record: Record[];
    //}
    , recordsGet: Record[],
}) {

    /*
        create a button to view records

        since I am not using Mantine this time and HeadlessUI does not have a calendar... 

        Now that I have a growth onion:
        - need to create a function that makes a nested span for every piece of growth that you've made.
        - need to think of a way to create a list of progressive points...
        - for example: weight loss, going from 100kg to 90kg: instead of imperatively making a list of every kind of possible weight drop from 300kg to 50kg, it would be easier to calculate the progress at... 1/5 of the difference between the start value and the end value (10kg): hence every progressive step should be every 2kg.
        - how would I add other kinds of progress that cannot be determined by those values, e.g. coming up with a plan, coming up with a diet, coming up with an exercise routine, 
        - other ideas... 
    */

    const [menuOpen, setMenuOpen] = useState(false);

    const { data: recordData } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionPass.id })

    // surprisingly, a query is occurring when recordData is of length 0 and you add a new record.
    // so this is for the edge case where you create a new ambition and fill out your first record.
    // because that record will occur twice if the following is used const concatData = recordData?.concat(props.recordsGet);
    
    // same filtering method used in view bonds.
    const concatData = recordData?.filter(elem => {

        const getRecordIds = props.recordsGet?.map(value => value.id)

        return !getRecordIds.includes(elem.id)
    }).concat(props.recordsGet);

    const [state, dispatch] = useReducer(reducer, {index: 0})

    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            >
               View Records 
            </button>

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <LineGraph ambitionGet={props.ambitionPass} recordGet={concatData} indexGet={state.index} />
                <RecordCards recordsGet={concatData} ambitionGet={props.ambitionPass} dispatch={dispatch} />
            </div>
        </>
    )
}

function RecordCards(props: {
    ambitionGet: Ambitions //& {
    //record: Record[];
    //}
    recordsGet: Record[] | undefined,
    dispatch: Dispatch<{
        type: string;
        payload: number;
    }> 
}) {
    
    // const { data } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionIdGet }); 

    // const data = props.ambitionGet.record

    const subjectList = [
        {ambition: "Lose Weight", subject: "Weight:", units: "kg"},
        {ambition: "Study Subject", subject: "Study time: ", units: " minutes"},
        {ambition: "Perform Activity", subject: "Activity time:", units: " minutes"}
    ]

    const [getSubject, otherSubjects] = subjectList.filter(elem => elem.ambition === props.ambitionGet.name)

    const recordsLength = props.recordsGet?.length ?? 0;

    const [recordIndex, setRecordIndex] = useState(0);

    return (
        <>

        <div className="grid grid-cols-2 ">
        <button 
            className={`bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2`}
            // onClick={() => setRecordIndex(
            // (recordIndex === 0) ? 0 : recordIndex - 1
            // )}
            onClick={() => {
                setRecordIndex((recordIndex === 0) ? 0 : recordIndex - 1)
                props.dispatch({type: "change", payload: (recordIndex === 0) ? 0 : recordIndex - 1 })
            }}
            >Previous Day</button>
        <button 
            className={`bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2`}
            // onClick={() => setRecordIndex(
            // (recordIndex === recordsLength - 1) ? recordIndex : recordIndex + 1
            // )}
            onClick={() => {

                setRecordIndex(
                (recordIndex === recordsLength - 1) ? recordIndex : recordIndex + 1)
                props.dispatch({type: "change", payload: (recordIndex === recordsLength - 1) ? recordIndex : recordIndex + 1 })
            }} 
            >Next Day</button>
        </div>
            <div 
                        key={props.recordsGet?.[recordIndex]?.id}
                        className={`border-black border grid grid-cols-1 rounded-lg mt-2 bg-slate-500 text-slate-50`}
            >
                <p className="overflow-auto ml-2">
                    Date recorded: {props.recordsGet?.[recordIndex]?.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
                <p className="overflow-auto ml-2">
                    {getSubject?.subject ?? "Error"} {props.recordsGet?.[recordIndex]?.value}{getSubject?.units ?? "Error"} 
                </p>
                <p className="overflow-auto ml-2">
                    Difference to previous record: {(props.recordsGet?.[recordIndex]?.value ?? 0) - (props.recordsGet?.at((recordIndex === 0 
                        ? 0 
                        : recordIndex-1))?.value ?? 0)}{getSubject?.units ?? "Error"}
                </p>
                <p className="overflow-auto ml-2">Journal: {props.recordsGet?.[recordIndex]?.journal}</p> 
            </div>
        

        {/* {
            // data?.map((elem, index, array) => {
            props.recordsGet?.flatMap((elem, index, array) => {
                return (
                    <div 
                        key={elem.id}
                        className={`border-black border grid grid-cols-1 rounded-lg mt-2 ${index % 2 === 0 ? "bg-slate-500 text-slate-50" : "bg-sky-500 text-slate-900"}`}
                    >
                    <p className="overflow-auto ml-2">
                    Date recorded: {elem.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                    <p className="overflow-auto ml-2">
                    {getSubject?.subject ?? "Error"} {elem.value}{getSubject?.units ?? "Error"} 
                    </p>
                    <p className="overflow-auto ml-2">
                    Difference to previous record: {elem.value - (array?.at((index === 0 
                        ? 0 
                        : index-1))?.value ?? 0)}{getSubject?.units ?? "Error"}
                    </p>
                    <p className="overflow-auto ml-2">Journal: {elem.journal}</p> 
                    </div>
                )
            })
        } */}
        </>
    )
}

function LineGraph(props: {ambitionGet: Ambitions //& {
    //record: Record[];
    //}
    , recordGet: Record[] | undefined,
    indexGet: number
}) {

    const ambitionData = props.ambitionGet;

    // const recordData = props.ambitionGet.record;

    const unitsList = [
        {ambition: "Lose Weight", yLabel: "Weight in kilograms (kg)"},
        {ambition: "Study Subject", yLabel: "Minutes spent"},
        {ambition: "Perform Activity", yLabel: "Minutes spent"}
    ]

    const getUnits = unitsList.filter(elem => elem.ambition === props.ambitionGet.name)

    return (
        <>
            <Line 
                datasetIdKey="Record Data"
                data={{
                    labels: props.recordGet?.flatMap((elem, index) => index.toString()) ?? ["0"],
                    datasets: [
                        {
                            data: props.recordGet?.flatMap(elem => elem.value) ?? [0],
                            label: ambitionData.name,
                            backgroundColor: props.recordGet?.flatMap((elem, index) => {
                                if (index === props.indexGet) {
                                    return "red"
                                } else {
                                    return "violet"
                                }
                            })
                        },
                    ],
                }}

                options={{
                    scales: {
                        y: {
                            title: {
                                display: true,
                                text: getUnits[0]?.yLabel ?? "Error"
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
        </>
    )
}