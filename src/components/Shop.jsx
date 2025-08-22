import { useOutletContext, useOutlet, Outlet, useNavigate } from "react-router-dom";
import {useState, useEffect} from 'react';
import Loading from "./Loading";
import styles from "../styles/Shop.module.css";

function Shop() {
  const navigate = useNavigate();
  const outletContent = useOutlet();
  const {products, onSetInCart, inCart} = useOutletContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (products.length !== 0) {
      setIsLoaded(true);
    }
  }, [products])

  return (
    (isLoaded) ? (
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
                  onClick={() => navigate(`products/${encodeURIComponent(product.title)}`)}
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
      ) : <Outlet context={{
            products: products,
            inCart: inCart,
            onSetInCart: onSetInCart
          }} />
    ) : <Loading />
  );
}

export default Shop;