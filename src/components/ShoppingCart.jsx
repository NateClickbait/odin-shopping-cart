import { useOutletContext } from "react-router-dom";
import styles from "../styles/ShoppingCart.module.css";

function ShoppingCart() {
  const {products, inCart, onSetInCart} = useOutletContext();

  const productsInCart = products.filter((product) => {
    return inCart.has(product.title);
  });

  const total = productsInCart.reduce((acc, product) => {
    return acc + +product.price * inCart.get(product.title);
  }, 0);

  function updateItemAmount(e, productTitle) {
    const newInCart = new Map(inCart);
    newInCart.set(productTitle, e.target.value);
    onSetInCart(newInCart); 
  }

  function deleteItem(productTitle) {
    const newInCart = new Map(inCart);
    newInCart.delete(productTitle);
    onSetInCart(newInCart);
  }

  return (
    <main className={styles.shoppingCart}>
      <h2 className={styles.pageTitle}>Shopping Cart</h2>
      {(inCart.size === 0) ? (<p className={styles.empty}>Shopping Cart is Empty!</p>) : (
        <>
          {productsInCart.map((product) => {
            return (
              <div className={styles.product} key={product.title}>
                <div className={styles.beginning}>
                  <img src={product.image} className={styles.image} alt={product.title}/>
                  <div className={styles.titleContainer}>
                    <h3 className={styles.title}>{product.title}</h3>
                    <p className={styles.category}>{product.category}</p>
                  </div>
                </div>
                <div className={styles.end}>
                  <input 
                    type='number' 
                    id={`amount-${product.title}`} 
                    name='amount-shopping-cart' 
                    aria-label='number of items'
                    min='1'
                    className={styles.amount}
                    value={inCart.get(product.title)}
                    onChange={(e) => updateItemAmount(e, product.title)}
                  />
                  <p className={styles.price}>${(product.price * inCart.get(product.title)).toFixed(2)}</p>
                  <button 
                    aria-label='delete item'
                    onClick={() => deleteItem(product.title)}
                    className={styles.delete}
                  >
                    X
                  </button>
                </div>
              </div>
            );
          })}
          <p className={styles.total}>Total: ${total.toFixed(2)}</p>
        </>
      )}
    </main>
  );
}

export default ShoppingCart;