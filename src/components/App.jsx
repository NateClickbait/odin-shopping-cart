import { useState, useEffect } from 'react'
import styles from '../styles/App.module.css'

import Header from './Header';
import { Outlet } from 'react-router-dom';
import ErrorPage from './ErrorPage';

function App() {
  const [products, setProducts] = useState([]);
  //key: title, value: numItems
  const [inCart, setInCart] = useState(new Map());

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();

        //lets browser cache images
        for (let i = 0; i < data.length; ++i) {
          await fetch(data[i].image);
        }

        setProducts(data);
        console.log(data);
      }
      catch {
        //display errorPage
        return <ErrorPage />;
      }
    }

    getProducts();
  }, [])

  return (
    <>
      <Header inCart={inCart} products={products}/>
      <Outlet context={{products: products, onSetInCart: setInCart, inCart: inCart}}/>
    </>
  );
}

export default App
