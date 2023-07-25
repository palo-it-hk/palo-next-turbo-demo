'use client';

import { usePathname } from 'next/navigation';

import NavBar from 'components/atomic-design/organisms/NavBar/';

export function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const route = pathname.split('/')[1];

  return (
    <>
      <h1 className="text-2xl font-bold">{route} example</h1>
      <hr />
      <NavBar />
      {children}
    </>
  );
}

export default Layout;
