import React from "react";
import logo from "../../logo.svg";
import { Link } from "react-router-dom";

const id = 0;

export default function HomePage(props) {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p className="h2 mt-3">
          <Link to={`/${id}/medical_card`}>Medical Card</Link>
        </p>
        <p className="h2 mt-3">
            <Link to={`/${id}/personal_account`}>Personal Account</Link>
        </p>

      </header>
    </div>
  );
}