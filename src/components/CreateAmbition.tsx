import { Dialog, Listbox } from "@headlessui/react";
import { useState, useReducer, createContext, useContext, useEffect } from "react";
import { api } from "../utils/api";
import type { Dispatch, SetStateAction } from "react";

// const MenuContext = createContext< Dispatch<SetStateAction<boolean>>>(() => (true));
// const MenuContext = createContext<any>(undefined);
// console.log(menuContext);


function reducer(state: {close: boolean}, action: {type: string}) {
    if (action.type === "close_menu") {
        return {
            ...state,
            close: !state.close,
        };
    }

    throw Error("Oops.");
}

export default function CreateAmbition() {


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
            onClick={() => dispatch({ type: "close_menu"})}
            >
                Create Ambition 
            </button> 
            {/* <div  */}
            {/* className={`${menuOpen ? "" : "hidden" }`} */}
            {/* > */}
                <ModalForm menuOpen={state.close} dispatch={dispatch} />
            {/* </div> */}
        </>
    )
}

function ModalForm(props: {menuOpen: boolean, dispatch: Dispatch<{
    type: string;
}>}) {

    const ambitionAPI = api.newAmbition.createAmbition.useMutation();

    const ambitions = [
        { id: 1, name: "Lose Weight"},
        { id: 2, name: "Do nothing..."},
    ];

    // const [open, setOpen] = useState(props.menu);
    const [ambitionName, setAmbitionName] = useState(ambitions?.[1]?.name ?? "ERROR")
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
                type: "close_menu",
            })
    };


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
            className="bg-slate-50 grid grid-cols-1 border-2 border-black rounded-lg"
            onSubmit={(event) => { 
                event.preventDefault()
                handleAmbitionSubmit() }}
            >

                <Listbox value={ambitionName} onChange={setAmbitionName}>
                    <Listbox.Button className={"mt-2 ml-2 mr-2 border-solid border-4 rounded-md border-cyan-500"}>
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