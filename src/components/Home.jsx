import styles from "../styles/Home.module.css";
import Carousel from "./Carousel";
import {Link, useOutletContext} from "react-router-dom";

function Home() {
  const products = useOutletContext();

  return (
    <div className={styles.home}>
      <div className={styles.hook}>
        <div className={styles.box}>
          <p className={styles.message}>The best deals, the best steals!!!</p>
          <p className={styles.author}>- Emi Sama, CEO</p>
        </div>
        <Carousel products={products} />
      </div>
      <Link to='/shop' className={styles.shop}>Shop Now!</Link>
      {/* <Loading /> */}
    </div>
  );
}

export default Home;