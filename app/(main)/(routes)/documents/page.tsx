"use client";
import Image from "next/image";

import { PlusCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";

const DocumentsPage = () => {
  const { user } = useUser();
  const random = Math.floor(Math.random() * 9 + 1);
  return (
    <div className='h-full flex flex-col items-center justify-center space-y-4'>
      <Image src={`/hero${random}.png`} alt='Logo' height={300} width={300} />
      <h2 className='text-lg font-medium'>
        Welcome to {user?.firstName}&apos;s Notion
      </h2>
      <Button>
        <PlusCircle className='h-4 w-4 mr-2' />
        Create a note
      </Button>
    </div>
  );
};

export default DocumentsPage;
