import styles from './styles.module.scss';

export default function Page() {
  return (
    <>
      <h1 className={`${styles.title}`}>Sass</h1>
      <div className={`${styles.wrapper}`}>
        <p>hello</p>
      </div>

      <button className={`${styles.info}`}>some button</button>
      <button className={`${styles.alert}`}>some button</button>
    </>
  );
}
