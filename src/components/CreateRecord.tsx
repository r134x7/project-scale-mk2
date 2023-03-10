import { useState } from "react";
import { api } from "../utils/api";
import { Dialog } from "@headlessui/react";

export default function CreateRecord(props: {ambitionIdPass: string}) {

    /*
        create a button to create record
        need a modal to enter a value and journal record for the day

        need to get 
    */

    const [menuOpen, setMenuOpen] = useState(false);

    const { data } = api.newRecord.getRecords.useQuery({ ambitionId: props.ambitionIdPass }); 

    const latestDate = data?.at?.(-1)?.createdAt.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) ?? "ERROR";

    const today = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })

    const buttonText = (latestDate !== today)
        ? "Create Record"
        : "Record saved for today"
    
    return (
        <>
            <button 
            className="bg-gray-600 border-solid border-l-indigo-800 border-r-indigo-800 border-t-purple-800 border-b-purple-800 border-2 rounded-lg text-white text-sm p-1 m-1"
            onClick={() => setMenuOpen(!menuOpen)}
            >
                {buttonText}
            </button>

            {
                menuOpen && latestDate !== today
                ? <RecordModal ambitionIdGet={props.ambitionIdPass
                } />
                : undefined
            }
        </>
    )
}

function RecordModal(props: {ambitionIdGet: string}) {

    const writeRecord = api.newRecord.createRecord.useMutation();


    const [open, setOpen] = useState(true);
    const [inputValue, setInputValue] = useState(0);
    const [notes, setNotes] = useState("");

    const handleRecordSubmit = () => {
        
        try {
            writeRecord.mutate({
                ambitionId: props.ambitionIdGet,
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
            setOpen(false);
    };

    return (
        <Dialog 
        className={"bg-stone-600"}
        open={open} onClose={() => setOpen(false)}
        >
          <Dialog.Panel>
            <Dialog.Title>Create Record</Dialog.Title>
            <Dialog.Description>
               Do something... 
            </Dialog.Description>

            <form 
            className="bg-slate-50 grid grid-cols-1"
            onSubmit={(event) => { 
                event.preventDefault()
                handleRecordSubmit() }}
            >

                <input 
                    className="border"
                    type="number" 
                    onChange={(event) => setInputValue(Number(event.target.value))}
                    value={inputValue}
                />

                <textarea  
                    onChange={(event) => setNotes(event.target.value)}
                    value={notes}
                />

                <button 
                    className="border"
                    type="submit"
                >Create</button>

            </form>

            <button onClick={() => setOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Dialog>
    )
}