import React from 'react';
import styles from './Container.module.scss';
export default function Container({ children }: { children: any }) {
  return <div className={styles.container}>{children}</div>;
}
