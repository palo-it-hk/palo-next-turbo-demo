'use client';

import Link from 'next/link';

import { Button } from '../../atoms/Button-SC';
import { usePathname } from 'next/navigation';

export function NavBar() {
  const pathname = usePathname();
  const route = pathname.split('/')[1];

  return (
    <div style={{ margin: '20px 0px 20px 0px' }}>
      <Link href={`/${route}`}>
        <Button label="All posts" size="small" primary />
      </Link>
      <Link href={`/${route}/add-post`}>
        <Button label="Add new post" size="small" primary />
      </Link>
    </div>
  );
}

export default NavBar;
