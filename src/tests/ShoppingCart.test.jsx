import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router-dom";
import test1 from '../assets/testing/Emi3.jpg';
import test2 from '../assets/testing/Emi5.jpg';
import test3 from '../assets/testing/Emi6.jpg';
import test4 from '../assets/testing/Emi8.jpg';
import ShoppingCart from "../components/ShoppingCart";

describe('Shopping Cart Component', () => {
  const fakeProducts = [
    {
      title: 'Emi3', 
      image: test1,
      category: 'dog',
      price: 15.99,
    },
    {
      title: 'Emi5', 
      image: test2,
      category: 'chihuahua',
      price: 30,
    },
    {
      title: 'Emi6', 
      image: test3,
      category: 'doggo',
      price: 45.50,
    },
    {
      title: 'Emi8', 
      image: test4,
      category: 'puppy',
      price: 70.00,
    },
  ]

  const fakeInCart = new Map();
  fakeInCart.set(fakeProducts[0].title, 1);
  fakeInCart.set(fakeProducts[1].title, 2);
  fakeInCart.set(fakeProducts[2].title, 3);
  fakeInCart.set(fakeProducts[3].title, 4);
  const fakeOnSetInCart = vi.fn();

  const FakeApp = () => <Outlet context={
    {products: fakeProducts, inCart: fakeInCart, onSetInCart: fakeOnSetInCart}
  }/>

  const testRoutes = [
    {
      path: "/",
      element: (
        <FakeApp />
      ),
      children: [
        {
          path: "shopping-cart",
          element: <ShoppingCart />,
        },
      ],
    },
  ];

  function renderWithRouter() {
    const fakeRouter = createMemoryRouter(testRoutes, {initialEntries: ['/shopping-cart']});
    render(<RouterProvider router={fakeRouter} />);
    return fakeRouter;
  }

  it('rendered shopping cart header', () => {
    renderWithRouter();

    const header = screen.getByText(/^Shopping Cart$/i);
    expect(header).toBeInTheDocument();
  });

  it('rendered all images', () => {
    renderWithRouter();

    const image1 = screen.getByAltText('Emi3');
    expect(image1).toBeInTheDocument();

    const image2 = screen.getByAltText('Emi5');
    expect(image2).toBeInTheDocument();

    const image3 = screen.getByAltText('Emi6');
    expect(image3).toBeInTheDocument();

    const image4 = screen.getByAltText('Emi8');
    expect(image4).toBeInTheDocument();
  });

  it('rendered all titles', () => {
    renderWithRouter();

    const title1 = screen.getByText('Emi3');
    expect(title1).toBeInTheDocument();

    const title2 = screen.getByText('Emi5');
    expect(title2).toBeInTheDocument();

    const title3 = screen.getByText('Emi6');
    expect(title3).toBeInTheDocument();

    const title4 = screen.getByText('Emi8');
    expect(title4).toBeInTheDocument();
  });

  it('rendered all categories', () => {
    renderWithRouter();

    const category1 = screen.getByText('dog');
    expect(category1).toBeInTheDocument();

    const category2 = screen.getByText('chihuahua');
    expect(category2).toBeInTheDocument();

    const category3 = screen.getByText('doggo');
    expect(category3).toBeInTheDocument();

    const category4 = screen.getByText('puppy');
    expect(category4).toBeInTheDocument();
  });

  it('rendered all prices', () => {
    renderWithRouter();

    const price1 = screen.getByText(`$15.99`);
    expect(price1).toBeInTheDocument();

    const price2 = screen.getByText('$60.00');
    expect(price2).toBeInTheDocument();

    const price3 = screen.getByText('$136.50');
    expect(price3).toBeInTheDocument();

    const price4 = screen.getByText('$280.00');
    expect(price4).toBeInTheDocument();
  });

  it('rendered all amounts', () => {
    renderWithRouter();

    const amount1 = screen.getByDisplayValue(`1`);
    expect(amount1).toBeInTheDocument();

    const amount2 = screen.getByDisplayValue('2');
    expect(amount2).toBeInTheDocument();

    const amount3 = screen.getByDisplayValue('3');
    expect(amount3).toBeInTheDocument();

    const amount4 = screen.getByDisplayValue('4');
    expect(amount4).toBeInTheDocument();
  });

  it('rendered all delete buttons', () => {
    renderWithRouter();

    const allDeleteButtons = screen.getAllByRole('button', {name: 'delete item'});
    expect(allDeleteButtons.length).toEqual(4);
  });

  it('rendered total price', () => {
    renderWithRouter();

    const total = screen.getByText('Total: $492.49');
    expect(total).toBeInTheDocument();
  });
});