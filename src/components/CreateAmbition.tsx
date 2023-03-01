import { Dialog, Listbox } from "@headlessui/react"
import { useState } from "react"

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
    
    const ambitions = [
        { id: 1, name: "Lose Weight"},
        { id: 2, name: "Do nothing..."},
    ];

    const [open, setOpen] = useState(true);
    const [value, setValue] = useState(ambitions?.[1] ?? { id: 3, name: "Error"})
    const [target, setTarget] = useState(0);

    // code reused from project-scale
    // const handleAmbitionSubmit = async (event: Event) => {
    //     event.preventDefault();
        
    //     try {
    //         // addAmbition is a useMutation
    //         const { data } = await addAmbition({
    //             variables: {
    //                 category: ambition,
    //                 dailyPlan: dailyPlan,
    //                 endValue: endValue,
    //             },
    //         });
    //         } catch (error) {
    //             console.log(error);
    //         }

    //         // setDailyPlan("");
    //         // setEndValue("");
    //         // setOpenNewAmbition((o) => (!o));
    // };

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
          <Dialog.Panel>
            <Dialog.Title>Create Ambition</Dialog.Title>
            <Dialog.Description>
                Something
            </Dialog.Description>

            <form //onSubmit={handleAmbitionSubmit}
            >

            <Listbox value={value} onChange={setValue}>
                <Listbox.Button>{value.name}</Listbox.Button>
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

            <button onClick={() => setOpen(false)}>Create</button>

            </form>

            <button onClick={() => setOpen(false)}>Cancel</button>
          </Dialog.Panel>
        </Dialog>
    )
}