import styles from './styles.module.css';

export default function ComponentUsingCssModules() {
  return (
    <div className={styles.div}>
      I&apos;m a component that uses CSS Modules{' '}
    </div>
  );
}
