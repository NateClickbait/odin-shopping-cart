import { useOutletContext } from "react-router-dom";
import {useState} from 'react';
import Loading from "./Loading";
import styles from "../styles/Shop.module.css";

function Shop() {
  const products = useOutletContext();

  return (
    <div className={styles.shopPage}>
      <h2 className={styles.shopHeader}>Shop</h2>
      <div className={styles.products}>
        {products.map((product) => {
          return (
            <div className={styles.product}>
              <div>
                <img src={product.image} className={styles.productImage}/>
                <h3 className={styles.productTitle}>{product.title}</h3>
                <p className={styles.productClass}>{product.category}</p>
              </div>
              <p className={styles.productPrice}>${product.price}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Shop;