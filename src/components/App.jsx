import { useState } from 'react'
import styles from '../styles/App.module.css'

import Header from './Header';

function App() {
  return (
    <>
      <Header />
      <main className={styles.main}></main>
    </>
  );
}

export default App
