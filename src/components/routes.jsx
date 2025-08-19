import App from "./App";
import Home from "./Home";
import Shop from "./Shop";
import ErrorPage from "./ErrorPage";
import Product from "./Product";
import ShoppingCart from "./ShoppingCart";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {index: true, element: <Home />},
      {
        path: "shop", 
        element: <Shop />,
        children: [
          {path: "products/:productName", element: <Product />},
        ]
      },
      {path: "shopping-cart", element: <ShoppingCart />},
    ]
  },
];

export default routes;