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

    return (
        <>
            <button>
                Create Ambition
            </button> 
        </>
    )
}

function ModalForm() {

    // const hello = api.example.hello.useQuery({ text: "from tRPC" });

    // to retrieve user id.
    // const { data: sessionData } = useSession();

    const ambitions = [
        { id: 1, name: "Lose Weight"},
        { id: 2, name: "Do nothing..."},
    ];

    const [open, setOpen] = useState(true);
    const [ambitionName, setAmbitionName] = useState(ambitions?.[1]?.name ?? "ERROR")
    const [target, setTarget] = useState(0);
    const [plan, setPlan] = useState("");

    // code reused from project-scale
    const handleAmbitionSubmit = (event: Event) => {
        event.preventDefault();
    // const testAPI = api.newAmbition.createAmbition.useMutation()
        
        try {
            api.newAmbition.createAmbition.useMutation().mutate({
                name: ambitionName,
                endValue: target,
                dailyPlan: plan,
            })

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
            setOpen(false)
    };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Dialog.Panel>
            <Dialog.Title>Create Ambition</Dialog.Title>
            <Dialog.Description>
                Something
            </Dialog.Description>

            {/* <form onSubmit={(event) => handleAmbitionSubmit(event)} */}
            {/* seemingly have to call the function like this due to the React.EventFormHandler<T> */}
            <form onSubmit={() => handleAmbitionSubmit}
            >

                <Listbox value={ambitionName} onChange={setAmbitionName}>
                    <Listbox.Button>{ambitionName}</Listbox.Button>
                    <Listbox.Options>
                      {ambitions.map((data) => (
                        <Listbox.Option
                          key={data.id}
                          value={data}
                        >
                          {data.name}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                </Listbox>

                <input 
                    type="number" 
                    onChange={(event) => setTarget(Number(event.target.value))}
                    value={target}
                />

                <textarea  
                    onChange={(event) => setPlan(event.target.value)}
                    value={plan}
                />

                <button 
                    type="submit"
                    // onSubmit={() => setOpen(false)}
                >Create</button>

            </form>

            <button onClick={() => setOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Dialog>
    )
}