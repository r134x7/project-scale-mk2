import { useState, useReducer } from "react";
import { api } from "../utils/api";
import type { Dispatch } from "react";
import type { Ambitions, Record } from "@prisma/client";

function reducer(state: {close: boolean, recorded: Record[]}, action: {type: string, payload: Record | undefined}) {
    if (action.type === "change") {
        return {
            ...state,
            close: !state.close,
        };
    } else if (action.type === "record") {
        return {
            ...state,
            close: !state.close,
            recorded: (action?.payload) ? state.recorded.concat(action.payload) : state.recorded,
        }
    }

    throw Error("Oops.");
}

export default function CreateRecord(props: {ambitionPass: Ambitions, 
    dispatch: Dispatch<{
        type: string;
        payload: Record;
    }>
}) {

    /*
        create a button to create record
        need a modal to enter a value and journal record for the day

        need to get 
    */

    // const [menuOpen, setMenuOpen] = useState(false);

    const [state, dispatch] = useReducer(reducer, { close: false, recorded: []});

    const { data } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionPass.id }); 

    const concatDataFlat = data?.concat(state.recorded).flat()

    const latestDate = concatDataFlat?.at?.(-1)?.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ?? "ERROR";

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const buttonText = (latestDate !== today)
        ? "Create Record"
        : "Record saved for today"
    
    return (
        <>
            <button 
            className="bg-gray-600 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2 rounded-lg text-white text-sm p-1 m-1"
            onClick={() => dispatch({ type: "change", payload: undefined})}
            >
                {buttonText}
            </button>

            <div className={`${state.close && latestDate !== today ? "" : "hidden" }`}>
                <RecordModal ambitionGet={props.ambitionPass} dispatch={props.dispatch} changeMenu={dispatch} />
            </div>
        </>
    )
}

function RecordModal(props: {ambitionGet: Ambitions,
    dispatch: Dispatch<{
        type: string;
        payload: Record;
    }>,
    changeMenu: Dispatch<{
        type: string;
        payload: Record | undefined;
    }>
}) {

    const writeRecord = api.newRecord.createRecord.useMutation({
        onSuccess(data) {
            props.dispatch({
                type: "concat",
                payload: data,
            }),
            props.changeMenu({
                type: "record",
                payload: data,
            })
        },
    });


    // const [open, setOpen] = useState(true);
    const [inputValue, setInputValue] = useState(0);
    const [confirmValue, setConfirmValue] = useState<number | undefined>(undefined);
    const [notes, setNotes] = useState("");

    const handleRecordSubmit = () => {
        
        try {
            writeRecord.mutate({
                ambitionId: props.ambitionGet.id,
                /* 
                    new Date must be created from client side to prevent a bug found back in project-scale 
                    where the server time is in a different time zone compared to the client which
                    can prevent making one record per day from working.
                */
                createdAt: new Date(), 
                value: inputValue,
                journal: notes,
            })
            } catch (error) {
                console.log(error);
            }

            setNotes("");
            setInputValue(0);
            // setOpen(false);
    };

    const subjectList = [
        {ambition: "Lose Weight", subject: "Record today\'s weight in kilograms."},
        {ambition: "Study Subject", subject: "Record how much you studied today in minutes."},
        {ambition: "Perform Activity", subject: "Record   the duration of today's activity in minutes."},
    ]

    const [getSubject, restOfOtherSubjects] = subjectList.filter(elem => elem.ambition === props.ambitionGet.name);

    return (
        <>
        {/* <Dialog 
        className={"bg-stone-600"}
        open={open} onClose={() => setOpen(false)}
        >
          <Dialog.Panel>
            <Dialog.Title>Create Record</Dialog.Title>
            <Dialog.Description>
               Do something... 
            </Dialog.Description> */}

            <form 
            className="bg-slate-700 grid grid-cols-1 border-2 border-black rounded-lg"
            onSubmit={(event) => { 
                event.preventDefault()
                handleRecordSubmit() }}
            >


                <label className="flex justify-center mt-2">{getSubject?.subject ?? "Error"}</label>
                <input 
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 bg-slate-800"
                    type="number" 
                    min="0"
                    step="0.1"
                    required
                    onChange={(event) => setInputValue(Number(event.target.value))}
                    value={inputValue}
                />

                <label className="flex justify-center mt-2">Confirm your entry by entering the same value as above:</label>
                <input 
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 bg-slate-800"
                    type="number" 
                    min="0"
                    step="0.1"
                    required
                    onChange={(event) => setConfirmValue(Number(event.target.value))}
                    value={confirmValue}
                />

                <label className="flex justify-center mt-2">Journal for today: (Optional)</label>
                <textarea  
                    className="border-solid border-cyan-500 rounded-md border-4 m-2 bg-slate-800"
                    onChange={(event) => setNotes(event.target.value)}
                    value={notes}
                    maxLength={200}
                />
                <p className="flex justify-start ml-2 text-sm">  {notes.length}/200 characters.</p>

                <button 
                    className="m-2 rounded-md border-4 border-cyan-500 bg-sky-200 text-sky-900 font-bold disabled:opacity-25"
                    type="submit"
                    disabled={(confirmValue === inputValue) ? false : true}
                >Create</button>

            </form>

            {/* <button onClick={() => setOpen(false)}>Cancel</button> */}
          {/* </Dialog.Panel>
        </Dialog> */}

        </>
    )
}