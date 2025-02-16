import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "../../layouts/Navbar";
import Login from "../../pages/Login";
import BookForm from "../../pages/BookForm";
import "@testing-library/jest-dom";

/*
MOCK USER INFO THAT IS PRESENT IN THE DATABASE (If not present, add this user using email and password): 
EMAIL: "khaleelur@gmail.com"
PASSWORD: "abc123!@#"
*/

describe("Navbar", () => {
  test("Presence of all the required links", () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );

    const bookSearch = screen.getByText(/Book Search/i);
    expect(bookSearch).toBeInTheDocument();

    const wishlist = screen.getByText(/WishList/i);
    expect(wishlist).toBeInTheDocument();

    const readlist = screen.getByText(/Readlist/i);
    expect(readlist).toBeInTheDocument();

    const profileIcon = screen.getByTestId("profile-icon");
    expect(profileIcon).toBeInTheDocument();
  });

  test("Shows book search form when user is logged in and when user clicks on Book Search button", async () => {
    render(
      <Router>
        <Navbar />
        <Login />
        <BookForm />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, { target: { value: "khaleelur@gmail.com" } });
    fireEvent.change(password, { target: { value: "abc123!@#" } });

    fireEvent.click(registerButton[0]);

    const bookSearchButton = screen.getByTestId("book-search");

    fireEvent.click(bookSearchButton);

    const bookTitleInput = screen.getByText(/Enter Title/i);
    expect(bookTitleInput).toBeInTheDocument();
  });

  test("Shows Login Page when user is logged out and when user clicks on Book Search button", async () => {
    render(
      <Router>
        <Navbar />
        <Login />
      </Router>
    );

    const bookSearchButton = screen.getByTestId("book-search");

    fireEvent.click(bookSearchButton);

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);
  });

  test("Shows book search form when user is logged in and when user clicks on Wislist button", async () => {
    render(
      <Router>
        <Navbar />
        <Login />
        <BookForm />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, { target: { value: "khaleelur@gmail.com" } });
    fireEvent.change(password, { target: { value: "abc123!@#" } });

    fireEvent.click(registerButton[0]);

    const bookSearchButton = screen.getByTestId("wishlist");

    fireEvent.click(bookSearchButton);

    const bookTitleInput = screen.getByText(/Enter Title/i);
    expect(bookTitleInput).toBeInTheDocument();
  });

  test("Shows Login Page when user is logged out and when user clicks on wishlist button", async () => {
    render(
      <Router>
        <Navbar />
        <Login />
      </Router>
    );

    const bookSearchButton = screen.getByTestId("wishlist");

    fireEvent.click(bookSearchButton);

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);
  });

  test("Shows book search form when user is logged in and when user clicks on Realist button", async () => {
    render(
      <Router>
        <Navbar />
        <Login />
        <BookForm />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, { target: { value: "khaleelur@gmail.com" } });
    fireEvent.change(password, { target: { value: "abc123!@#" } });

    fireEvent.click(registerButton[0]);

    const bookSearchButton = screen.getByTestId("readlist");

    fireEvent.click(bookSearchButton);

    const bookTitleInput = screen.getByText(/Enter Title/i);
    expect(bookTitleInput).toBeInTheDocument();
  });

  test("Shows Login Page when user is logged out and when user clicks on readlist button", async () => {
    render(
      <Router>
        <Navbar />
        <Login />
      </Router>
    );

    const bookSearchButton = screen.getByTestId("readlist");

    fireEvent.click(bookSearchButton);

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);
  });

  test("Dropdown test for logged out users", async () => {
    render(
      <Router>
        <Navbar />
        <Login />
      </Router>
    );

    const email = screen.getByLabelText("Email Address");
    expect(email).toBeInTheDocument();
    expect(email.value).toMatch("");

    const password = screen.getByLabelText("Password");
    expect(password).toBeInTheDocument();
    expect(password.value).toMatch("");

    const registerButton = await screen.findAllByRole("button", {
      name: /Login/i,
    });
    expect(registerButton).toHaveLength(1);

    fireEvent.change(email, { target: { value: "khaleel@gmail.com" } });
    fireEvent.change(password, { target: { value: "abc123!@#" } });

    fireEvent.click(registerButton[0]);

    const dropdown1 = screen.getByTestId("dropdown1");
    expect(dropdown1).toBeInTheDocument();

    const dropdown2 = screen.getByTestId("dropdown2");
    expect(dropdown2).toBeInTheDocument();

    expect(dropdown1.textContent).toBe("Login");
    expect(dropdown2.textContent).toBe("Register");
  });
});
