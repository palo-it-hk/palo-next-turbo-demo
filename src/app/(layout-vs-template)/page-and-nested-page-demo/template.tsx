'use client';

import { useState, ReactNode } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const SampleSharedTemplate = ({ children }: { children: ReactNode }) => {
  const [boxColor, setBoxColor] = useState('');
  const pathname = usePathname();
  let targetPath = '';

  const currentPageNum = pathname.slice(pathname.length - 3, pathname.length);

  if (currentPageNum == 'one') {
    targetPath = 'page-and-nested-page-demo/sample-leaf-segment-two';
  } else {
    targetPath = 'page-and-nested-page-demo/sample-leaf-segment-one';
  }

  function changeColor() {
    setBoxColor('salmon');
  }
  return (
    <>
      <button
        style={{ backgroundColor: 'black', color: 'white' }}
        onClick={changeColor}
      >
        This is a button from template.tsx
      </button>
      <div
        style={{
          backgroundColor: boxColor,
          border: '1px solid salmon',
          display: 'inline-block',
        }}
      >
        <span>
          Click on the button from template.tsx, I persist this color when
          navigating to another page of the same parent segment
        </span>
      </div>

      <div style={{ color: 'powderblue' }}>{children}</div>
      <Link href={targetPath}>
        <button style={{ border: '1px solid black' }}>
          This navigation button is from template.tsx
        </button>
      </Link>
    </>
  );
};

export default SampleSharedTemplate;
