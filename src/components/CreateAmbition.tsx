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