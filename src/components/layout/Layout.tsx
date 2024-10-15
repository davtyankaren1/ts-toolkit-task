import { Navbar } from '../nav/Navbar';
import { Outlet } from 'react-router-dom';
import styles from './Layout.module.css';

export const Layout = () => {
  return (
    <div>
      <article className={styles.header} />
      <section className={styles['content-section']}>
        <Navbar />
        <main>
          <Outlet />
        </main>
      </section>
    </div>
  );
};
