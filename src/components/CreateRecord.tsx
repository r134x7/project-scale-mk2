import { useState } from "react";
import { api } from "../utils/api";
import { Dialog } from "@headlessui/react";

export default function CreateRecord(props: {ambitionIdPass: string}) {

    /*
        create a button to create record
        need a modal to enter a value and journal record for the day
    */

    const [menuOpen, setMenuOpen] = useState(false);
    
    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            >
                Create Record
            </button>

            {
                menuOpen 
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
                value: inputValue,
                journal: notes,
            })
            } catch (error) {
                console.log(error);
            }
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