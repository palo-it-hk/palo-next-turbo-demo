import { Button } from '@/components/atomic-design/atoms/Button-SC';
import Link from 'next/link';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Link href="/redux-demo/add-post">
        <Button label="Add new post" size="small" />
      </Link>
      <hr />
      {children}
    </>
  );
}
