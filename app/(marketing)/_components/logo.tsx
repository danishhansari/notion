import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const Logo = () => {
  return (
    <div className='md:flex items-center gap-x-2'>
      <Image src={"/logo.png"} height={40} width={40} alt='Logo' />
      <p className={cn("font-semibold hidden md:block", font.className)}>Notion</p>
    </div>
  );
};
