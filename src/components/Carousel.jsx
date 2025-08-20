import styles from '../styles/Carousel.module.css';
import Loading from "./Loading";
import {useState, useEffect} from 'react'

function Carousel({products}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currPos, setCurrPos] = useState(0);

  useEffect(() => {
    if (products.length !== 0)
      setIsLoaded(true);
  }, [products]);

  function nextImage() {
    if (currPos + 1 === products.length)
      setCurrPos(0);
    else
      setCurrPos(currPos + 1);
  }

  function previousImage() {
    if (currPos - 1 < 0)
      setCurrPos(products.length - 1);
    else
      setCurrPos(currPos - 1);
  }

  return (
    (isLoaded) ?  (
        <div className={styles.carousel}>
          <button
            className={styles.previous} 
            aria-label='previous image'
            onClick={previousImage}
          >
            &lt;
          </button>
          <img className={styles.product}
               src={products[currPos].image} 
               alt={products[currPos].title} 
          />
          <button 
            className={styles.next}
            aria-label='next image'
            onClick={nextImage}
          >
            &gt;
          </button>
        </div>
      ) 
      : <Loading />
  );
}

export default Carousel;