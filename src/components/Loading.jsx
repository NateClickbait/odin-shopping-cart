import styles from "../styles/Loading.module.css";

function Loading() {
  return (
    <div className={styles.spinnerContainer} aria-label="loading" role='region'>
      <div className={styles.spinner}></div>
    </div>
  );
}

export default Loading;