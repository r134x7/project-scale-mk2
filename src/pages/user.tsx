import { useSession } from "next-auth/react"
import CreateAmbition from "../components/CreateAmbition";
import ViewAmbitions from "../components/ViewAmbitions";

export default function User() {

    const { data: sessionData } = useSession();

    // need to have session: user signed in
    // create a new ambition 
    /*
        pick category
        consider making a roadmap...
        example losing weight
        structure:
            short-term goals
                research how to lose weight
                new diet if needed
            long-term goals
                target weight
                maintain diet
            journalling
                record weight daily
                write about what you did that day...
    */
    // view ambitions
    /*
        consider new ideas instead of just repeating project-scale...
             go it alone with an ambition or...
             establish a bond with someone else to achieve an ambition together... 
             can establish multiple bonds for either multiple bonds or larger scale ambitions...
             features of bonds...
             ....................
             can sever bonds at any time
             how to communicate?.......
             
       Do a weight loss example...
       establish a bond with someone
           bond type: rival!
           group ambition:
               ...
               the goal of the group is...
               compete with each other to reach their goals
                    how to communicate/what can be shared?... 
                        shared weight records
                        communicate using premade messages/emojis/stickers... 

            bond type: other
                ... 
                the goal of the group is...
                support each other to reach their goals
        
    */

    /*
        structure of the user dashboard... 
            - create new ambition
            - view ambitions
            - create bond (how?... some of kind of code?) {
                ... 
                user creates a "room", that room has an id, user gives that ID to other person to join room. The room will then have the shared details for the users to see their progress and communicate.
            }
            - account settings (deleting user account? delete ambitions? )
    */

    return (
        (sessionData)
        ? <div className={"grid grid-cols-1 gap-y-2  justify-center items-center"}>
            Welcome, {sessionData.user?.name ?? "ERROR"}.
            <CreateAmbition />
            <ViewAmbitions />
        </div>
        : <div>
            You need to sign in to view this page.
        </div>
    )
  }