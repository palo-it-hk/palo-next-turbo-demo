import NavBar from '@/components/atomic-design/organisms/NavBar/';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <h1 className="text-2xl font-bold">Redux example</h1>
      <hr />
      <NavBar />
      {children}
    </>
  );
}

export default Layout;
