import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Header from "../components/Header";

describe("Header component", () => {
  it('renders company title', () => {
    render(<Header />);
    const title = screen.getByText('Emi Sama Corporation');
    expect(title).toBeInTheDocument();
  })

  it('renders company icon', () => {
    render(<Header />);
    const icon = screen.getByAltText(/company icon/i);
    expect(icon).toBeInTheDocument();
  })

  it.skip('renders links', () => {
    render(<Header />);
    const home = screen.getByRole('link', {name: /home/i});
    const shop = screen.getByRole('link', {name: /shop/i});

    expect(home).toBeInTheDocument();
    expect(shop).toBeInTheDocument();
  })

  it.skip('clicking on home sends user to / (home)', async () => {
    render(<Header />);
    const user = userEvent.setup()
    const home = screen.getByRole('link', {name: /home/i});

    await user.click(home);
    expect(home).toHaveAttribute('/');
  })

  it.skip('clicking on home sends user to /shop', async () => {
    render(<Header />);
    const user = userEvent.setup()
    const shop = screen.getByRole('link', {name: /shop/i});

    await user.click(shop);
    expect(shop).toHaveAttribute('/shop');
  })

  it.skip('renders shopping cart', () => {
    render(<Header />);
    const shoppingCart = screen.getByRole('button', {name: /shopping cart/i});

    expect(shoppingCart).toBeInTheDocument();
  })

  
})