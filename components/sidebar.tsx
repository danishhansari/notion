"use client";
import {
  Sidebar as ShadCnSidebar,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useUser } from "@clerk/nextjs";
import { NewDocumentButton } from "./new-document-button";
import { getAllDocument } from "@/actions/action";
import { useEffect, useState } from "react";
import { Document } from "@/types/types";

export const Sidebar = () => {
  const { user } = useUser();
  const [data, setData] = useState<Document[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const documents = await getAllDocument();
        setData(documents);
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    };
    getData();
  }, []);

  console.log(data);

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
          <div className='p-3 md:p-5'>
            <NewDocumentButton />

            {data && (
              <div className='mt-4'>
                {data.map((doc) => {
                  return <div key={doc.id}>{doc.title}</div>;
                })}
              </div>
            )}
          </div>
        </ShadCnSidebar>
        <SidebarTrigger />
      </SidebarProvider>
    </>
  );
};
