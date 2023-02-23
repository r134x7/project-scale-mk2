import { Menu } from "@headlessui/react"
import Link from "next/link"
import { signIn, signOut, useSession } from "next-auth/react";

export default function Layout() {

    const { data: sessionData } = useSession();
    // need to create a layout to wrap around the _app.tsx return statement to persist the layout between pages
    // source: https://nextjs.org/docs/basic-features/layouts
    return (
        <Menu>
            <Menu.Button>Menu</Menu.Button>
            <Menu.Items>
                <Menu.Item>
                    {({active}) => (
                        <Link className={`${active ? 'bg-blue-500' : "bg-red-400"}`} href="/">
                            Home
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <Link className={`${active ? 'bg-blue-500' : "bg-red-400"}`} href="/">
                            User
                        </Link>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <button className={`${active ? 'bg-blue-500' : "bg-red-400"}`}
                        onClick={sessionData ? () => void signOut() : () => void signIn()}
                        >
                            {sessionData ? "Sign out" : "Sign in"}
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    )
}