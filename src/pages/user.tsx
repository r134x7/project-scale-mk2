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
    */

    return (
        (sessionData)
        ? <div>
            Welcome, {sessionData.user?.name}.
        </div>
        : <div>
            You need to sign in to view this page.
        </div>
    )
  }