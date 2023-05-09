type Props = {
  children: React.ReactNode;
};

async function isUser() {
  // Insert validation method and return result

  return true;
}

export default async function ProtectionLayout({ children }: Props) {
  const user = await isUser();

  return (
    <>
      <p>This is a protection layout</p>

      <div style={{ border: '1px solid black' }}>
        {!user ? <p>You cannot acccess this page </p> : children}
      </div>
    </>
  );
}
