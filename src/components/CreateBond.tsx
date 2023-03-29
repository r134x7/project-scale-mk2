import { api } from "../utils/api";
import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function CreateBond(props: {ambitionIdPass: string}) {

    /*
        need to useMutation to create a bond... 
        would need to create it first, tie it to an ambition and then... need to get the other person to join bond

        need to seed a user in the database.

        methods to join a bond (room):
        - enter the other person's "friendcode" to send an invite, if the other person accepts then a useMutation will be done to add the person to the room. Inside the room: useQuery to query the ambitions of the two users and their records... To save data, just query the last three days of records... would have to make a new API call for that... 
        - it would probably be easier just to tie bond to the ambitions and not also to the users.
        - try... model Bonds contains... other person's AmbitionId. When viewing bonds it will... take user's ambition and record data via props (if possible) so that only need to useQuery on view bond to view the ambition and record of the other person. (will need to make another API call so that the ambition query includes the record data populated so that passing data down via props is easier)

    */

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 border-solid border-4 border-zinc-300 rounded-lg text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            >
                Create Bond
            </button>

            <div className={`${menuOpen ? "" : "hidden" }`}>
                <BondForm ambitionIdGet={props.ambitionIdPass} />
            </div>
        </>
    )
}

function BondForm(props: {ambitionIdGet: string}) {

    const bondAPI = api.newBond.createBond.useMutation();

    // const [open, setOpen] = useState(true);
    const [lock, setLock] = useState(false);

    // make a simple modal with instructions for how to create and use a bond... 
    // after creating a bond, then I need to make another form for updating the bond when viewing that bond.

    const handleBondSubmit = () => {

        try {
            bondAPI.mutate({
                ambitionId: props.ambitionIdGet,
            })
        } catch (error) {
            console.log(error);
            
        }

        setLock(true)
        // setOpen(false);
    };

    return (
        <div>

            <form 
                onSubmit={(event) => { 
                    event.preventDefault()
                    handleBondSubmit() }}
            >

                <ol>
                    To create a bond with another user:
                    <li>
                        1) Click the submit button to confirm creating bond for this ambition you are on.
                    </li>
                    <li>
                        2) Go to View Bond for this ambition.
                    </li>
                    <li>3) View Bond will display the ID number for your ambition.</li>
                    <li>4) You can copy the ID number and share it through your preferred means of communication with the person who you want to create a bond with.</li>
                    <li>5) The person you want to create a bond with will need to create their own bond from one of their ambitions and then share the ID number of their ambition with you.</li>
                    <li>6) Take the ID from the other person you want to create a bond with and go to Update Bond.</li>
                    <li>7) Enter the ID into form for Update Bond and update the bond.</li>
                    <li>8) You will then be able to view the ambition and records of the other person.</li>
                </ol>

                <button 
                    className={`m-2 pl-2 pr-2 rounded-md border-4 border-cyan-500 bg-sky-200 text-sky-900 font-bold ${lock === true ? "disabled:opacity-25" : ""}`}
                    disabled={lock === true}
                    type="submit"
                    // onSubmit={(event) => { 
                    //     event.preventDefault()
                    //     handleBondSubmit() }}
                >Submit</button>
            </form>
        </div>
    )
}