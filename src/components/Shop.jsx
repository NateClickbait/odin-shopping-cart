import { useOutletContext, useOutlet, Outlet, useNavigate } from "react-router-dom";
import {useState} from 'react';
import Loading from "./Loading";
import styles from "../styles/Shop.module.css";

function Shop() {
  const navigate = useNavigate();
  const outletContent = useOutlet();
  const {products, onSetInCart} = useOutletContext();

  const [selectedProduct, setSelectedProduct] = useState(null);

  function navigateToProduct(productTitle) {
    const clickedProduct = products.filter((product) => {
      return product.title === productTitle;
    });

    console.log(clickedProduct);

    setSelectedProduct(clickedProduct[0]);
    navigate(`products/${clickedProduct[0].title}`);
  }

  return (
    (!outletContent) ? (
      <div className={styles.shopPage}>
        <h2 className={styles.shopHeader}>Shop</h2>
        <div className={styles.products}>
          {products.map((product) => {
            return (
              <div 
                className={styles.product} 
                aria-label='product'
                key={product.title}
                onClick={() => navigateToProduct(product.title)}
              >
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
    ) : <Outlet context={{product: products[selectedProduct], onSetInCart: onSetInCart}} />
  );
}

export default Shop;