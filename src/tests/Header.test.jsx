import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import userEvent from '@testing-library/user-event';
import Header from "../components/Header";

const FakeHome = () => <p>Fake Home</p>;
const FakeShop = () => <p>Fake Shop</p>;

const testRoutes = [
  {
    path: "/",
    element: (
      <Header />
    ),
    children: [
      {
        index: true,
        element: <FakeHome />,
      },
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

describe("Header component", () => {
  it('renders company title', () => {
    renderWithRouter();
    const title = screen.getByText('Emi Sama Corporation');
    expect(title).toBeInTheDocument();
  })

  it('renders company icon', () => {
    renderWithRouter();
    const icon = screen.getByAltText(/company icon/i);
    expect(icon).toBeInTheDocument();
  })

  it('renders links', () => {
    renderWithRouter();
    const home = screen.getByRole('link', {name: /^home$/i});
    const shop = screen.getByRole('link', {name: /^shop$/i});

    expect(home).toBeInTheDocument();
    expect(shop).toBeInTheDocument();
  })

  it('clicking on home sends user to / (home)', async () => {
    renderWithRouter();
    const home = screen.getByRole('link', {name: /^home$/i});

    expect(home).toHaveAttribute('href', '/');
  })

  it('clicking on shop sends user to /shop', async () => {
    renderWithRouter();
    const shop = screen.getByRole('link', {name: /^shop$/i});

    expect(shop).toHaveAttribute('href', '/shop');
  })

  it('renders shopping cart icon', () => {
    renderWithRouter();
    const shoppingCartIcon = screen.getByRole('button', {name: /shopping cart/i});

    expect(shoppingCartIcon).toBeInTheDocument();
  })

  it('renders a sidebar of all items in shopping cart when hovering over shopping cart icon', async () => {
    renderWithRouter();
    const shoppingCartIcon = screen.getByRole('button', {name: /shopping cart/i});
    const user = userEvent.setup();

    await user.hover(shoppingCartIcon);
    expect(screen.getByRole('region', {name: /shopping cart list/i})).toBeInTheDocument();
  })
})