import Link from "next/link";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaUserAlt, FaListUl } from "react-icons/fa";
import { signIn, signOut, useSession } from "next-auth/react";
import { trpc } from "../../utils/trpc";
import ButtonGhost from "./ButtonGhost";

export default function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const { data: sessionData } = useSession();

  const { data: secretMessage } = trpc.auth.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );
  return (
    <>
      <nav className="relative mb-1 flex flex-wrap items-center justify-between bg-white px-1 py-2">
        <div className="container mx-auto flex flex-wrap items-center justify-between">
          <div className="relative flex w-full justify-between lg:static lg:block lg:w-auto lg:justify-start">
            <Link
              href="/"
              className="mr-4 inline-block whitespace-nowrap py-2 text-xl font-bold uppercase leading-relaxed text-black"
            >
              Portland Kid Camps
            </Link>
            <button
              className="block cursor-pointer rounded border border-solid border-transparent bg-transparent px-3 py-1 text-xl leading-none text-black outline-none focus:outline-none lg:hidden"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <GiHamburgerMenu />
            </button>
          </div>
          <div
            className={
              "flex-grow items-center lg:flex" +
              (navbarOpen ? " flex" : " hidden")
            }
            id="example-navbar-danger"
          >
            <ul className="flex list-none flex-col lg:ml-auto lg:flex-row">
              <li className="nav-item">
                <Link href="/list">
                  <ButtonGhost>
                    <FaListUl className="mr-2" />
                    Camp List
                  </ButtonGhost>
                </Link>
              </li>
              <li className="nav-item">
                <ButtonGhost>About</ButtonGhost>
              </li>
              <li className="nav-item">
                <ButtonGhost
                  onClick={sessionData ? () => signOut() : () => signIn()}
                >
                  <>
                    <FaUserAlt className="mr-2" />
                    {sessionData ? "Sign out" : "Sign in"}
                  </>
                </ButtonGhost>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
