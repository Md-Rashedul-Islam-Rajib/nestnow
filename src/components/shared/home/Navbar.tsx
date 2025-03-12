"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import NavMenu from "./NavMenu";
import { useRouter } from "next/navigation";
import { signOut} from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";
import logo from "../../../asset/logo1.png"
import logo2 from "../../../asset/logo2.png"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type UserProps = {
  user?: {
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    role?: string | null | undefined;
  };
};

const Navbar = ({ session }: { session: Session | null }) => {
  const router = useRouter();
  console.log(session);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  return (
    <nav className="bg-zinc-300 text-black shadow-md">
      <div className="container mx-auto flex items-center justify-between px-5 py-4">
        {/* Logo on the left */}
        <div className="flex items-center">
          <Image
            src={logo}
            alt="Logo"
            width={250}
            height={50}
            className="mr-2 hidden md:flex"
          />
          <Image
            src={logo2}
            alt="Logo"
            width={40}
            height={30}
            className="mr-2 md:hidden"
          />
        </div>

        {/* Menu for Large Screens - Center */}
        <div className="hidden md:flex gap-6">
          <NavMenu session={session} />
        </div>

        {/* Login/Logout Button - Right */}
        <div className="hidden md:flex">
          {session?.user ? (
            <div>
              <Avatar>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <AvatarImage
                      src={
                        session?.user?.image || "https://github.com/shadcn.png"
                      }
                      alt="User image"
                    />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem>Profile</DropdownMenuItem>
                      <DropdownMenuItem>
                        <Button
                          className="bg-red-500 hover:bg-red-600"
                          onClick={() => signOut()}
                        >
                          Log Out
                        </Button>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
                <AvatarFallback>User Image</AvatarFallback>
              </Avatar>
            </div>
          ) : (
            <Button onClick={handleLogin}>Log In</Button>
          )}
        </div>

        {/* Hamburger Menu Icon for Small Screens */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black focus:outline-none"
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
