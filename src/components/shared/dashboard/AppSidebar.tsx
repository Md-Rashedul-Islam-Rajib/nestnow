import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import { NavMain } from "./NavMain";



const AppSidebar = () => {

const data = {
  navMain: [
    {
      title: "Project",
      url: "/dashboard/blogs",
      icon: "material-symbols:terminal-rounded",
      isActive: true,
      items: [
        {
          title: "Create Project",
          url: "/dashboard/projects/create",
        },
        {
          title: "Update Project",
          url: "/dashboard/projects/update",
        },
        {
          title: "Delete Project",
          url: "/dashboard/projects/delete",
        },
      ],
    },
    {
      title: "Blogs",
      url: "/dashboard/blogs",
      icon: "line-md:rss",
      items: [
        {
          title: "Create Blog",
          url: "/dashboard/blogs/create",
        },
        {
          title: "Update Blog",
          url: "/dashboard/blogs/update",
        },
        {
          title: "Delete Blog",
          url: "/dashboard/blogs/delete",
        },
      ],
    },
    {
      title: "Messages",
      url: "#",
      icon: "ic:twotone-message",
      items: [
        {
          title: "Message",
          url: "/dashboard/messages",
        },
      ],
    },
  ],
};
 

  

  return (
    <Sidebar className="fixed top-0 left-0 h-full w-64 bg-white/30 backdrop-blur-lg shadow-lg transition-transform duration-300 z-50">
          <SidebarContent className="p-4 mt-[30%]">
              <NavMain items={data.navMain} />
     
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
