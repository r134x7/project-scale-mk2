import { useState } from "react";
import { api } from "../utils/api";
import type { Ambitions, Record } from "@prisma/client";

export default function ViewGrowth(props: {ambitionPass: Ambitions 
    // & {
    // record: Record[];
    // }
    , recordsGet: Record[],
}) {

    /*
        Now that I have a growth onion:
        - need to create a function that makes a nested span for every piece of growth that you've made.
        - need to think of a way to create a list of progressive points...
        - for example: weight loss, going from 100kg to 90kg: instead of imperatively making a list of every kind of possible weight drop from 300kg to 50kg, it would be easier to calculate the progress at... 1/5 of the difference between the start value and the end value (10kg): hence every progressive step should be every 2kg.
        - how would I add other kinds of progress that cannot be determined by those values, e.g. coming up with a plan, coming up with a diet, coming up with an exercise routine, 
        - other ideas... 
    */

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg text-sm text-white p-1 m-1 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2" 
            onClick={() => setMenuOpen(!menuOpen)}
            >
               View Growth 
            </button>

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <GrowthOnion ambitionGet={props.ambitionPass} recordsGet={props.recordsGet} />
            </div>
        </>
    )
}

function GrowthOnion(props: {ambitionGet: Ambitions 
    // & {
    // record: Record[];
    // }
    , recordsGet: Record[],
}) {

    const { data: recordData } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionGet.id});

    // const updatedData = data?.concat(props.recordsGet);
    // same filtering method used in view bonds.
    const updatedData = recordData?.filter(elem => {

        const getRecordIds = props.recordsGet?.map(value => value.id)

        return !getRecordIds.includes(elem.id)
    }).concat(props.recordsGet);
    
    const endValue = props.ambitionGet.endValue;

    const subjectList = [
        {ambition: "Lose Weight", subject: "Lost", units: ["kg"]},
        {ambition: "Study Subject", subject: "Spent", units: [" minutes", " minutes per day", " days"] },
        {ambition: "Perform Activity", subject: "Spent", units:[" minutes", " minutes per day", " days"]},
    ]

    const [getSubject, restOfSubjects] = subjectList.filter(elem => elem.ambition === props.ambitionGet.name)
    // const startValue = props.ambitionGet.record[0]?.value;
    
    // const latestValue = props.ambitionGet.record?.at(-1)?.value;
    const sumValue: number | undefined = updatedData?.reduce((acc, next) => {
        return acc + (next?.value ?? 0)
    }, 0)

    const sumLength = updatedData?.length ?? 0;

    const startValue = updatedData?.[0]?.value;

    const latestValue = updatedData?.at(-1)?.value;

    const progressValue = -((startValue ?? 0) - (latestValue ?? 0))

    // const progressSum = 

    // const filterJournals = updatedData?.filter(elem => elem.journal.length !== 0);

    // const journalLength = filterJournals?.length ?? 0;

    // need to get the target value from ambition and then the first record value which is the start value and then for weight loss: start value - end value * .2 to get 20% value... don't want to use 10% to give almost instant gratification
    // having found a way to calculate this using array length, could have the option changing the growth values from 20% to 10%
    const growthValues = Array.from({length:20},(v,i) => {

        if (startValue === undefined) {
            return []
        } else if (getSubject?.ambition === "Lose Weight") {
            return (endValue - startValue) * ((i+1) / 20)
        } else {
            return (i === 0)
                ? sumValue ?? 0
                : (i === 1)
                    ? (sumValue ?? 0) / sumLength
                    : (i === 2)
                        ? sumLength
                        : []
        }

        // return (startValue === undefined)
        //     ? []
        //     : (getSubject?.ambition === "Lose Weight")
        //         ? (endValue - startValue) * ((i+1) / 20)
        //         // we take the sumValue...
        //         // 1000 minutes and then
        //         : (sumValue ?? 0) / (endValue)
    }).flat()

    /* 
    days sum
    minutes average = minutes sum / days sum
    minutes sum
    */

    // make a loop checking that the progress value is greater than the growth value to get the onionDepth
    const onionDepth = growthValues?.flatMap(elem => {

        // console.log(progressValue < elem);
        
        return (progressValue < elem && getSubject?.ambition === "Lose Weight")
            ? elem
            : (getSubject?.ambition !== "Lose Weight")
                ? elem
                : []
    })

    // console.log(progressValue);
    
    // console.log(growthValues);
    
    // console.log(onionDepth);
    

    // need to figure out how to make this nested...
    /*
        <span className={`border bg-slate-500 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>
            text
            <span ...> 
                nested text
            </span>
        </span>
    */

    /*
        there is possibly a runtime issue with tailwind where I cannot get the colour I want to use... 
        
        Works fine with slate colour probably because it's being used elsewhere.
    */
    function recursiveOnion(subject: {
        ambition: string;
        subject: string;
        units: string[];
    } | undefined, depth: number[], index: number, onion: JSX.Element, animate: number): JSX.Element {

        if (depth?.[index] === undefined) {
            return onion
        } else {

            const newOnion = (
                    <span className={`border rounded-full p-2 grid col-span-1 justify-items-stretch text-center text-cyan-900 
                    ${animate === 1 
                        ? "animate-colorChange3" 
                        : animate === 2
                        ? "animate-colorChange2"
                        : "animate-colorChange1"
                    }
                    `} 
                    // style={{ backgroundColor: colorRange?.[index] ?? colorRange.at(-1)}}
                    >
                      {subject?.subject ?? "Error"} {depth[index]?.toFixed((subject?.ambition === "Lose Weight") ? 2 : 0)}{subject?.units?.[index] ?? "kg"}
                        {onion}
                    </span>
            )

            return recursiveOnion(subject, depth, index + 1, newOnion, (animate === 3 ? 1 : animate + 1))
        }
    }

    // const runtimeColours = [
    //     // "rgb(207 250 254)", // cyan-100 
    //     "rgb(165 243 252)", // cyan-200
    //     "rgb(103 232 249)", // cyan-300
    //     "rgb(34 211 238)", // cyan-400
    //     "rgb(6 182 212)", // cyan-500
    //     "rgb(8 145 178)", // cyan-600
    //     "rgb(14 116 144)", // cyan-700
    //     "rgb(21 94 117)", // cyan-800 
    //     "rgb(22 78 99)", // cyan-900 
    //     "rgb(8 51 68)", // cyan-950
    // ]

    // const [testNumber, setTestNumber] = useState("")
    
    // let aJournal: number;

    // function setJournal() {
    //     if (!aJournal) {
    //         aJournal = window.setInterval(function journalMaker(){
    //                 if (journalLength === 0) {
    //                     // return "Beginning..."
    //                     return setTestNumber("Beginning...")
    //                 } else {
    //                     // return filterJournals?.[(Math.floor(Math.random() * (journalLength - 1)))]?.journal ?? "Error..."
    //                     return setTestNumber(
    //                         filterJournals?.[(Math.floor(Math.random() * (journalLength - 1)))]?.journal ?? "Error..."
    //                     );
    //                 }
    //             }, 5000)
    //     }
            
    //     console.log(aJournal);
        
    //    return testNumber 
    // }

    return (
        <div>
        {
            recursiveOnion(getSubject, onionDepth, 0, 
            // <></>, 
            <span className={`border bg-cyan-100 rounded-full p-2 grid col-span-1 justify-items-stretch text-center text-cyan-900`}>
                Beginning...
            </span>,
            1)
        }
        </div>
    )
}