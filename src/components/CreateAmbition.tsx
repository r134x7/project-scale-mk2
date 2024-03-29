import { Listbox } from "@headlessui/react";
import { useState, useReducer } from "react";
import { api } from "../utils/api";
import type { Dispatch } from "react";
import type { Ambitions } from "@prisma/client";

function reducer(state: {close: boolean}, action: {type: string}) {
    if (action.type === "change") {
        return {
            ...state,
            close: !state.close,
        };
    }

    throw Error("Oops.");
}

export default function CreateAmbition(props: {
    dispatch: Dispatch<{
        type: string;
        payload: Ambitions;
    }>
}) {


    /*
        have to use a useQuery for the categories kept in the database
        will have to see if it works the same way...

        Otherwise the simpler solution is to store some json locally and import

        need to add a mutation to create an ambition... 

        need to think carefully about form validation and having a utils folder to store the form validation to re-use in the other components... 

        use a button and when it is clicked either use a popover or modal 

        set up an onClick function for the button to open the modal.

        have to put the form inside the modal, the form needs onSubmit.

    */

    // const [menuOpen, setMenuOpen] = useState(state.close);
    const [state, dispatch] = useReducer(reducer, { close: false })

    return (
        <>
            <button 
            className="bg-gray-600 border-solid border-4 border-zinc-300 rounded-lg text-white"
            // onClick={() => setMenuOpen(!menuOpen)}
            onClick={() => dispatch({ type: "change"})}
            >
                Create Ambition 
            </button> 
            {/* <div  */}
            {/* className={`${menuOpen ? "" : "hidden" }`} */}
            {/* > */}
                <ModalForm menuOpen={state.close} dispatch={dispatch} dispatchAmbition={props.dispatch} />
            {/* </div> */}
        </>
    )
}

function ModalForm(props: {menuOpen: boolean, dispatch: Dispatch<{
    type: string;
}>, 
dispatchAmbition: Dispatch<{
    type: string;
    payload: Ambitions;
}> 
}) {

    const ambitionAPI = api.newAmbition.createAmbition.useMutation({
        onSuccess(data) {
            props.dispatchAmbition({
                type: "concat",
                payload: data,
            })
        },
    });

    const ambitions = [
        { id: 1, name: "Lose Weight", target:"Select a weight to reach in kilograms: (e.g. 60 for 60kg)"},
        { id: 2, name: "Study Subject", target:"Select a duration to reach in minutes per day: (e.g. 30 for 30 minutes per day)"},
        { id: 3, name: "Perform Activity", target:"Select a duration to reach in minutes per day: (e.g. 30 for 30 minutes per day)"},
    ];

    // const [open, setOpen] = useState(props.menu);
    const [ambitionName, setAmbitionName] = useState(ambitions?.[0]?.name ?? "ERROR")
    const [target, setTarget] = useState(0);
    const [plan, setPlan] = useState("");

    // code reused from project-scale
    const handleAmbitionSubmit = () => {
        
        try {
                ambitionAPI.mutate({
                    name: ambitionName,
                    endValue: target,
                    dailyPlan: plan,
                })
            } catch (error) {
                console.log(error);
            }

            setAmbitionName(ambitions?.[1]?.name ?? "ERROR");
            setTarget(0);
            setPlan("");
            props.dispatch({
                type: "change",
            })
    };

    const [getValue, restOfValues] = ambitions.filter(value => value.name === ambitionName)

    return (
        <div className={`${props.menuOpen ? "" : "hidden" }`}>
            
        {/* <Dialog 
        className={"bg-stone-600 mt-2"}
        open={open} 
        onClose={() => setOpen(false)}
        >
          <Dialog.Panel>
            <Dialog.Title className={"text-white flex justify-center items-center"}>Create an Ambition</Dialog.Title> */}

            {/* <form onSubmit={(event) => handleAmbitionSubmit(event)} */}
            {/* seemingly have to call the function like this due to the React.EventFormHandler<T> */}
            <form 
            className="bg-slate-700 grid grid-cols-1 border-2 border-black rounded-lg"
            onSubmit={(event) => { 
                event.preventDefault()
                handleAmbitionSubmit() }}
            >

                <label className="flex justify-center mt-2">
                    Click on the list below to select an ambition:
                    </label>
                <Listbox value={ambitionName} onChange={setAmbitionName}>
                    <Listbox.Button className={"mt-2 ml-2 mr-2 border-solid border-4 rounded-md border-cyan-500 bg-slate-800"}>
                      Selected Ambition: {ambitionName}
                    </Listbox.Button>
                    <Listbox.Options className={"ml-2 mr-2 border-solid border-4 rounded-md"}>
                      {ambitions.map((data) => (
                        <Listbox.Option
                          className={"border-solid border hover:bg-emerald-800 hover:text-white"}
                          key={data.id}
                          value={data.name /* value here goes to the onChange in Listbox parent */}
                        >
                          {data.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                </Listbox>

                <label className="flex justify-center mt-2">
                    {getValue?.target}
                    </label>
                <input 
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 bg-slate-800"
                    type="number" 
                    min="0"
                    step="0.1"
                    required
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
                >Submit</button>

            </form>

            {/* <button 
                className={"text-white flex justify-center items-center"}
                onClick={() => setOpen(false)}
            >
                Cancel
            </button> */}
          {/* </Dialog.Panel>
        </Dialog> */}
        </div>
    )
}