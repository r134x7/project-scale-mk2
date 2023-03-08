export default function CreateBond() {

    /*
        need to useMutation to create a bond... 
        would need to create it first, tie it to an ambition and then... need to get the other person to join bond

        need to seed a user in the database.

        methods to join a bond (room):
        - enter the other person's "friendcode" to send an invite, if the other person accepts then a useMutation will be done to add the person to the room. Inside the room: useQuery to query the ambitions of the two users and their records... To save data, just query the last three days of records... would have to make a new API call for that... 
        - it would probably be easier just to tie bond to the ambitions and not also to the users.
        - try... model Bonds contains... other person's AmbitionId. When viewing bonds it will... take user's ambition and record data via props (if possible) so that only need to useQuery on view bond to view the ambition and record of the other person. (will need to make another API call so that the ambition query includes the record data populated so that passing data down via props is easier)

    */

    return (
        <>
            <button>
                Create Bond
            </button>
        </>
    )
}