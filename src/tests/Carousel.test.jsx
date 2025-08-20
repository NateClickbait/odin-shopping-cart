import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Carousel from "../components/Carousel";

describe('Carousel Component', () => {
  it('clicking left moves to previous image', () => {
    render(<Carousel />)
  })
})