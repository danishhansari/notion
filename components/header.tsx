"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";
import { Button, buttonVariants } from "./ui/button";
import { useRouter } from "next/navigation";

export const Header = () => {
  const { user } = useUser();
  const router = useRouter();
  return (
    <div className='flex items-center justify-between p-2 md:p-4 bg-slate-50 border-b'>
      {user && (
        <button onClick={() => router.push("/")} className='text-xl'>
          {user?.firstName}
          {`'s`} Space
        </button>
      )}

      {/* Breadcrums */}

      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
};
