import { NavLink } from 'react-router-dom';
import styles from './navbar.module.css';

export const Navbar = () => {
  const navLinks = [
    {
      id: 1,
      path: '/',
      name: 'Dashboard',
    },
    {
      id: 2,
      path: '/add',
      name: 'Add food',
    },
  ];

  return (
    <nav className={styles.container}>
      {navLinks.map((link) => {
        return (
          <NavLink
            key={link.id}
            to={link.path}
            className={({ isActive }) => (isActive ? styles.active : undefined)}>
            {link.name}
          </NavLink>
        );
      })}
    </nav>
  );
};
