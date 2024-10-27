"use client";
import {
  Sidebar as ShadCnSidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { NewDocumentButton } from "./new-document-button";

export const Sidebar = () => {
  const { user } = useUser();
  return (
    <>
      <SidebarProvider>
        <ShadCnSidebar>
          <div className='p-3 md:p-5 border-b'>
            <h1 className='text-xl'>
              {user?.firstName}
              {`'s`} Space
            </h1>
          </div>
          <div className="p-3 md:p-5">
            <NewDocumentButton />
          </div>
        </ShadCnSidebar>
        <SidebarTrigger />
      </SidebarProvider>
    </>
  );
};
