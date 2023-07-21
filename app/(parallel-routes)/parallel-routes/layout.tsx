import styles from './styles.module.scss';

export default function Layout(props: {
  children: React.ReactNode;
  slot_one: React.ReactNode;
  slot_two: React.ReactNode;
  slot_three: React.ReactNode;
}) {
  const { children, slot_one, slot_two, slot_three } = props;

  // You can also apply routes conditionally such as :
  // const isLoggedIn = getUser()
  // return isLoggedIn ? dashboard : login

  return (
    <>
      <div>{children}</div>
      <div className={`${styles.wrapper}`}>
        {/* The children prop is an implicit slot that does not need to be mapped to a folder.
       This means parallel-routes/page.tsx is equivalent to parallel-routes/@children/page.tsx. */}

        <div className={`${styles.column}`}>{slot_one}</div>
        <div className={`${styles.column}`}>{slot_two}</div>
      </div>
      <div className={`${styles.row}`}>{slot_three}</div>
    </>
  );
}
