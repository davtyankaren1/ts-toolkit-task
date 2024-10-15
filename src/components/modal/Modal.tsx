import React from 'react';
import styles from './modal.module.css';

interface IProps {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}

export const Modal = (props: IProps) => {
  const { title, children, onClose } = props;

  return (
    <div id="myModal" className={styles.modal}>
      <div className={styles['modal-content']}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        <h2 className={styles['modal_title']}>{title}</h2>
        {children}
      </div>
    </div>
  );
};
