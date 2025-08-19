import styles from "../styles/ErrorPage.module.css";

function ErrorPage() {
	return (
		<div className={styles.error}>
			<h1 className={styles.unhappy}>:(</h1>
			<p className={styles.errorMessage}>This website ran into a problem and needs a restart. 
			   This Page most likely does not exist within this website</p>
			<p className={styles.errorMessage}>ERROR</p>
		</div>
	);
}

export default ErrorPage;