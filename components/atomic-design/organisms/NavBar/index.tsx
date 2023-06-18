import Link from 'next/link';

import { Button } from '../../atoms/Button-SC';

export function NavBar() {
  return (
    <div style={{ margin: '20px 0px 20px 0px' }}>
      <Link href="/redux">
        <Button label="All posts" size="small" />
      </Link>
      <Link href="/redux/add-post">
        <Button label="Add new post" size="small" />
      </Link>
    </div>
  );
}

export default NavBar;
