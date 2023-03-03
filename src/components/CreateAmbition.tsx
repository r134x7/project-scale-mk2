import { Dialog, Listbox } from "@headlessui/react"
import { useState } from "react"
import { useSession } from "next-auth/react";
import { api } from "../utils/api";

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
   const [menuOpen, setMenuOpen] = useState(false);

    return (
        <>
            <button 
            className="bg-gray-600 rounded-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            >
                Create Ambition
            </button> 

            {
                menuOpen 
                ? <ModalForm />
                : undefined
            }
        </>
    )
}

function ModalForm() {

    // const hello = api.example.hello.useQuery({ text: "from tRPC" });

    // to retrieve user id.
    // const { data: sessionData } = useSession();
    
    // you have to call useMutation here i.e. the top level of the function. do not call it inside handleAmbitionSubmit else it errors due to invalid hook call - rule of hooks error
    const testAPI = api.newAmbition.createAmbition.useMutation();

    const ambitions = [
        { id: 1, name: "Lose Weight"},
        { id: 2, name: "Do nothing..."},
    ];

    const [open, setOpen] = useState(true);
    const [ambitionName, setAmbitionName] = useState(ambitions?.[1]?.name ?? "ERROR")
    const [target, setTarget] = useState(0);
    const [plan, setPlan] = useState("");

    // code reused from project-scale
    const handleAmbitionSubmit = () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        // event.preventDefault();
        console.log("begin");

        
    // const testAPI = api.newAmbition.createAmbition.useMutation()
        
        try {
            // api.newAmbition.createAmbition.useMutation().mutate({
            testAPI.mutate({
                name: ambitionName,
                endValue: target,
                dailyPlan: plan,
            })

            console.log("did it submit????");
            
            // addAmbition is a useMutation
            // const { data } = await addAmbition({
            //     variables: {
            //         id: sessionData?.user.id
            //         category: ambition,
            //         dailyPlan: dailyPlan,
            //         endValue: endValue,
            //     },
            // });
            } catch (error) {
                console.log(error);
            }

            // setDailyPlan("");
            // setEndValue("");
            // setOpenNewAmbition((o) => (!o));
            // setOpen(false)
            console.log("end of submit");
            
    };

    return (
        <Dialog 
        className={"bg-stone-600"}
        open={open} onClose={() => setOpen(false)}
        >
          <Dialog.Panel>
            <Dialog.Title>Create Ambition</Dialog.Title>
            <Dialog.Description>
                Something
            </Dialog.Description>

            {/* <form onSubmit={(event) => handleAmbitionSubmit(event)} */}
            {/* seemingly have to call the function like this due to the React.EventFormHandler<T> */}
            <form 
            className="bg-slate-50 grid grid-cols-1"
            onSubmit={(event) => { 
                event.preventDefault()
                handleAmbitionSubmit() }}
            >

                <Listbox value={ambitionName} onChange={setAmbitionName}>
                    <Listbox.Button>{ambitionName}</Listbox.Button>
                    <Listbox.Options>
                      {ambitions.map((data) => (
                        <Listbox.Option
                          key={data.id}
                          value={data.name /* value here goes to the onChange in Listbox parent */}
                        >
                          {data.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                </Listbox>

                <input 
                    className="border"
                    type="number" 
                    onChange={(event) => setTarget(Number(event.target.value))}
                    value={target}
                />

                <textarea  
                    onChange={(event) => setPlan(event.target.value)}
                    value={plan}
                />

                <button 
                    className="border"
                    type="submit"
                    // onSubmit={() => setOpen(false)}
                >Create</button>

            </form>

            <button onClick={() => setOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Dialog>
    )
}