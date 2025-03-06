'use client'
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";
import { signOut} from "next-auth/react"
import { Session } from "next-auth";

export type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
  } 
}


const Navbar =({session}: {session : Session | null }) => {
    const router = useRouter()
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-zinc-300 text-white">
      <div className="container mx-auto flex items-center justify-center px-5 py-4">
        {/* Menu for Large Screens */}
        <div className="hidden md:flex md:justify-between gap-6 items-center">
          <NavMenu session={session}/>
          <div>
            {session?.user ? (
              <Button
                className="bg-red-500 hover:bg-white hover:text-black"
                onClick={() => signOut()}
              >
                Log Out
              </Button>
            ) : (
              <Button onClick={handleLogin}>Log In</Button>
            )}
          </div>
        </div>

        {/* Hamburger Menu Icon for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Mobile */}
      {isMenuOpen && (
        <div className="md:hidden bg-zinc-800 text-white px-5 pb-4 space-y-4">
          <NavMenu session={session} />
          <div>
            {session?.user ? (
              <Button
                className="bg-red-500 hover:bg-red-600"
                onClick={() => signOut()}
              >
                Log Out
              </Button>
            ) : (
              <Button onClick={handleLogin}>Log In</Button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
