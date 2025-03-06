"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { navItems, navItems2 } from "@/constants/navMenu";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";

const NavMenu = ({ session }: { session: Session | null }) => {
  const pathname = usePathname(); // ✅ Get current route
  const menuItems = session?.user ? navItems2 : navItems;

  return (
    <div>
      <NavigationMenu>
        <NavigationMenuList className="space-x-6 text-white font-semibold">
          {menuItems.map((item,index) => {
            const isActive = pathname === item.link; // ✅ Check if route is active

            return (
              <Link key={index} href={item.link}>
                <NavigationMenuItem
                  className={`flex items-center space-x-2 transition-all rounded-xl py-1 px-2 ${
                    isActive
                      ? "bg-primary text-white dark:bg-primary/90"
                      : "hover:bg-white hover:text-zinc-700"
                  }`}
                >
                  <Icon
                    icon={item.icon}
                    width={24}
                    height={24}
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-white"
                        : "text-neutral-500 dark:text-white"
                    }`}
                  />
                  <span>{item.name}</span>
                </NavigationMenuItem>
              </Link>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
};

export default NavMenu;
