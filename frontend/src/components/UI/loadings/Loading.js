import React from 'react';
import styles from './Loadings.module.css';
import loadingGif from '../../../assets/loading.gif';

const Loading = () => {
  return (
    <div className={styles.container}>
      <img className={styles.mainGif} src={loadingGif} />
    </div>
  );
}

export default Loading;