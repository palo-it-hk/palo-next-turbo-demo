// To ensure that the contents of the modal don't get rendered when it's not active,
// you can create a default.js file that returns null.

export default function Default() {
  // To make this invisible, return null
  return (
    <>
      I am the default page in modals/default.tsx, normally you should have me
      return null so I dont show.
    </>
  );
}
