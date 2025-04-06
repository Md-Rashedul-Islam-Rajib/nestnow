import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";

import { auth } from "@/auth";

const AppSidebar = async () => {
  const session = await auth();
  const userRole = session?.user?.role as "admin" | "landlord" | "tenant"; 
  console.log(userRole);
  const menuItems = {
    landlord: [
      {
        title: "Rental House",
        url: "/dashboard/rental-house",
        isActive: true,
        items: [
          {
            title: "Create Rental House",
            url: "/dashboard/rental-house/create",
          },
          {
            title: "Update Rental House",
            url: "/dashboard/rental-house/update",
          },
          {
            title: "Delete Rental House",
            url: "/dashboard/rental-house/delete",
          },
        ],
      },
     
      {
        title: "Messages",
        url: "/dashboard/messages",
        items: [{ title: "Message", url: "/dashboard/messages" }],
      },
    ],
    admin: [
      {
        title: "Rental House",
        url: "/dashboard/rental-house",
        isActive: true,
        items: [
          {
            title: "Create Rental House",
            url: "/dashboard/rental-house/create",
          },
        ],
      },
      {
        title: "Messages",
        url: "/dashboard/messages",
        items: [{ title: "Message", url: "/dashboard/messages" }],
      },
    ],
    tenant: [
      {
        title: "Messages",
        url: "/dashboard/messages",
        items: [{ title: "Message", url: "/dashboard/messages" }],
      },
    ],
  };

  return (
    <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-lg shadow-lg transition-transform duration-300 z-50">
      <SidebarContent className="p-4 mt-[30%]">
        <NavMain items={menuItems[userRole!]} />
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
