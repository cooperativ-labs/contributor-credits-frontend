import React from 'react';
import styles from './PercentageCircle.module.css';

export interface PercentageCircleProps {
  percentage: number;
  size?: string;
}

const PercentageCircle: React.FunctionComponent<PercentageCircleProps> = ({ percentage, size }) => {
  const classes = `${styles[size]} ${styles.c100} ${styles[`p${percentage.toString()}`]}`;
  return (
    <div className={classes}>
      <span>{percentage}%</span>
      <div className={styles.slice}>
        <div className={styles.bar} />
        <div className={styles.fill} />
      </div>
    </div>
  );
};

export default PercentageCircle;
