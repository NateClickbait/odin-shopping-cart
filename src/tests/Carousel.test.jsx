import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event' 
import Carousel from "../components/Carousel";
import test1 from '../assets/testing/Emi3.jpg';
import test2 from '../assets/testing/Emi5.jpg';
import test3 from '../assets/testing/Emi6.jpg';
import test4 from '../assets/testing/Emi8.jpg';

describe('Carousel Component', () => {
  const mockProduct = [
    {title: 'Emi3', image: test1},
    {title: 'Emi5', image: test2},
    {title: 'Emi6', image: test3},
    {title: 'Emi8', image: test4},
  ]

  const mockProductEmpty = [];

  it('clicking left moves to previous image', async () => {
    const user = userEvent.setup();
    render(<Carousel products={mockProduct}/>);

    const left = screen.getByRole('button', {name: 'previous image'});

    await user.click(left);
    expect(screen.getByAltText('Emi8')).toBeInTheDocument();
    await user.click(left);
    expect(screen.getByAltText('Emi6')).toBeInTheDocument();
    await user.click(left);
    expect(screen.getByAltText('Emi5')).toBeInTheDocument();
    await user.click(left);
    expect(screen.getByAltText('Emi3')).toBeInTheDocument();

  });

  it('clicking right moves to next image', async () => {
    const user = userEvent.setup();
    render(<Carousel products={mockProduct}/>);

    const right = screen.getByRole('button', {name: 'next image'});

    await user.click(right);
    expect(screen.getByAltText('Emi5')).toBeInTheDocument();
    await user.click(right);
    expect(screen.getByAltText('Emi6')).toBeInTheDocument();
    await user.click(right);
    expect(screen.getByAltText('Emi8')).toBeInTheDocument();
    await user.click(right);
    expect(screen.getByAltText('Emi3')).toBeInTheDocument();
  });

  it('when content is not loaded, it shows loading state', () => {
    render(<Carousel products={mockProductEmpty}/>);

    const loading = screen.getByRole('region', {name: 'loading'});
    expect(loading).toBeInTheDocument();
  });
})