import ComponentUsingCssModules from '@/components/atomic-design/organisms/ComponentUsingCssModules';
import styles from './styles.module.css';

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.myComponent}>
        <p>You are using CSS modules</p>
      </div>
      <ComponentUsingCssModules />
    </div>
  );
}
