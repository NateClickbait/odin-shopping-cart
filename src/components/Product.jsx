import { useOutletContext } from "react-router-dom";
import styles from "../styles/Product.module.css";
import Loading from "./Loading";
import { useState, useEffect } from "react";

function Product() {
  const {products, onSetInCart, inCart} = useOutletContext();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (products.length !== 0) { 
      setIsLoaded(true);
    }
  }, [products]);

  let product;
  if (isLoaded) {
    const productTitle = decodeURIComponent(window.location.href.split('/').pop().toString());
    product = products.filter((productEncountered) => {
      return productEncountered.title === productTitle;
    })[0];
  } 

  function addToCart(productTitle) {
    const newInCart = new Map(inCart);
    if (newInCart.has(productTitle)) {
      const numItems = newInCart.get(productTitle);
      console.log(numItems);
      newInCart.set(productTitle, numItems + 1);
    }
    else
      newInCart.set(productTitle, 1);

    onSetInCart(newInCart);
    console.log(newInCart);
  }

  return (
    (isLoaded) ? (
      <div className={styles.productContainer}>
        <article className={styles.productPage}>
          <img className={styles.productImage} src={product.image} />
          <section className={styles.importantInfo}>
            <div className={styles.generalInfo}>
              <h3 className={styles.title}>{product.title}</h3>
              <p className={styles.category}>{product.category}</p>
              <p>Rating: {product.rating.rate}</p>
              <p>Reviews: {product.rating.count}</p>
            </div>
            <div className={styles.priceAndBuy}>
              <p className={styles.price}>{product.price}</p>
              <button 
                className={styles.addToCart}
                onClick={() => addToCart(product.title)}
              >
                Add To Cart
              </button>
            </div>
          </section>
          <section className={styles.description}>
            <p>{product.description}</p>
          </section>
        </article>
      </div>
    ) : <Loading />

  );
}

export default Product;