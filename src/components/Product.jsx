import { useOutletContext, useParams } from "react-router-dom";
import styles from "../styles/Product.module.css";
import Loading from "./Loading";
import { useState, useEffect } from "react";

function Product() {
  const {products, onSetInCart, inCart} = useOutletContext();
  const [isLoaded, setIsLoaded] = useState(false);
  const [amount, setAmount] = useState(1);
  const {productName} = useParams();

  useEffect(() => {
    if (products.length !== 0) { 
      setIsLoaded(true);
    }
  }, [products]);

  let product;
  if (isLoaded) {
    product = products.filter((productEncountered) => {
      return productEncountered.title === productName;
    })[0];
  } 

  function addToCart(productTitle) {
    const newInCart = new Map(inCart);
    if (newInCart.has(productTitle)) {
      const numItems = newInCart.get(productTitle);
      console.log(numItems);
      newInCart.set(productTitle, numItems + amount);
    }
    else
      newInCart.set(productTitle, amount);

    onSetInCart(newInCart);
    console.log(newInCart);
  }

  return (
    (isLoaded) ? (
      <div className={styles.productContainer}>
        <article className={styles.productPage}>
          <div className={styles.imageContainer}>
            <img className={styles.productImage} src={product.image} alt={product.title}/>
          </div>
          <section className={styles.importantInfo}>
            <div className={styles.generalInfo}>
              <h3 className={styles.title}>{product.title}</h3>
              <p className={styles.category}>{product.category}</p>
              <p className={styles.rating}><strong>Rating</strong>: {product.rating.rate}/5</p>
              <p className={styles.rating}><strong>Reviews</strong>: {product.rating.count}</p>
            </div>
            <div className={styles.priceAndBuy}>
              <p className={styles.price}>${product.price}</p>
              <div className={styles.purchase}>

                <input 
                  type='number' 
                  id='amount' 
                  name='amount' 
                  aria-label='number of items'
                  min='1'
                  className={styles.amount}
                  value={amount}
                  onChange={(e) => setAmount(+e.target.value)}
                />
                <button
                  className={styles.addToCart}
                  onClick={() => addToCart(product.title)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
          </section>
          <section className={styles.description}>
            <p>{product.description}</p>
          </section>
          <div className={styles.placeHolder}></div>
        </article>
      </div>
    ) : <Loading />

  );
}

export default Product;