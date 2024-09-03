import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SearchResultCard from "./SearchResultCard";
import { buttonTests } from "../button/Button.test";
import { SearchType } from "../../App";

const mockData = {
  id: 123456,
  login: "testuser",
  avatar_url: "https://example.com/avatar.png",
  html_url: "https://example.com/profile",
  type: SearchType.Users,
};

describe("SearchResultCard component", () => {
  it("renders the data props correctly", () => {
    render(<SearchResultCard data={mockData} />);
    expect(screen.getByText("testuser")).toBeInTheDocument();
    expect(screen.getByText(123456)).toBeInTheDocument();
  });

  it("sets the src attribute of the img element based on the avatar_url prop", () => {
    render(<SearchResultCard data={mockData} />);
    const imgElement = screen.getByAltText("avatar");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", mockData.avatar_url);
  });

  it("renders link and userId icons", () => {
    render(<SearchResultCard data={mockData} />);
    const linkIcon = screen.getByTestId("link-icon");
    const useridIcon = screen.getByTestId("userid-icon");
    expect(linkIcon).toBeInTheDocument();
    expect(useridIcon).toBeInTheDocument();
  });

  it("sets the href attribute of the link tag based on the html_url prop", () => {
    render(<SearchResultCard data={mockData} />);
    const linkElement = screen.getByTestId("profile-link");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute("href", mockData.html_url);
    expect(linkElement).toHaveAttribute("target", "_blank");
  });

  describe("renders the button with correct label and behavior", () => {
    buttonTests();
  });
});
