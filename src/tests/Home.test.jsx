import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import Header from "../components/Header";
import Home from "../components/Home";

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
        element: <Home />,
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

describe.skip('Home Component', () => {
  it('renders homepage main message', () => {
    renderWithRouter();
    const homepageMessage = screen.getByText(`The best deals, the best steals!!!`);
    expect(homepageMessage).toBeInTheDocument();
  });
});