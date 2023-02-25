import { Menu } from "@headlessui/react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Layout() {

    const { data: sessionData } = useSession();
    // need to create a layout to wrap around the _app.tsx return statement to persist the layout between pages
    // source: https://nextjs.org/docs/basic-features/layouts
    return (
        <div className={"p-1 bg-slate-400"}>
        <Menu>
            <Menu.Button className={"p-2 bg-slate-600 rounded-lg font-bold text-white uppercase font-mono"}
            >Menu</Menu.Button>
            <Menu.Items className={"grid grid-cols-1 bg-slate-200 rounded-lg"}>
                <Menu.Item>
                    {({active}) => (
                        <Link className={`${active ? 'bg-slate-600 text-cyan-200' : "bg-slate-900 text-white"}   text-left p-2 m-1 rounded-lg`} href="/">
                            Home
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <Link className={`${active ? 'bg-slate-600 text-cyan-200' : "bg-slate-900 text-white"} text-left p-2 m-1 rounded-lg`} href="/user">
                            User
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <button className={`${active ? 'bg-slate-600 text-cyan-200' : "bg-slate-900 text-white"} text-left p-2 m-1 rounded-lg`}
                        onClick={sessionData ? () => void signOut() : () => void signIn()}
                        >
                            {sessionData ? "Sign out" : "Sign in"}
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
        </div>
    )
}