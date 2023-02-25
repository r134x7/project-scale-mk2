import { useSession } from "next-auth/react"

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

    return (
        (sessionData)
        ? <div>
            Welcome, {sessionData.user?.name ?? "ERROR"}.
        </div>
        : <div>
            You need to sign in to view this page.
        </div>
    )
  }