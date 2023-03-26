import { useState } from "react";
import type { Ambitions, Record } from "@prisma/client";

export default function ViewGrowth(props: {ambitionPass: Ambitions & {
    record: Record[];
}}) {

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
                <GrowthOnion ambitionGet={props.ambitionPass} />
            </div>
            <div >
               <span className={`border bg-slate-500 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>
                Test.................
                    <span className={`border bg-slate-400 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>What....................................................................
                        <span className={`border bg-slate-300 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>Very Long Sentence ............ 
                            <span className={`border bg-slate-200 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>surface?
                                <span className={`border bg-slate-100 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>or core?  .........
                                </span>
                            </span>
                        </span>
                    </span>
                </span> 
                
                
            </div>
        </>
    )
}

function GrowthOnion(props: {ambitionGet: Ambitions & {
    record: Record[];
}}) {
    
    const endValue = props.ambitionGet.endValue;

    const startValue = props.ambitionGet.record[0]?.value;
    
    const latestValue = props.ambitionGet.record?.at(-1)?.value;

    const progressValue = (startValue ?? 0) - (latestValue ?? 0)

    // const data = props.ambitionGet.record

    // need to get the target value from ambition and then the first record value which is the start value and then for weight loss: start value - end value * .2 to get 20% value... don't want to use 10% to give almost instant gratification
    // having found a way to calculate this using array length, could have the option changing the growth values from 20% to 10%
    const growthValues = Array.from({length:5},(v,i) => {

        return (startValue === undefined)
            ? []
            : (endValue - startValue) * ((i+1) / length)
    }).flat()

    // make a loop checking that the progress value is greater than the growth value to get the onionDepth
    const onionDepth = growthValues?.flatMap(elem => {

        return (progressValue > elem)
            ? elem
            : []
    })

    // need to figure out how to make this nested...
    /*
        <span className={`border bg-slate-500 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>
            text
            <span ...> 
                nested text
            </span>
        </span>
    */
    function recursiveOnion(depth: number[], index: number, onion: JSX.Element): JSX.Element {

        if (index === depth.length - 1) {
            return onion
        } else {
            onion = (
                    <span className={`border bg-slate-500 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>
                        {depth[index]}kg
                        {onion}
                    </span>
            )

            return recursiveOnion(depth, index + 1, onion)
        }
    }

    return (
        <div>
        {
            recursiveOnion(onionDepth, 0, <></>)
        }
        {
            // onionDepth?.reduce((acc, next) => {
            //     return (
            //         <span className={`border bg-slate-500 rounded-full p-2 grid col-span-1 justify-items-stretch text-center`}>
            //             {next}kg
            //         </span>
            //     )
            // }, <></>)
        }
        </div>
    )
}