import Image from "next/image";

export const Heroes = () => {
  return (
    <div className='flex flex-col items-center justify-center max-w-5xl'>
      <div className='flex items-center'>
        <div className='relative max-w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:h-[400px] md:w-[400px]'>
          <Image
            src='/hero0.png'
            fill
            alt='Documents'
            className='object-contain'
          />
        </div>

        <div className='relative h-[200px] md:h-[350px] w-[350px]'>
          <Image
            src='/hero3.png'
            fill
            alt='Document'
            className='object-contain'
          />
        </div>
      </div>
    </div>
  );
};
