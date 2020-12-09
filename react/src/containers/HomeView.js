import React from "react";
import logo from "../logo.svg";
import { Link } from "react-router-dom";

const id = 0;

export default function HomePage(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p class="h2 mt-3">
          <Link to={`/medical_card`}>Medical Card</Link>
          <Link to={`/login/`}>Login</Link>
          <Link to={`/register/`}>Register</Link>
          <Link to={`/hello/`}>Hello</Link>
        </p>
      </header>
    </div>
  );
}
