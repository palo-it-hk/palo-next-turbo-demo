import Image from 'next/image';
import apple from 'public/apple.jpg';

const Page = () => {
  console.log('apple is', apple);
  return (
    <>
      <Image src={apple} width={100} height={100} alt="" />

      {/* Gifs are not supported for Next's <Image>. A workaround is to set unoptimized to true */}
      <Image
        src="/spinner.gif"
        width={50}
        height={50}
        alt=""
        unoptimized={true}
      />
    </>
  );
};

export default Page;
