"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  useUser,
} from "@clerk/nextjs";

export const Header = () => {
  const { user } = useUser();
  return (
    <div className='flex items-center justify-between p-2 md:p-4 bg-slate-50 border-b'>
      {user && (
        <h1 className='text-xl'>
          {user?.firstName}
          {`'s`} Space
        </h1>
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
