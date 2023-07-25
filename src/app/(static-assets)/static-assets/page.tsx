import CircleTick from 'public/circle-tick';
// import CircleTickSvg from '@/public/circle-tick-svg.svg';

import Image from 'next/image';
import apple from 'public/apple.jpg';

const Page = () => {
  return (
    <>
      <Image src={apple} width={100} height={100} alt="apple" />

      {/* Gifs are not supported for Next's <Image>. A workaround is to set unoptimized to true */}
      <Image
        src="/spinner.gif"
        width={50}
        height={50}
        alt="spinner"
        unoptimized={true}
      />

      {/* SVGR is a tool that allows us to import SVGs into your React applications as React components.  */}
      {/* The below is commented out intentionally, please see the README for implementation steps */}
      {/* <CircleTickSvg /> */}

      {/* You can make use of the Image tag for SVGs but you cannot modify the svg dynamically */}
      <Image
        src="/circle-tick-svg.svg"
        alt="circle tick"
        width="100"
        height="100"
      />

      {/* You can manually create a component to use an SVG in a dynamic way */}
      <CircleTick color="red" />
    </>
  );
};

export default Page;
