import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router-dom";
import test1 from '../assets/testing/Emi3.jpg';
import Product from "../components/Product";

describe('Product Component', () => {
  const fakeProducts = [
    {
      title: 'Emi3', 
      image: test1,
      category: 'dog',
      price: 15.99,
      rating: {rate: 5, count: 1000},
      description: 'cute dog',
    },
  ]

  const fakeInCart = new Map();
  const fakeOnSetInCart = vi.fn();

  const FakeShop = () => <Outlet context={
    {products: fakeProducts, inCart: fakeInCart, onSetInCart: fakeOnSetInCart}
  }/>;

  const testRoutes = [
    {
      path: "/shop",
      element: (
        <FakeShop />
      ),
      children: [
        {path: "products/:productName", element: <Product />}
      ],
    },
  ];

  function renderWithRouter() {
    const fakeRouter = createMemoryRouter(testRoutes, {initialEntries: ['/shop/products/Emi3']});
    render(<RouterProvider router={fakeRouter} />);
    return fakeRouter;
  }

  it('renders image', async () => {
    renderWithRouter();
    const image = await screen.findByAltText('Emi3');
    expect(image).toBeInTheDocument();
  });

  it('renders title', async () => {
    renderWithRouter();
    const title = await screen.findByText('Emi3');
    expect(title).toBeInTheDocument();
  });

  it('renders category', async () => {
    renderWithRouter();
    const category = await screen.findByText('dog');
    expect(category).toBeInTheDocument();
  });

  it('renders rating', async () => {
    renderWithRouter();
    const rating = await screen.findByText((_, node) =>
      node.textContent === 'Rating: 5/5'
    );
    expect(rating).toBeInTheDocument();
  });

  it('renders review count', async () => {
    renderWithRouter();
    const reviews = await screen.findByText((_, node) =>
      node.textContent === 'Reviews: 1000'
    );
    expect(reviews).toBeInTheDocument();
  });

  it('renders price', async () => {
    renderWithRouter();
    const price = await screen.findByText('$15.99');
    expect(price).toBeInTheDocument();
  });

  it('renders description', async () => {
    renderWithRouter();
    const description = await screen.findByText('cute dog');
    expect(description).toBeInTheDocument();
  });

  it('renders amount input box', async () => {
    renderWithRouter();
    const description = await screen.findByRole('spinbutton', {name: /number of items/i});
    expect(description).toBeInTheDocument();
  });

  it('renders amount add to cart button', async () => {
    renderWithRouter();
    const description = await screen.findByRole('button', {name: /add to cart/i});
    expect(description).toBeInTheDocument();
  });
});