import { useSession } from "next-auth/react"

export default function User() {

    const { data: sessionData } = useSession();

    // need to have session: user signed in

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