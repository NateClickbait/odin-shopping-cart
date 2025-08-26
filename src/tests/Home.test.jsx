import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider, Outlet } from "react-router-dom";
import Home from "../components/Home";

describe('Home Component', () => {
  const fakeProducts = [];

  const FakeApp = () => <Outlet context={{products: fakeProducts}}/>
  const FakeShop = () => <p>Fake Shop</p>;

  const testRoutes = [
    {
      path: "/",
      element: (
        <FakeApp />
      ),
      children: [
        {index: true, element: <Home />},
        {
          path: "shop",
          element: <FakeShop />,
        },
      ],
    },
  ];

  function renderWithRouter() {
    const fakeRouter = createMemoryRouter(testRoutes, {initialEntries: ['/']});
    render(<RouterProvider router={fakeRouter} />);
    return fakeRouter;
  }

  it('renders homepage main message', () => {
    renderWithRouter();
    const homepageMessage = screen.getByText(`The best deals, the best steals!!!`);
    expect(homepageMessage).toBeInTheDocument();
  });

  it('renders author of main message', () => {
    renderWithRouter();
    const homepageMessage = screen.getByText(`- Emi Sama, CEO`);
    expect(homepageMessage).toBeInTheDocument();
  })

  it('renders shop button', () => {
    renderWithRouter();
    const shopButton = screen.getByRole('link', {name: /^shop now!$/i});
    expect(shopButton).toBeInTheDocument();
  });

  it('clicking on shop now! sends user to /shop', () => {
    renderWithRouter();
    const shopButton = screen.getByRole('link', {name: /^shop now!$/i});

    expect(shopButton).toHaveAttribute('href', '/shop');
  });

  it('renders content display', () => {
    renderWithRouter();
    const loading = screen.getByRole('region', {name: 'loading'});


    expect(loading).toBeInTheDocument();
  })
});