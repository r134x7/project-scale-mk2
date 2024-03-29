import { useSession } from "next-auth/react"
import { api } from "../utils/api";
import CreateAmbition from "../components/CreateAmbition";
import ViewAmbitions from "../components/ViewAmbitions";
import type { Ambitions } from "@prisma/client";
import { useReducer } from "react";

function reducer(state: {ambitions: Ambitions[]}, action: {type: string, payload: Ambitions}) {
    if (action.type === "concat") {
        return {
            ...state,
            ambitions: state.ambitions.concat(action.payload)
        };
    }

    throw Error("Oops.");
}

// need reducer here for deleting ambitions
function deleteReducer(state: {ambitionId: string[]}, action: {type: string, payload: string}) {
    if (action.type === "delete") {
        return {
            ...state,
            ambitionId: state.ambitionId.concat(action.payload),
        }
    }

    throw Error("Oops.");
}

export default function User() {

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

    const [state, dispatch] = useReducer(reducer, { ambitions:  [
        // {
        //     id: "0",
        //     name: "test",
        //     endValue: 0,
        //     dailyPlan: "0",
        //     createdAt: new Date(),
        //     updatedAt: new Date(),
        //     userId: "0",
        //     userName: "0",
        // }
    ]});

    const [deleteState, deleteDispatch] = useReducer(deleteReducer, { ambitionId: []});

    const { data: sessionData } = useSession();

    const { data: ambitionData } = api.newAmbition.getAmbitions.useQuery();

    // const concatData = ambitionData?.concat(...(state?.ambitions));
    const concatData = ambitionData?.concat(state.ambitions).flat();

    return (
        (sessionData)
        ? <div className={"grid grid-cols-1 gap-y-4  justify-center items-center bg-slate-900 text-white min-h-screen"}>
            Welcome, {sessionData.user?.name ?? "ERROR"}.

            <div className={`grid grid-cols-1 gap-y-4  justify-center items-center ${(concatData?.length ?? 0) >= 24  ? "hidden" : "" }`}>
                <CreateAmbition dispatch={dispatch} />
            </div>

            {
                // ambitionData?.map((elem, index) => {
                concatData?.filter(elem => !deleteState.ambitionId.includes(elem.id))
                ?.flatMap((elem, index) => {
                    return (
                        <ViewAmbitions ambitionPass={elem} index={index + 1} key={elem.id} deleteDispatch={deleteDispatch} />
                    )
                })
            }
        </div>
        : <div>
            You need to sign in to view this page.
        </div>
    )
  }