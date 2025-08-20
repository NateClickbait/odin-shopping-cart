import { useOutletContext } from "react-router-dom";
import {useState} from 'react';
import Loading from "./Loading";
import styles from "../styles/Shop.module.css";

function Shop() {
  const products = useOutletContext();

  return (
    <div className={styles.shopPage}>
      
    </div>
  );
}

export default Shop;